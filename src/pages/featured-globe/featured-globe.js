import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { setRasterFuntion, mosaicRuleFix } from 'utils/raster-layers-utils';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { HUMAN_PRESSURES_COLOR_RAMP } from 'constants/human-pressures';
import { DATA } from 'router';

import { createAction } from 'redux-tools';
import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';
import featuredMapsActions from 'redux_modules/selected-featured-map';

const handleSwitch = createAction(DATA);

const actions = { ...ownActions, ...featuredMapsActions, handleSwitch}
const handleMapLoad = map => {
  const { layers } = map;
  // This fix has been added as a workaround to a bug introduced on v4.12
  // The bug was causing the where clause of the mosaic rule to not work
  // It will be probably fixed on v4.13
  const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
  loadModules(["esri/config"]).then(([esriConfig]) => {
    mosaicRuleFix(esriConfig, humanImpactLayer)
  })

  // Update default human impact layer color ramp
  loadModules(["esri/layers/support/RasterFunction", "esri/Color"]).then(([RasterFunction, Color]) => {
    humanImpactLayer.noData = 0;
    humanImpactLayer.renderingRule = setRasterFuntion(RasterFunction, Color, HUMAN_PRESSURES_COLOR_RAMP);
  })
}
const feturedGlobeContainer = props => {

  useEffect(() => {
    const { setFeaturedMaps } = props;
    setFeaturedMaps()
  },[])

  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, props.setFeaturedGlobeSettings);
  const handleZoomChange = props.setFeaturedGlobeSettings;

  return <Component 
    handleLayerToggle={toggleLayer}
    handleZoomChange={handleZoomChange}
    onLoad={(map, view) => handleMapLoad(map)}
    {...props}/>
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);