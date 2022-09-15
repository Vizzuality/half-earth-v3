import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { useLocale } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';

import { getPrecalculatedAOIOptions } from 'constants/analyze-areas-constants';
import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/layers-slugs';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import Component from './component';

const actions = {
  ...urlActions,
  ...mapTooltipActions,
  ...aoisGeometriesActions,
  ...aoiAnalyticsActions,
  ...aoisActions,
};

function SideMenu(props) {
  const {
    activeLayers, changeGlobe, setTooltipIsVisible,
  } = props;

  const locale = useLocale();

  const precalculatedAOIOptions = useMemo(() => getPrecalculatedAOIOptions(), [locale]);

  const [selectedOption, setSelectedOption] = useState(precalculatedAOIOptions[0]);
  const [isPromptModalOpen, setPromptModalOpen] = useState(false);

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    if (activeOption) {
      setSelectedOption(activeOption);
    }
    // Don't remove locale. Is here to recalculate the titles translation
  }, [locale]);

  const handleLayerToggle = (newSelectedOption) => {
    const protectedAreasSelected = newSelectedOption === WDPA_OECM_FEATURE_LAYER;

    const getLayersToToggle = () => {
      const formerSelectedSlug = selectedOption.slug;
      const newLayerCategory = newSelectedOption === HALF_EARTH_FUTURE_TILE_LAYER
        ? LAYERS_CATEGORIES.PROTECTION : undefined;

      let layersToToggle = [
        { layerId: formerSelectedSlug },
        { layerId: newSelectedOption, category: newLayerCategory },
      ];

      if (protectedAreasSelected) {
        const additionalProtectedAreasLayers = [
          PROTECTED_AREAS_VECTOR_TILE_LAYER,
          COMMUNITY_AREAS_VECTOR_TILE_LAYER,
        ];
        additionalProtectedAreasLayers.forEach((layer) => {
          if (!activeLayers.some((l) => l.title === layer)) {
            layersToToggle.push({ layerId: layer, category: LAYERS_CATEGORIES.PROTECTION });
          }
        });
      }

      // Never toggle (remove) future places layer if its active
      // Future places layer will be activated if we select it at some point
      // and never toggled unless we do it from the protection checkbox
      const futureLayerIsActive = activeLayers
        .some((l) => l.title === HALF_EARTH_FUTURE_TILE_LAYER);
      if (futureLayerIsActive && layersToToggle.includes(HALF_EARTH_FUTURE_TILE_LAYER)) {
        layersToToggle = layersToToggle.filter((l) => l.layerId !== HALF_EARTH_FUTURE_TILE_LAYER);
      }

      return layersToToggle;
    };

    const layersToToggle = getLayersToToggle();
    // Categories are used to show the number of layers active on the different sidebars
    const categories = layersToToggle.reduce((acc, layer) => {
      acc[layer.layerId] = layer.category;
      return acc;
    }, {});
    batchToggleLayers(layersToToggle.map((l) => l.layerId), activeLayers, changeGlobe, categories);
  };

  const handleOptionSelection = (option) => {
    handleLayerToggle(option.slug);
    setSelectedOption(option);
    setTooltipIsVisible(false);
  };

  const handlePromptModalToggle = () => setPromptModalOpen(!isPromptModalOpen);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      selectedOption={selectedOption}
      isPromptModalOpen={isPromptModalOpen}
      handleOptionSelection={handleOptionSelection}
      handlePromptModalToggle={handlePromptModalToggle}
      {...props}
    />
  );
}

export default connect(null, actions)(SideMenu);
