import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import featuredMapsActions from 'redux_modules/featured-maps-list';
import featuredMapActions from 'redux_modules/featured-map';

import { useLocale } from '@transifex/react';

import { readStoryAnalytics } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import {
  hitResults,
  setAvatarImage,
  removeAvatarImage,
  setSelectedFeaturedPlace,
  setCursor,
} from 'utils/globe-events-utils';
import {
  layerManagerToggle,
  activateLayersOnLoad,
  setBasemap,
} from 'utils/layer-manager-utils';

import * as scheduling from '@arcgis/core/core/scheduling';

import {
  FEATURED_PLACES_LAYER,
  DISCOVER_PLACES_LAYER,
  VIBRANT_BASEMAP_LAYER,
} from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';

import Component from './featured-globe-component';
import mapStateToProps from './featured-globe-selectors';

const actions = { ...featuredMapsActions, ...urlActions, readStoryAnalytics, ...featuredMapActions };

const featuredGlobeContainer = (props) => {
  const [handle, setHandle] = useState(null);
  const locale = useLocale();

  const {
    activeLayers,
    changeUI,
    changeGlobe,
    featuredMapPlaces,
    selectedFeaturedMap,
    isFeaturedPlaceCard,
    isFullscreenActive,
    sceneSettings,
  } = props;

  const handleMarkerClick = (viewPoint) => {
    console.log(selectedFeaturedMap);
    const featuredPlace = selectedFeaturedMap === 'discoverPlaces' ? DISCOVER_PLACES_LAYER : FEATURED_PLACES_LAYER;
    if (!isFullscreenActive) {
      setSelectedFeaturedPlace(viewPoint, featuredPlace, changeUI);
      props.readStoryAnalytics();
      removeAvatarImage();
    }
  };

  const handleMarkerHover = (viewPoint, view) => {
    const featuredPlace = selectedFeaturedMap === 'discoverPlaces' ? DISCOVER_PLACES_LAYER : FEATURED_PLACES_LAYER;

    const layerFeatures = hitResults(viewPoint, featuredPlace);
    setCursor(layerFeatures);
    if (!isFeaturedPlaceCard) {
      setAvatarImage(
        view,
        layerFeatures,
        selectedFeaturedMap,
        featuredMapPlaces
      );
    }
  };

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList(locale);
  }, [locale]);

  const handleMapLoad = (map, _activeLayers) => {
    setBasemap({
      map,
      layersArray: sceneSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, _activeLayers, layersConfig);
  };

  const spinGlobe = (view) => {
    const camera = view.camera.clone();
    const spinningGlobe = scheduling.addFrameTask({
      update() {
        camera.position.longitude -= 0.2;
        view.camera = camera;
      },
    });
    setHandle(spinningGlobe);
  };
  const handleGlobeUpdating = (updating) =>
    props.changeGlobe({ isGlobeUpdating: updating });
  const toggleLayer = (layerId) =>
    layerManagerToggle(layerId, props.activeLayers, changeGlobe);
  // Array of funtions to be triggered on scene click
  const clickCallbacksArray = [handleMarkerClick];

  const mouseMoveCallbacksArray = [handleMarkerHover];

  const setVibrantLayerMaxScale = ({ layer }) => {
    if (layer.title === VIBRANT_BASEMAP_LAYER) {
      layer.maxScale = 250000.0;
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      handleLayerToggle={toggleLayer}
      handleZoomChange={changeGlobe}
      clickCallbacksArray={clickCallbacksArray}
      mouseMoveCallbacksArray={mouseMoveCallbacksArray}
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      customFunctions={[setVibrantLayerMaxScale]}
      spinGlobe={spinGlobe}
      spinGlobeHandle={handle}
      isFeaturedPlaceCard={isFeaturedPlaceCard}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
};

export default connect(mapStateToProps, actions)(featuredGlobeContainer);
