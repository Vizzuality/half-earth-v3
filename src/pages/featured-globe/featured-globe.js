import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import { layersConfig } from 'constants/mol-layers-configs';
import { setAvatarImage, removeAvatarImage, setSelectedFeaturedPlace, setCursor } from 'utils/globe-events-utils';
import { layerManagerToggle, activateLayersOnLoad } from 'utils/layer-manager-utils';
import { 
  FEATURED_PLACES_LAYER,
  VIBRANT_BASEMAP_LAYER
} from 'constants/layers-slugs';
import { 
  FEATURED_GLOBE_LANDSCAPE_ONLY_LAYERS
} from 'constants/layers-groups';
import { isMobile } from 'constants/responsive';

import Component from './featured-globe-component.jsx';

import mapStateToProps from './featured-globe-selectors';
import * as urlActions from 'actions/url-actions';
import featuredMapsActions from 'redux_modules/featured-maps-list';

const actions = { ...featuredMapsActions, ...urlActions}

const feturedGlobeContainer = props => {
  const [handle, setHandle] = useState(null);
  const isOnMobile = isMobile();
  const { changeUI, changeGlobe, featuredMapPlaces, selectedFeaturedMap, isFeaturedPlaceCard, isFullscreenActive } = props;

  const handleMarkerClick = (viewPoint, view) => {
    if(!isFullscreenActive) {
      setSelectedFeaturedPlace(viewPoint, FEATURED_PLACES_LAYER, changeUI)
      removeAvatarImage();
    }
  }
  const handleMarkerHover = (viewPoint, view) => {
    if (!isOnMobile) {
      setCursor(viewPoint, FEATURED_PLACES_LAYER);
      if (!isFeaturedPlaceCard) setAvatarImage(view, viewPoint, FEATURED_PLACES_LAYER, selectedFeaturedMap, featuredMapPlaces);
    }
  };

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList();
  },[])

  const handleMapLoad = (map, activeLayers) => {
    activateLayersOnLoad(map, activeLayers, layersConfig);
  }

  const spinGlobe = (view) => {
    loadModules(["esri/core/scheduling"]).then(([scheduling]) => {
      const camera = view.camera.clone();
      const spinningGlobe = scheduling.addFrameTask({
        update: function() {
          camera.position.longitude -= 0.2;
          view.camera = camera;
        }
      });
      setHandle(spinningGlobe);
    });
  }

  const handleGlobeUpdating = (updating) => props.changeGlobe({ isGlobeUpdating: updating });
  const toggleLayer = layerId => layerManagerToggle(layerId, props.activeLayers, changeGlobe);
  // Array of funtions to be triggered on scene click
  const clickCallbacksArray = [
    handleMarkerClick
  ]

  const mouseMoveCallbacksArray = [
    handleMarkerHover
  ]

  const showLayersOnlyOnLandscape = ({ layer, isVisible }) => {
    const isLandscapeOnlyLayer = FEATURED_GLOBE_LANDSCAPE_ONLY_LAYERS.includes(layer.title);
    // Hide human_pressures_layer where they are not in landscape mode
    if(isLandscapeOnlyLayer) {
      layer.visible = props.isLandscapeMode && isVisible;
    }
  }

  const setVibrantLayerMaxScale = ({ layer }) => {
    if (layer.title === VIBRANT_BASEMAP_LAYER) {
      layer.maxScale = 250000.0
    }
  }

  return (
    <Component
      handleLayerToggle={toggleLayer}
      handleZoomChange={changeGlobe}
      clickCallbacksArray={clickCallbacksArray}
      mouseMoveCallbacksArray={mouseMoveCallbacksArray}
      onMapLoad={(map) => handleMapLoad(map, props.activeLayers)}
      customFunctions={[showLayersOnlyOnLandscape, setVibrantLayerMaxScale]}
      spinGlobe={spinGlobe}
      spinGlobeHandle={handle}
      isFeaturedPlaceCard={isFeaturedPlaceCard}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);