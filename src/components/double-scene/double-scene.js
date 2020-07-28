import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import Component from './double-scene-component';

const LOCAL_SCENE_VIEW_SETTINGS = {
  viewingMode: 'local',
  constraints: {
    tilt: {
      max: 60
    }
  },
  padding: {
    left: 300,
    bottom: 60
  },
  environment: {
    background: {
      type: "color",
      color: [0, 0, 0, 0]
    },
    starsEnabled: false,
    atmosphereEnabled: false
  },

}

const DoubleScene = props => {
  const {
    sceneId,
    loaderOptions,
    sceneSettings,
    onMapLoad = null,
    onViewLoad = null,
    countryExtent,
    isCountryMode
  } = props;

  const [globalMap, setGlobalMap] = useState(null);
  const [localMap, setLocalMap] = useState(null);
  const [viewGlobal, setViewGlobal] = useState(null);
  const [viewLocal, setViewLocal] = useState(null);
  const [loadState, setLoadState] = useState('loading');
  const [spatialReference, setSpatialReference] = useState(null);

  useEffect(() => {
    loadModules(["esri/WebScene", "esri/geometry/SpatialReference"], loaderOptions)
      .then(([WebScene, SpatialReference]) => {
        const _spatialReference = new SpatialReference();
        _spatialReference.wkid = 102100;
        setSpatialReference(_spatialReference);

        const _globalMap = new WebScene({
          portalItem: {
            id: sceneId
          }
        });
        _globalMap.load().then(map => { 
          setGlobalMap(map);
          onMapLoad && onMapLoad(map);
        });

        const _localMap = new WebScene({
          portalItem: {
            id: sceneId
          }
        });

        _localMap.load().then(map => { 
          setLocalMap(map);
          map.ground.surfaceColor = '#000';
        });

      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (globalMap) {
      loadModules(["esri/views/SceneView"], loaderOptions)
        .then(([SceneView]) => {
          const _viewGlobal = new SceneView({
            map: globalMap,
            container: `scene-global-container-${sceneId}`,
            ...sceneSettings,
            spatialReference,
          });
          setViewGlobal(_viewGlobal);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },[globalMap]);

  useEffect(() => {
    if (localMap) {
      loadModules(["esri/views/SceneView"], loaderOptions)
        .then(([SceneView]) => {
          const _viewLocal = new SceneView({
            map: localMap,
            container: `scene-local-container-${sceneId}`,
            ...sceneSettings,
            spatialReference,
            ...LOCAL_SCENE_VIEW_SETTINGS
          });
          setViewLocal(_viewLocal);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },[localMap]);
  
  useEffect(() => {
    if (globalMap && localMap && viewGlobal && viewLocal) {
      setLoadState('loaded');
      onViewLoad && onViewLoad(globalMap, viewGlobal)
    }
  }, [globalMap, viewGlobal, viewLocal, localMap]);


  useEffect(() => {
    if(viewLocal && spatialReference && countryExtent && isCountryMode) {
      const expandedCountryExtent = countryExtent.clone().expand(1.01);
      viewLocal.clippingArea = expandedCountryExtent;
      viewLocal.extent = expandedCountryExtent;
      viewLocal.when(() => {
        viewLocal.goTo({ target: expandedCountryExtent, tilt: 40 }, { animate: false });
      });
    };
  },[isCountryMode, countryExtent]);

  return (
    <Component
      {...props}
      globalMap={globalMap}
      localMap={localMap}
      viewGlobal={viewGlobal}
      viewLocal={viewLocal}
      loadState={loadState}
      spatialReference={spatialReference}
    />
  );
}

export default DoubleScene;