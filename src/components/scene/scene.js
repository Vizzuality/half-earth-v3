import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Component from './scene-component';
import { loadModules } from 'esri-loader';
import * as urlActions from 'actions/url-actions';
const actions = { ...urlActions };

const SceneContainer = (props) => {
  const {
    sceneId,
    sceneName,
    loaderOptions,
    sceneSettings,
    changeGlobe,
    onMapLoad,
    onViewLoad,
  } = props;

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [loadState, setLoadState] = useState('loading');
  // const watchUtils = useWatchUtils();
  const handleLocationChange = (center) => changeGlobe({ center });

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
    }
  }, [map, view]);

  // Update location in URL
  useEffect(() => {
    let watchHandle;
    if (view && view.center) {
      loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
        watchUtils.whenTrue(view, "stationary", function() {
          const { longitude, latitude } = view.center;
          handleLocationChange([longitude, latitude]);
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