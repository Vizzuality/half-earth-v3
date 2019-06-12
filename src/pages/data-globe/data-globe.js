import React from 'react';
import { connect } from 'react-redux';

import { layerManagerToggle, exclusiveLayersToggle, layerManagerVisibility, layerManagerOpacity } from 'utils/layer-manager-utils';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';
import biodiversityActions from 'redux_modules/biodiversity-data/biodiversity-data';

import ownActions from './data-globe-actions.js';
const actions = { ...ownActions, ...biodiversityActions };

const RICHNESS_RARITY_GRID = 'rarity-richness-GRID';
// const TAXA_FIELD = 'TAXA';

const handleMapLoad = (map, view) => {
  const { layers } = map;
  const gridLayer = layers.items.find(l => l.title === RICHNESS_RARITY_GRID);
  // set the outFields for the rarity-richness-GRID layer
  // to get all the attributes available
  gridLayer.outFields = ["*"];
}

const dataGlobeContainer = props => {
  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setDataGlobeSettings, props.activeCategory);
  const exclusiveLayerToggle = (layerToActivate, layerToRemove) => exclusiveLayersToggle(layerToActivate, layerToRemove, props.activeLayers, props.setDataGlobeSettings, props.activeCategory);
  const setLayerVisibility = (layerId, visibility) => layerManagerVisibility(layerId, visibility, props.activeLayers, props.setDataGlobeSettings);
  const setLayerOpacity = (layerId, opacity) => layerManagerOpacity(layerId, opacity, props.activeLayers, props.setDataGlobeSettings);
  const setRasters = (rasters) => props.setDataGlobeSettings({ rasters: rasters })
  const handleZoomChange = props.setDataGlobeSettings;
  
  return <Component
    handleLayerToggle={toggleLayer}
    exclusiveLayerToggle={exclusiveLayerToggle}
    setLayerVisibility={setLayerVisibility}
    setLayerOpacity={setLayerOpacity}
    setRasters={setRasters}
    onLoad={(map, view) => handleMapLoad(map, view)}
    handleZoomChange={handleZoomChange}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);