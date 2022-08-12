import React, { useState, useEffect, useMemo } from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import ContentfulService from 'services/contentful';
import isEmpty from 'lodash/isEmpty';
import Component from './biodiversity-sidebar-card-component';
import { LAYERS_CATEGORIES, layersConfig } from 'constants/mol-layers-configs';
import { batchToggleLayers, layerManagerToggle, flyToLayerExtent } from 'utils/layer-manager-utils';
import mapStateToProps from './biodiversity-sidebar-card-selectors';

import usePrevious from 'hooks/use-previous';
import { ALL_TAXA_PRIORITY } from 'constants/layers-slugs';
import { getLayersResolution, getLayersToggleConfig, LAYER_VARIANTS, TERRESTRIAL, DEFAULT_RESOLUTION } from 'constants/biodiversity-layers-constants';

const actions = { ...metadataActions, ...urlActions };
const BiodiversitySidebarCard = (props) => {
  const locale = useLocale();
  const layersResolution = useMemo(() => getLayersResolution(), [locale]);
  const layersToggleConfig = useMemo(() => getLayersToggleConfig(), [locale]);

  const { changeGlobe, changeUI, activeLayers, biodiversityLayerVariant, view } = props;
  const { PRIORITY, RICHNESS, RARITY } = LAYER_VARIANTS;
  const previousBiodiversityLayerVariant = usePrevious(
    biodiversityLayerVariant
  );
  const [cardMetadata, setCardMetadata] = useState({
    [PRIORITY]: {},
    [RICHNESS]: {},
    [RARITY]: {},
  })

  const [showCard, setShowCard] = useState(true);

  const [selectedLayer, setSelectedLayer] = useState(ALL_TAXA_PRIORITY)
  const [selectedResolution, setSelectedResolution] = useState(DEFAULT_RESOLUTION)
  useEffect(() => {
    if (isEmpty(cardMetadata[biodiversityLayerVariant])) {
      ContentfulService.getMetadata(biodiversityLayerVariant, locale).then(data => {
        setCardMetadata({
          ...cardMetadata,
          [biodiversityLayerVariant]: {
            ...data
          }
        });
      })
    }
  }, [biodiversityLayerVariant, layersResolution, locale]);

  useEffect(() => {
    const resolutionExists = (category) => layersResolution[biodiversityLayerVariant][category].some(res => res.slug === selectedResolution[category]);
    if (!resolutionExists(TERRESTRIAL)) {
      setSelectedResolution(DEFAULT_RESOLUTION);
    }
  }, [biodiversityLayerVariant, layersResolution]);

  useEffect(() => {
    if (!previousBiodiversityLayerVariant) return;
    const activeBiodiversityLayers = activeLayers
      .filter((l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY)
      .map((l) => l.title);
    const resolution = selectedResolution[TERRESTRIAL];
    const defaultResolutionLayers = layersToggleConfig[biodiversityLayerVariant][TERRESTRIAL][DEFAULT_RESOLUTION[TERRESTRIAL]];
    const availableLayers = layersToggleConfig[biodiversityLayerVariant][TERRESTRIAL][resolution];
    const layerTaxa = activeBiodiversityLayers.length ? activeBiodiversityLayers[0].slice(0, activeBiodiversityLayers[0].indexOf("-")) : ""
    const hasMatchingLayer = availableLayers && availableLayers.find(layer => layer.value.includes(layerTaxa));

    if (hasMatchingLayer) {
      // select matching layer on selected variant
      handleLayerToggle(hasMatchingLayer);
    } else if (availableLayers) {
      // select first element if there's no matching layer
      handleLayerToggle(availableLayers[0]);
    } else {
      // select first element if there's no maching resolution
      handleLayerToggle(defaultResolutionLayers[0]);
    }

  }, [biodiversityLayerVariant, selectedResolution])

  const handleTabSelection = (slug) => {
    const { onboardingStep, onboardingType } = props;
    changeUI({
      biodiversityLayerVariant: slug,
      onboardingStep: onboardingStep && (onboardingStep + 1),
      waitingInteraction: onboardingType && false});
  }

  const handleClearAndAddLayers = (bioLayerIds, layerIds) => {
    batchToggleLayers(
      bioLayerIds.concat(layerIds),
      activeLayers,
      changeGlobe,
      LAYERS_CATEGORIES.BIODIVERSITY
    );
  };

  const handleLayerToggle = (option) => {
    const layer = layersConfig[option.layer];
    if (selectedLayer === option.layer) {
      layerManagerToggle(option.layer, activeLayers, changeGlobe, LAYERS_CATEGORIES.BIODIVERSITY);
      setSelectedLayer(null);
    } else if (selectedLayer) {
      layer.bbox && flyToLayerExtent(layer.bbox, view);
      batchToggleLayers([selectedLayer, option.layer], activeLayers, changeGlobe, LAYERS_CATEGORIES.BIODIVERSITY)
      setSelectedLayer(option.layer);
    } else {
      layer.bbox && flyToLayerExtent(layer.bbox, view);
      layerManagerToggle(option.layer, activeLayers, changeGlobe, LAYERS_CATEGORIES.BIODIVERSITY);
      setSelectedLayer(option.layer);
    }
  }

  const handleCloseCard = () => {
    setShowCard(false);
  }

  return (
    <Component
      handleLayerToggle={handleLayerToggle}
      selectedResolution={selectedResolution}
      setSelectedResolution={setSelectedResolution}
      handleClearAndAddLayers={handleClearAndAddLayers}
      handleTabSelection={handleTabSelection}
      cardMetadata={cardMetadata[biodiversityLayerVariant]}
      showCard={showCard}
      handleCloseCard={handleCloseCard}
      {...props}
    />
  );
};
export default connect(mapStateToProps, actions)(BiodiversitySidebarCard);
