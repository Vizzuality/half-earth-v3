import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale, useT } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import {
  layerManagerToggle,
  batchToggleLayers,
} from 'utils/layer-manager-utils';

import ContentfulService from 'services/contentful';

import {
  AOI_LEGEND_CATEGORIES,
  getSidebarCardsConfig,
} from 'constants/analyze-areas-constants';
import {
  ALL_TAXA_LAYER_VARIANTS,
  LAYER_VARIANTS,
} from 'constants/biodiversity-layers-constants';
import metadataConfig from 'constants/metadata';

import Component from './component';

const actions = { ...metadataActions, ...urlActions };

function Container(props) {
  const {
    contextualData,
    toggleType,
    changeGlobe,
    changeUI,
    activeLayers,
    cardCategory,
    metadataSlug,
    layers,
  } = props;

  const locale = useLocale();
  const t = useT();

  const sidebarCardsConfig = useMemo(
    () => getSidebarCardsConfig(locale),
    [locale]
  );
  const layerSlugs = useMemo(() => layers.map((l) => l.slug), [layers]);
  const selectedActiveLayers = useMemo(
    () =>
      activeLayers.filter((activeLayer) =>
        layerSlugs.includes(activeLayer.title)
      ),
    [layerSlugs, activeLayers]
  );

  const [cardDescription, setCardDescription] = useState(null);
  const [protectedAreasModalOpen, setProtectedAreasModalOpen] = useState(false);

  const { description: getDescription, title } =
    sidebarCardsConfig[cardCategory];
  const [metadata, setMetadata] = useState(null);
  // Just to get the sources of each card
  useEffect(() => {
    ContentfulService.getMetadata(metadataConfig[metadataSlug], locale).then(
      (data) => {
        setMetadata(data);
      }
    );
  }, [locale]);

  useEffect(() => {
    if (Object.keys(contextualData).length > 0 && !contextualData.WDPA_PID) {
      setCardDescription(getDescription(contextualData));
    }
    // Don't remove locale. Is here to recalculate the description translation
  }, [contextualData, locale]);

  const humanPressuresData = useMemo(() => {
    const titles = {
      agriculture: t('Agriculture'),
      builtup: t('Urban and Built up'),
      extraction: t('Energy and Occupancy'),
      intrusion: t('Human intrusion'),
      transportation: t('Transportation'),
    };
    return (
      contextualData?.pressures &&
      Object.keys(contextualData?.pressures).reduce((acc, key) => {
        if (
          contextualData.pressures[key] &&
          contextualData.pressures[key].length
        ) {
          acc[key] = {
            title: titles[key],
            values: contextualData.pressures[key],
          };
        }
        return acc;
      }, {})
    );
  }, [contextualData]);

  const radioTypeToggle = (option) => {
    const selectedActiveLayerTitles =
      selectedActiveLayers &&
      selectedActiveLayers.length &&
      selectedActiveLayers.map((l) => l.title);

    if (!selectedActiveLayerTitles) {
      // Add layer to empty selection
      layerManagerToggle(option.slug, activeLayers, changeGlobe);
      // Sync with map layers tab
      changeUI({
        biodiversityLayerVariant: ALL_TAXA_LAYER_VARIANTS[option.slug],
      });
      return;
    }
    if (selectedActiveLayerTitles.includes(option.slug)) {
      // Remove selected layer
      layerManagerToggle(option.slug, activeLayers, changeGlobe);
      // Default to priority map layers tab
      changeUI({
        biodiversityLayerVariant: LAYER_VARIANTS.PRIORITY,
      });

      return;
    }
    // Add layer and toggle the rest
    batchToggleLayers(
      [...selectedActiveLayerTitles, option.slug],
      activeLayers,
      changeGlobe
    );
    // Sync with map layers tab
    changeUI({
      biodiversityLayerVariant: ALL_TAXA_LAYER_VARIANTS[option.slug],
    });
  };

  const checkboxTypeToggle = (option) => {
    layerManagerToggle(option.value, activeLayers, changeGlobe);
  };

  const handleAllProtectedAreasClick = () => {
    setProtectedAreasModalOpen(true);
  };

  const handleProtectedAreasModalToggle = () => {
    setProtectedAreasModalOpen(!protectedAreasModalOpen);
  };
  return (
    <Component
      cardTitle={title}
      cardDescription={cardDescription}
      hasLegend={AOI_LEGEND_CATEGORIES.some((c) => c === cardCategory)}
      onChange={toggleType === 'radio' ? radioTypeToggle : checkboxTypeToggle}
      handleAllProtectedAreasClick={handleAllProtectedAreasClick}
      handleProtectedAreasModalToggle={handleProtectedAreasModalToggle}
      isProtectedAreasModalOpen={protectedAreasModalOpen}
      metadata={metadata}
      humanPressuresData={humanPressuresData}
      {...props}
    />
  );
}

export default connect(null, actions)(Container);
