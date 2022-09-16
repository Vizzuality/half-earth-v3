/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { AREA_OF_INTEREST } from 'router';

import { useLocale, useT } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import { getSelectedAnalysisLayer, createHashFromGeometry } from 'utils/analyze-areas-utils';
import { getTooltipContent } from 'utils/tooltip-utils';

import intersectionBy from 'lodash/intersectionBy';
import unionBy from 'lodash/unionBy';

import { CATEGORY_LAYERS } from 'constants/category-layers-constants';
import {
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';

import Component from './data-scene-component';
import mapStateToProps from './data-scene-selectors';

const actions = { ...mapTooltipActions, ...urlActions, ...aoiAnalyticsActions };

function Container(props) {
  const {
    mapTooltipData,
    activeLayers,
    setBatchTooltipData,
    browsePage,
    precomputedAoiAnalytics,
    changeUI,
    activeCategoryLayers,
  } = props;

  const { content: mapTooltipContent, precalculatedLayerSlug } = mapTooltipData;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();
  const [updatedActiveLayers, setUpdatedActiveLayers] = useState(activeLayers);

  const locale = useLocale();
  const t = useT();

  useEffect(() => {
    // Add temporary activeCategoryLayers to activeLayers at render and reset the param
    if (activeCategoryLayers) {
      setUpdatedActiveLayers(unionBy(activeCategoryLayers, activeLayers, 'title'));
      changeUI({ activeCategoryLayers: undefined });
    } else {
      setUpdatedActiveLayers(activeLayers);
    }
  }, [activeLayers]);

  const handleHighlightLayerFeatureClick = (features) => {
    if (features && features.length && selectedAnalysisLayer) {
      const tooltipConfig = MAP_TOOLTIP_CONFIG[selectedAnalysisLayer.slug];

      const { title, subtitle, id } = tooltipConfig;
      const { geometry, attributes } = features[0].graphic;
      let customId;
      let customTitle;
      if (selectedAnalysisLayer.slug === HALF_EARTH_FUTURE_TILE_LAYER) {
        // Calculate sha-1 id for future places
        customId = createHashFromGeometry(geometry);
        customTitle = `Priority place ${attributes.cluster}`;
      }
      if (selectedAnalysisLayer.slug === SPECIFIC_REGIONS_TILE_LAYER) {
        // Calculate sha-1 id for specific regions
        customId = `region-${attributes.region}`;
      }

      const getPrecalculatedLayer = (precalculatedAttributes) => {
        if (selectedAnalysisLayer.slug !== ADMIN_AREAS_FEATURE_LAYER) {
          return selectedAnalysisLayer.slug;
        }
        return precalculatedAttributes.GID_1
          ? GADM_1_ADMIN_AREAS_FEATURE_LAYER
          : GADM_0_ADMIN_AREAS_FEATURE_LAYER;
      };

      setBatchTooltipData({
        isVisible: true,
        geometry,
        precalculatedLayerSlug: getPrecalculatedLayer(attributes),
        content: getTooltipContent(t, attributes, id, title, subtitle, customId, customTitle),
      });
    }
  };

  const handleTooltipActionButtonClick = () => {
    const { title } = mapTooltipContent;
    precomputedAoiAnalytics(title);
    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: mapTooltipContent.id },
      query: {
        precalculatedLayerSlug,
        OBJECTID: mapTooltipContent.objectId,
      },
    });
    changeUI({ activeCategoryLayers: intersectionBy(updatedActiveLayers, CATEGORY_LAYERS, 'title') });
  };

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedAnalysisLayer(activeOption);
    // Don't remove locale. Is here to recalculate the titles translation
  }, [activeLayers, locale]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      selectedAnalysisLayer={selectedAnalysisLayer}
      handleTooltipActionButtonClick={handleTooltipActionButtonClick}
      handleHighlightLayerFeatureClick={handleHighlightLayerFeatureClick}
      updatedActiveLayers={updatedActiveLayers}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
