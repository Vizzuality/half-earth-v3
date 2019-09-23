import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import Spinner from 'components/spinner';

const SceneComponent = ({ sceneId, children, loaderOptions, sceneSettings, onLoad = null, loadElement }) => {

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [loadState, setLoadState] = useState('loading');

  useEffect(() => {
    loadModules(["esri/WebScene", "esri/views/SceneView"], loaderOptions)
      .then(([WebScene, SceneView]) => {
        const _map = new WebScene({
          portalItem: {
            id: sceneId
          }
        });
        setMap(_map)
        const _view = new SceneView({
          map: _map,
          container: `scene-container-${sceneId}`,
          ...sceneSettings
        });
        setView(_view)
      })
      .catch(err => {
        console.error(err);
      });
  }, [])

  useEffect(() => {
    if (map && view) {
      setLoadState('loaded');
    }
  }, [map, view])

  useEffect(() => {
    if (loadState === 'loaded') {
      onLoad && onLoad(map, view);
    }
  }, [loadState])

  if (loadState === 'loading') {
    return (
    <>
      <div id={`scene-container-${sceneId}`} style={{width:'0%', height:'0%'}} />
      <Spinner spinnerWithOverlay floating/>
    </>
    )
  } else if (loadState === 'loaded') {
    return (
      <div id={`scene-container-${sceneId}`} style={{width:'100%', height:'100%', backgroundColor: '#0A212E'}}>
        {React.Children.map(children || null, (child, i) => {
          return child && <child.type key={i} map={map} view={view} {...child.props}/>;
        })}
    </div>
    )
  }

}

export default SceneComponent;