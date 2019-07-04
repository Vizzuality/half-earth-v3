import React from 'react';
import { connect } from 'react-redux';

import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { layerManagerToggle, exclusiveLayersToggle, layerManagerVisibility, layerManagerOpacity, layerManagerOrder } from 'utils/layer-manager-utils';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';
import { layersConfig } from 'constants/mol-layers-configs';
import { enterLandscapeModeAnalyticsEvent } from 'actions/google-analytics-actions';

import ownActions from './data-globe-actions.js';
import { createLayer } from 'utils/layer-manager-utils';

const actions = { ...ownActions, enterLandscapeModeAnalyticsEvent };

const handleMapLoad = (map, view, activeLayers) => {
  const { layers } = map;

  const gridLayer = layers.items.find(l => l.id === BIODIVERSITY_FACETS_LAYER);
  // set the outFields for the BIODIVERSITY_FACETS_LAYER
  // to get all the attributes available
  gridLayer.outFields = ["*"];

  //list of active biodiversity layers
  const biodiversityLayerIDs = activeLayers
    .filter(({ category }) => category === "Biodiversity")
    .map(({ id }) => id);

  const biodiversityLayers = layersConfig
    .filter(({ slug }) => biodiversityLayerIDs.includes(slug));

  biodiversityLayers.forEach(layer => createLayer(layer, map));
}

const dataGlobeContainer = props => {
  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setDataGlobeSettings, props.activeCategory);
  const exclusiveLayerToggle = (layerToActivate, layerToRemove) => exclusiveLayersToggle(layerToActivate, layerToRemove, props.activeLayers, props.setDataGlobeSettings, props.activeCategory);
  const setLayerVisibility = (layerId, visibility) => layerManagerVisibility(layerId, visibility, props.activeLayers, props.setDataGlobeSettings);
  const setLayerOpacity = (layerId, opacity) => layerManagerOpacity(layerId, opacity, props.activeLayers, props.setDataGlobeSettings);
  const setLayerOrder = (datasets) => layerManagerOrder(datasets, props.activeLayers, props.setDataGlobeSettings);
  const setRasters = (rasters) => props.setDataGlobeSettings({ rasters: rasters })
  const handleZoomChange = (params) => {
    const { landscapeView } = params;
    landscapeView && props.enterLandscapeModeAnalyticsEvent();
    return props.setDataGlobeSettings(params);
  };

  return <Component
    handleLayerToggle={toggleLayer}
    exclusiveLayerToggle={exclusiveLayerToggle}
    setLayerVisibility={setLayerVisibility}
    setLayerOpacity={setLayerOpacity}
    setLayerOrder={setLayerOrder}
    setRasters={setRasters}
    onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers)}
    handleZoomChange={handleZoomChange}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);