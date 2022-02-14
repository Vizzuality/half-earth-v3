import React, {useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Component from './scene-component';
import { loadModules } from 'esri-loader';
import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import urlActions from 'actions/url-actions';
import sceneActions from 'redux_modules/scene';

const actions = { ...urlActions, ...sceneActions };

const InitialRotation = (props) => {
  const { rotationKey, setRotationActive,  view, animationRotatedDegrees, setAnimationRotatedDegrees } = props;

  // Rotate globe once on start
  useEffect(() => {
    const ROTATION_SPEED = 1;
    const rotate = () => {
      if ((view && view.interacting) || animationRotatedDegrees > 360) {
        setRotationActive(false);
        localStorage.setItem(rotationKey, true);
      } else {
        const camera = view.camera.clone();
        camera.position.longitude -= ROTATION_SPEED;
        view.goTo(camera, { animate: false })
        .then(() => {
          setAnimationRotatedDegrees(animationRotatedDegrees + ROTATION_SPEED)
        });
      }
    }

    requestAnimationFrame(rotate);
  }, [view, animationRotatedDegrees, setRotationActive])

  return null;
}
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
    urlParamsUpdateDisabled,
    initialRotation
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [rotationActive, setRotationActive] = useState(false);
  const [hasSetRotationActive, setHasSetRotationActive] = useState(false);
  const [animationRotatedDegrees, setAnimationRotatedDegrees] = useState(0);
  const [loadState, setLoadState] = useState('loading');

  const rotationKey = useMemo(() => initialRotation && `${sceneName}HasRotated`, []);
  const hasSceneRotated = useMemo(() => localStorage.getItem(rotationKey), []);

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
    if (view && view.center && !urlParamsUpdateDisabled && !rotationActive) {
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
  }, [view, rotationActive]);

  // Start rotation when loaded
  useEffect(() => {
    if (initialRotation && !hasSceneRotated && view && view.camera && !hasSetRotationActive) {
      setRotationActive(true);
      setHasSetRotationActive(true);
    }
  }, [view, view && view.camera, initialRotation, hasSceneRotated, hasSetRotationActive]);

  return (
    <>
    <Component
      loadState={loadState}
      map={map}
      view={view}
      {...props}
    />
    {initialRotation && rotationActive &&
      <InitialRotation
        rotationKey={rotationKey}
        setRotationActive={setRotationActive}
        view={view}
        animationRotatedDegrees={animationRotatedDegrees}
        setAnimationRotatedDegrees={setAnimationRotatedDegrees}
      />
    }
    </>
  )
}

export default connect(null, actions)(SceneContainer);
