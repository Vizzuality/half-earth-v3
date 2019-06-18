import React from 'react';
import { connect } from 'react-redux';

import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { layerManagerToggle, exclusiveLayersToggle, layerManagerVisibility, layerManagerOpacity } from 'utils/layer-manager-utils';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';

import ownActions from './data-globe-actions.js';
const actions = { ...ownActions };

const handleMapLoad = (map, view) => {
  const { layers } = map;
  const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
  // set the outFields for the BIODIVERSITY_FACETS_LAYER
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