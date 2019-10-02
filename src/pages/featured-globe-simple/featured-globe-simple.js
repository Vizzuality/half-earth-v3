import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import { createLayer, addLayerToMap } from 'utils/layer-manager-utils';
import { config } from 'constants/mol-layers-configs';
import { humanPressuresPreloadFixes } from 'utils/raster-layers-utils';
import { DATA } from 'router';
import { setAvatarImage, removeAvatarImage, setSelectedFeaturedPlace, setCursor } from 'utils/globe-events-utils';
import { layerManagerToggle, layerManagerVisibility, layerManagerOpacity, layerManagerOrder} from 'utils/layer-manager-utils';
import { FEATURED_PLACES_LAYER, LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';

import { createAction } from 'redux-tools';
import Component from './featured-globe-simple-component.jsx';

import mapStateToProps from './featured-globe-simple-selectors';
import * as urlActions from 'actions/url-actions';
import featuredMapsActions from 'redux_modules/featured-maps-list';

const handleSwitch = createAction(DATA);

const actions = { ...featuredMapsActions, ...urlActions, handleSwitch}

const feturedGlobeContainer = props => {
  const [handle, setHandle] = useState(null);
  const { changeUI, changeGlobe, featuredMapPlaces, selectedFeaturedMap } = props;


const handleMarkerClick = (viewPoint, view) => {
  setSelectedFeaturedPlace(viewPoint, FEATURED_PLACES_LAYER, changeUI)
  removeAvatarImage();
}
const handleMarkerHover = (viewPoint, view) => {
  setCursor(viewPoint, FEATURED_PLACES_LAYER);
  setAvatarImage(view, viewPoint, FEATURED_PLACES_LAYER, selectedFeaturedMap, featuredMapPlaces);
};

  useEffect(() => {
    const { setFeaturedMapsList } = props;
    setFeaturedMapsList();
  },[])

  const handleMapLoad = (map, activeLayers) => {
    const activeLayerIDs = activeLayers
      .map(({ title }) => title);
  
    activeLayerIDs.forEach(async layerName => {
      const layerConfig = config[layerName];
      if (layerConfig) {
        const newLayer = await createLayer(layerConfig, map);
        newLayer.outFields = ["*"];
        if (layerConfig.slug === LAND_HUMAN_PRESSURES_IMAGE_LAYER) {
          humanPressuresPreloadFixes(newLayer, props.rasters);
        }
        addLayerToMap(newLayer, map);
      }
    });
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
    })
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
      clickCallbacksArray={clickCallbacksArray}
      mouseMoveCallbacksArray={mouseMoveCallbacksArray}
      onMapLoad={(map) => handleMapLoad(map, props.activeLayers)}
      setRasters={setRasters}
      setLayerVisibility={setLayerVisibility}
      setLayerOpacity={setLayerOpacity}
      setLayerOrder={setLayerOrder}
      handleGlobeUpdating={handleGlobeUpdating}
      customFunctions={[showHumanPressuresOnLandscape]}
      spinGlobe={spinGlobe}
      spinGlobeHandle={handle}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(feturedGlobeContainer);