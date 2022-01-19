import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import metadataService from 'services/metadata-service';
import isEmpty from 'lodash/isEmpty';
import Component from './biodiversity-sidebar-card-component';
import { LAYERS_CATEGORIES, layersConfig } from 'constants/mol-layers-configs';
import { batchToggleLayers, layerManagerToggle, flyToLayerExtent } from 'utils/layer-manager-utils';
import mapStateToProps from './biodiversity-sidebar-card-selectors';

import usePrevious from 'hooks/use-previous';
import { ALL_TAXA_PRIORITY } from 'constants/layers-slugs';
import { LAYERS_RESOLUTION, LAYERS_TOGGLE_CONFIG, LAYER_VARIANTS, TERRESTRIAL, DEFAULT_RESOLUTION } from 'constants/biodiversity-layers-constants';

const actions = {...metadataActions, ...urlActions};
const BiodiversitySidebarCard = (props)  => {
  const { changeGlobe, changeUI, activeLayers, biodiversityLayerVariant, view } = props;
  const { PRIORITY, RICHNESS, RARITY } = LAYER_VARIANTS;
  const previousBiodiversityLayerVariant = usePrevious(
    biodiversityLayerVariant
  );
  const [cardMetadata, setCardMetadata] = useState({
    [PRIORITY] : {},
    [RICHNESS] : {},
    [RARITY] : {},
  })

  const [showCard, setShowCard] = useState(true);

  const [selectedLayer, setSelectedLayer] = useState(ALL_TAXA_PRIORITY)
  const [selectedResolution, setSelectedResolution] = useState(DEFAULT_RESOLUTION)
  useEffect(() => {
    if (isEmpty(cardMetadata[biodiversityLayerVariant])) {
      metadataService.getMetadata(biodiversityLayerVariant).then( data => {
        setCardMetadata({
          ...cardMetadata,
          [biodiversityLayerVariant]: {
            ...data
          }
        });
      })
    }
  }, [biodiversityLayerVariant]);

  useEffect(() => {
    const resolutionExists = (category) => LAYERS_RESOLUTION[biodiversityLayerVariant][category].some(res => res.slug === selectedResolution[category]);
    if (!resolutionExists(TERRESTRIAL)) {
      setSelectedResolution(DEFAULT_RESOLUTION);
    }
  }, [biodiversityLayerVariant]);

  useEffect(() => {
    if (!previousBiodiversityLayerVariant) return;
    const activeBiodiversityLayers = activeLayers
    .filter((l) => l.category === LAYERS_CATEGORIES.BIODIVERSITY)
    .map((l) => l.title);
    const resolution = selectedResolution[TERRESTRIAL];
    const deafaultResolutionLayers = LAYERS_TOGGLE_CONFIG[biodiversityLayerVariant][TERRESTRIAL][DEFAULT_RESOLUTION[TERRESTRIAL]];
    const availableLayers = LAYERS_TOGGLE_CONFIG[biodiversityLayerVariant][TERRESTRIAL][resolution];
    const layerTaxa = activeBiodiversityLayers.length ? activeBiodiversityLayers[0].slice(0, activeBiodiversityLayers[0].indexOf("-")) : ""
    const hasMatchingLayer = availableLayers && availableLayers.find(layer => layer.value.includes(layerTaxa));
    if (hasMatchingLayer) {
      // select matching layer on selected variant
      handleLayerToggle(hasMatchingLayer);
    } else if(availableLayers) {
      // select first element if there's no matching layer
      handleLayerToggle(availableLayers[0]);
    } else {
      // select first element if there's no maching resolution
      handleLayerToggle(deafaultResolutionLayers[0]);
    }

  }, [biodiversityLayerVariant])

  const handleTabSelection = (slug) => {
    changeUI({ biodiversityLayerVariant: slug });
  };

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
    } else if(selectedLayer) {
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
