import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { usePostRobot } from 'hooks/attach-post-robot';

import { BIODIVERSITY_FACETS_LAYER, LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';

import { layerManagerToggle, exclusiveLayersToggle, layerManagerVisibility, layerManagerOpacity, layerManagerOrder } from 'utils/layer-manager-utils';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';
import { layersConfig } from 'constants/mol-layers-configs';
import { enterLandscapeModeAnalyticsEvent } from 'actions/google-analytics-actions';

import ownActions from './data-globe-actions.js';
import { createLayer } from 'utils/layer-manager-utils';

const actions = { ...ownActions, enterLandscapeModeAnalyticsEvent };

const handleMapLoad = (map, view, activeLayers, mountFeaturedGlobe) => {
  const { layers } = map;

  const gridLayer = layers.items.find(l => l.title === BIODIVERSITY_FACETS_LAYER);
  // set the outFields for the BIODIVERSITY_FACETS_LAYER
  // to get all the attributes available
  gridLayer.outFields = ["*"];

  // This fix has been added as a workaround to a bug introduced on v4.12
  // The bug was causing the where clause of the mosaic rule to not work
  // It will be probably fixed on v4.13
  const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
  loadModules(["esri/config"]).then(([esriConfig]) => {
    esriConfig.request.interceptors.push({
      urls: `${humanImpactLayer.url}/exportImage`,
      before: function (params) {
        if(params.requestOptions.query.mosaicRule) {
          params.requestOptions.query.mosaicRule = JSON.stringify(humanImpactLayer.mosaicRule.toJSON());
        }
      }
    });
  })

  // Here we are creating the biodiversity layers active in the URL
  // this is needed to have the layers displayed on the map when sharing the URL
  // we would be able to get rid of it when this layers are added to the scene via arcgis online
  const biodiversityLayerIDs = activeLayers
    .filter(({ category }) => category === "Biodiversity")
    .map(({ title }) => title);

  const biodiversityLayers = layersConfig
    .filter(({ slug }) => biodiversityLayerIDs.includes(slug));

  biodiversityLayers.forEach(layer => createLayer(layer, map));

  loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
    watchUtils.whenNotOnce(view, 'updating', () => { mountFeaturedGlobe() ;})
  })
}

const dataGlobeContainer = props => {
  const flyToLocation = (center, zoom) => props.setDataGlobeSettings({ center, zoom });
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
  const mountFeaturedGlobe = () => props.setDataGlobeSettings({ mountFeaturedGlobe: true });

  usePostRobot(props.listeners, { flyToLocation, toggleLayer, setLayerOpacity });

  return <Component
    handleLayerToggle={toggleLayer}
    exclusiveLayerToggle={exclusiveLayerToggle}
    setLayerVisibility={setLayerVisibility}
    setLayerOpacity={setLayerOpacity}
    setLayerOrder={setLayerOrder}
    setRasters={setRasters}
    onLoad={(map, view) => handleMapLoad(map, view, props.activeLayers, mountFeaturedGlobe)}
    handleZoomChange={handleZoomChange}
    {...props}/>
}

export default connect(mapStateToProps, actions)(dataGlobeContainer);