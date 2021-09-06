import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Component from './scene-component';
import { loadModules } from 'esri-loader';
import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import urlActions from 'actions/url-actions';
import sceneActions from 'redux_modules/scene';

const actions = { ...urlActions, ...sceneActions };

const SceneContainer = (props) => {
  const {
    sceneId,
    sceneName,
    onMapLoad,
    onViewLoad,
    changeGlobe,
    setSceneMap,
    setSceneView,
    loaderOptions,
    sceneSettings,
    urlParamsUpdateDisabled
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [loadState, setLoadState] = useState('loading');

  useEffect(() => {
    loadModules([
      "esri/Map",
    ], loaderOptions)
      .then(([Map]) => {

        const _map = new Map({
          basemap: SATELLITE_BASEMAP_LAYER,
        });

        setMap(_map);
        onMapLoad && onMapLoad(_map);
      })
      .catch(err => {
        console.error(err);
      });
  }, [])

  useEffect(() => {
    if (map) {
      loadModules(["esri/views/SceneView"], loaderOptions)
        .then(([SceneView]) => {
          const _view = new SceneView({
            map: map,
            container: `scene-container-${sceneName || sceneId}`,
            ...sceneSettings
          });
          setView(_view);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },[map])

  useEffect(() => {
    if (map && view) {
      setLoadState('loaded');
      onViewLoad && onViewLoad(map, view);
      setSceneMap(map);
      setSceneView(view);
    }
  }, [map, view]);

  // Update location in URL
  useEffect(() => {
    let watchHandle;
    if (view && view.center && !urlParamsUpdateDisabled) {
      loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
        watchHandle = watchUtils.whenTrue(view, "stationary", function() {
          const { longitude, latitude } = view.center;
          changeGlobe({ center: [longitude, latitude], zoom: view.zoom });
        });
      })
    }

    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [view]);

  return (
    <Component
      loadState={loadState}
      map={map}
      view={view}
      {...props}
    />
  )
}

export default connect(null, actions)(SceneContainer);