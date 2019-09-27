import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { setRasterFuntion, mosaicRuleFix } from 'utils/raster-layers-utils';
import { HUMAN_PRESSURES_COLOR_RAMP } from 'constants/human-pressures';
import { DATA } from 'router';
import { setAvatarImage, setSelectedFeaturedPlace } from 'utils/globe-events-utils';
import { layerManagerToggle, layerManagerVisibility, layerManagerOpacity, layerManagerOrder} from 'utils/layer-manager-utils';
import { FEATURED_PLACES_LAYER, LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';

import { createAction } from 'redux-tools';
import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as ownActions from './featured-globe-actions.js';
import * as urlActions from 'actions/url-actions';
import featuredMapsActions from 'redux_modules/featured-maps-list';

const handleSwitch = createAction(DATA);

const actions = { ...ownActions, ...featuredMapsActions, ...urlActions, handleSwitch}

const feturedGlobeContainer = props => {

  const { changeUI, changeGlobe, featuredMapPlaces } = props;
  const [featuredPlacesLayer, setFeaturedPlacesLayer] = useState(null);


const handleMarkerClick = (viewPoint, view, selectedFeaturedMap) => {
  // TODO: REMOVE AFTER PRIORITY PLACES ARE READY
  if (selectedFeaturedMap !== 'priorPlaces') {
    setSelectedFeaturedPlace(viewPoint, FEATURED_PLACES_LAYER, changeUI)
    // remove the avatar image
    setAvatarImage(view, viewPoint, FEATURED_PLACES_LAYER, featuredMapPlaces, true)
  }
}
const handleMarkerHover = (viewPoint, view) => setAvatarImage(view, viewPoint, FEATURED_PLACES_LAYER, featuredMapPlaces);

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList();
  },[])

  const handleMapLoad = (map, view, isLandscapeMode) => {
    const { layers } = map;
    const _featuredPlacesLayer = layers.items.find(l => l.title === FEATURED_PLACES_LAYER);
    // set the attributes available on the layer
    _featuredPlacesLayer.outFields = ['nam_slg'];
    setFeaturedPlacesLayer(_featuredPlacesLayer);

    // This fix has been added as a workaround to a bug introduced on v4.12
    // The bug was causing the where clause of the mosaic rule to not work
    // It will be probably fixed on v4.13
    const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
    loadModules(["esri/config"]).then(([esriConfig]) => {
      mosaicRuleFix(esriConfig, humanImpactLayer, 'FEATURED')
    })

    // Update default human impact layer color ramp
    loadModules(["esri/layers/support/RasterFunction", "esri/Color"]).then(([RasterFunction, Color]) => {
      humanImpactLayer.noData = 0;
      humanImpactLayer.renderingRule = setRasterFuntion(RasterFunction, Color, HUMAN_PRESSURES_COLOR_RAMP);
    })

    // hide human pressure layers after first load, if the globe is not it the landscape mode
    if (humanImpactLayer) humanImpactLayer.visible = !!isLandscapeMode;
    
    view.on("pointer-down", function(event) {
      setSelectedFeaturedPlace(event, view, changeUI);
    });
  }

  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, changeGlobe);
  // Array of funtions to be triggered on scene click
  const clickCallbacksArray = [
    handleMarkerClick
  ]

  const mouseMoveCallbacksArray = [
    handleMarkerHover
  ]
  const setRasters = (rasters) => props.setFeaturedGlobeSettings({ rasters: rasters })
  const setLayerVisibility = (layerId, visibility) => layerManagerVisibility(layerId, visibility, props.activeLayers, props.setFeaturedGlobeSettings);
  const setLayerOpacity = (layerId, opacity) => layerManagerOpacity(layerId, opacity, props.activeLayers, props.setFeaturedGlobeSettings);
  const setLayerOrder = (datasets) => layerManagerOrder(datasets, props.activeLayers, props.setFeaturedGlobeSettings);
  const handleGlobeUpdating = (updating) => props.setFeaturedGlobeSettings({ isGlobeUpdating: updating })

  const showHumanPressuresOnLandscape = ({ layer, setActive }) => {
    // Hide human_pressures_layer where they are not in landscape mode
    if(layer.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER) {
      layer.visible = props.isLandscapeMode && setActive;
    }
  }

  return (
    <Component
      handleLayerToggle={toggleLayer}
      handleZoomChange={changeGlobe}
      featuredPlacesLayer={featuredPlacesLayer}
      clickCallbacksArray={clickCallbacksArray}
      mouseMoveCallbacksArray={mouseMoveCallbacksArray}
      onLoad={(map, view) => handleMapLoad(map, view, props.isLandscapeMode)}
      setRasters={setRasters}
      setLayerVisibility={setLayerVisibility}
      setLayerOpacity={setLayerOpacity}
      setLayerOrder={setLayerOrder}
      handleGlobeUpdating={handleGlobeUpdating}
      customFunctions={[showHumanPressuresOnLandscape]}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);