import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import { DATA } from 'router';
import { FEATURED_PLACES_LAYER } from 'constants/layers-slugs';
import { setAvatarImage, setSelectedFeaturedPlace } from 'utils/globe-events-utils';

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


const handleMarkerClick = (viewPoint, view) => setSelectedFeaturedPlace(viewPoint, FEATURED_PLACES_LAYER, changeUI)
const handleMarkerHover = (viewPoint, view) => setAvatarImage(view, viewPoint, FEATURED_PLACES_LAYER, featuredMapPlaces);

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList();
  },[])
  
  const handleMapLoad = map => {
    const { layers } = map;
    const _featuredPlacesLayer = layers.items.find(l => l.title === FEATURED_PLACES_LAYER);
    // set the attributes available on the layer
    _featuredPlacesLayer.outFields = ['nam_slg'];
    setFeaturedPlacesLayer(_featuredPlacesLayer);
  }

  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, changeGlobe);
  // Array of funtions to be triggered on scene click
  const clickCallbacksArray = [
    handleMarkerClick
  ]

  const mouseMoveCallbacksArray = [
    handleMarkerHover
  ]

  return (
    <Component
      handleLayerToggle={toggleLayer}
      handleZoomChange={changeGlobe}
      featuredPlacesLayer={featuredPlacesLayer}
      onLoad={(map, view) => handleMapLoad(map)}
      clickCallbacksArray={clickCallbacksArray}
      mouseMoveCallbacksArray={mouseMoveCallbacksArray}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);