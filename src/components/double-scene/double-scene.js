import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import Component from './double-scene-component';

const DoubleScene = props => {
  const {
    sceneId,
    loaderOptions,
    sceneSettings,
    onMapLoad = null,
    onViewLoad = null,
    countryExtent
  } = props;

  const [map, setMap] = useState(null);
  const [viewGlobal, setViewGlobal] = useState(null);
  const [viewLocal, setViewLocal] = useState(null);
  const [loadState, setLoadState] = useState('loading');
  const [spatialReference, setSpatialReference] = useState(null);

  useEffect(() => {
    loadModules(["esri/WebScene"], loaderOptions)
      .then(([WebScene]) => {
        const _map = new WebScene({
          portalItem: {
            id: sceneId
          }
        });
        _map.load().then(map => { 
          setMap(map);
          onMapLoad && onMapLoad(map);
        })
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (map) {
      loadModules(["esri/views/SceneView", "esri/geometry/SpatialReference"], loaderOptions)
        .then(([SceneView, SpatialReference]) => {

          const _spatialReference = new SpatialReference();
          _spatialReference.wkid = 102100;
          setSpatialReference(_spatialReference);

          const _viewGlobal = new SceneView({
            map: map,
            container: `scene-global-container-${sceneId}`,
            ...sceneSettings,
            spatialReference,
          });
          setViewGlobal(_viewGlobal);

          const _viewLocal = new SceneView({
            map: map,
            container: `scene-local-container-${sceneId}`,
            ...sceneSettings,
            viewingMode: 'local',
            spatialReference,
            constraints: {
              tilt: {
                max: 60
              }
            },
            padding: {
              left: 300,
              bottom: 60
            }
          });
          
          setViewLocal(_viewLocal);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },[map]);

  useEffect(() => {
    if(viewLocal && spatialReference && countryExtent) {
      const expandedCountryExtent = countryExtent.clone().expand(1.2); //add paddings around country borders
      viewLocal.clippingArea = expandedCountryExtent;
      viewLocal.extent = expandedCountryExtent;
      viewLocal.when(() => {
        viewLocal.goTo({ target: expandedCountryExtent, tilt: 40 }, { animate: false });
      });
    };
  },[countryExtent]);
  
  useEffect(() => {
    if (map && viewGlobal && viewLocal) {
      setLoadState('loaded');
      onViewLoad && onViewLoad(map, viewGlobal)
    }
  }, [map, viewGlobal, viewLocal]);

  return (
    <Component
      {...props}
      map={map}
      viewGlobal={viewGlobal}
      viewLocal={viewLocal}
      loadState={loadState}
      spatialReference={spatialReference}
    />
  );
}

export default DoubleScene;