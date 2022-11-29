/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import sceneActions from 'redux_modules/scene';

import { loadModules } from 'esri-loader';

import urlActions from 'actions/url-actions';

import { SATELLITE_BASEMAP_LAYER } from 'constants/layers-slugs';
import { useMobile } from 'constants/responsive';

import Component from './scene-component';
import mapStateToProps from './selectors';

const actions = { ...urlActions, ...sceneActions };

function InitialRotation(props) {
  const {
    rotationKey,
    setRotationActive,
    view,
    animationRotatedDegrees,
    setAnimationRotatedDegrees,
  } = props;

  // Rotate globe once on start
  useEffect(() => {
    const ROTATION_SPEED = 1;
    const rotate = () => {
      if ((view && view.interacting) || animationRotatedDegrees > 360) {
        setRotationActive(false);
        // eslint-disable-next-line no-undef
        localStorage.setItem(rotationKey, true);
      } else {
        const camera = view.camera.clone();
        camera.position.longitude -= ROTATION_SPEED;
        view.goTo(camera, { animate: false }).then(() => {
          setAnimationRotatedDegrees(animationRotatedDegrees + ROTATION_SPEED);
        });
      }
    };

    // eslint-disable-next-line no-undef
    requestAnimationFrame(rotate);
  }, [view, animationRotatedDegrees, setRotationActive]);

  return null;
}

const { REACT_APP_FEATURE_MOBILE_MAP } = process.env;

function SceneContainer(props) {
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
    initialRotation,
    centerOn,
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [rotationActive, setRotationActive] = useState(false);
  const [hasSetRotationActive, setHasSetRotationActive] = useState(false);
  const [animationRotatedDegrees, setAnimationRotatedDegrees] = useState(0);
  const [loadState, setLoadState] = useState('loading');
  const isMobile = useMobile();

  const rotationKey = useMemo(
    () => initialRotation && `${sceneName}HasRotated`,
    []
  );
  // eslint-disable-next-line no-undef
  const hasSceneRotated = useMemo(() => localStorage.getItem(rotationKey), []);

  useEffect(() => {
    loadModules(['esri/Map'], loaderOptions)
      .then(([Map]) => {
        const _map = new Map({
          basemap: SATELLITE_BASEMAP_LAYER,
        });

        setMap(_map);
        if (onMapLoad) {
          onMapLoad(_map);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const customPan = (mapView) => {
    const pointers = new Map(); // javascript map
    mapView.on('pointer-down', (event) => {
      if (event.pointerType === 'touch') {
        pointers.set(event.pointerId, { x: event.x, y: event.y });
      }
    });

    mapView.on(['pointer-up', 'pointer-leave'], (event) => {
      if (event.pointerType === 'touch') {
        pointers.delete(event.pointerId);
      }
    });

    mapView.on('pointer-move', (event) => {
      if (event.pointerType === 'touch') {
        if (pointers.size !== 1) {
          return;
        }
        const distanceLon = event.x - pointers.get(event.pointerId).x;
        const distanceLat = event.y - pointers.get(event.pointerId).y;
        const camera = mapView.camera.clone();
        const { zoom } = mapView;
        const zoomRatio = (z) => z ** 2 / (z > 5 ? 2 : 5);
        camera.position.longitude -= distanceLon / zoomRatio(zoom);
        camera.position.latitude += distanceLat / zoomRatio(zoom);
        mapView.goTo(camera, { animate: true });
      }
    });
  };

  useEffect(() => {
    if (map) {
      loadModules(['esri/views/SceneView'], loaderOptions)
        .then(([SceneView]) => {
          const _view = new SceneView({
            map,
            container: `scene-container-${sceneName || sceneId}`,
            navigation: {
              browserTouchPanEnabled: false,
            },
            ...sceneSettings,
            ...(isMobile && REACT_APP_FEATURE_MOBILE_MAP
              ? { viewingMode: 'local', qualityProfile: 'low' }
              : {}),
          });

          // disable browserTouchPan and create a custom pan as it was not working properly
          customPan(_view);

          setView(_view);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [map]);

  useEffect(() => {
    if (map && view) {
      setLoadState('loaded');
      if (onViewLoad) {
        onViewLoad(map, view);
      }
      setSceneMap(map);
      setSceneView(view);
    }
  }, [map, view]);

  // Update location in URL
  useEffect(() => {
    let watchHandle;
    if (view && view.center && !urlParamsUpdateDisabled && !rotationActive) {
      loadModules(['esri/core/watchUtils']).then(([watchUtils]) => {
        watchHandle = watchUtils.whenTrue(view, 'stationary', () => {
          const { longitude, latitude } = view.center;
          changeGlobe({ center: [longitude, latitude], zoom: view.zoom });
        });
      });
    }

    return function cleanUp() {
      if (watchHandle) {
        watchHandle.remove();
      }
    };
  }, [view, rotationActive]);

  // Start rotation when loaded
  useEffect(() => {
    if (
      initialRotation &&
      !hasSceneRotated &&
      !(isMobile && REACT_APP_FEATURE_MOBILE_MAP) &&
      // Don't rotate if we come from an AOI and we are centered to some coordinates
      !centerOn &&
      view &&
      view.camera &&
      !hasSetRotationActive
    ) {
      setRotationActive(true);
      setHasSetRotationActive(true);
    }
  }, [
    view,
    view && view.camera,
    initialRotation,
    hasSceneRotated,
    centerOn,
    hasSetRotationActive,
  ]);

  return (
    <>
      <Component
        loadState={loadState}
        map={map}
        view={view}
        handleSceneClick={() => setRotationActive(false)}
        {...props}
      />
      {initialRotation && rotationActive && (
        <InitialRotation
          rotationKey={rotationKey}
          setRotationActive={setRotationActive}
          view={view}
          animationRotatedDegrees={animationRotatedDegrees}
          setAnimationRotatedDegrees={setAnimationRotatedDegrees}
        />
      )}
    </>
  );
}

export default connect(mapStateToProps, actions)(SceneContainer);
