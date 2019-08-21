import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { setRasterFuntion, mosaicRuleFix } from 'utils/raster-layers-utils';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { HUMAN_PRESSURES_COLOR_RAMP } from 'constants/human-pressures';
import { setSelectedFeaturedPlace } from 'utils/featured-globe-utils';
import { DATA } from 'router';
import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';

import { createAction } from 'redux-tools';
import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';
import * as urlActions from 'actions/url-actions';
import featuredMapsActions from 'redux_modules/featured-maps-list';

const handleSwitch = createAction(DATA);

const actions = { ...ownActions, ...featuredMapsActions, ...urlActions, handleSwitch}

const feturedGlobeContainer = props => {

  const { changeUI, changeGlobe } = props;
  const [featuredPlacesLayer, setFeaturedPlacesLayer] = useState(null);

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList();
  },[])
  
const handleMapLoad = (map, view) => {
  const { layers } = map;
  const _featuredPlacesLayer = layers.items.find(l => l.title === FEATURED_PLACES_LAYER);
  // set the attributes available on the layer
  _featuredPlacesLayer.outFields = ['nam_slg'];
  setFeaturedPlacesLayer(_featuredPlacesLayer);

  view.on("pointer-down", function(event) {
    setSelectedFeaturedPlace(event, view, changeUI);
  });
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

  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, changeGlobe);

  return (
    <Component
      handleLayerToggle={toggleLayer}
      handleZoomChange={changeGlobe}
      featuredPlacesLayer={featuredPlacesLayer}
      onLoad={(map, view) => handleMapLoad(map, view)}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);