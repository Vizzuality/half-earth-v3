import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';

const SceneComponent = ({ sceneId, children, loaderOptions, sceneSettings }) => {

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);

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
          container: "scene-container",
          ...sceneSettings
        });
        setView(_view)
      })
      .catch(err => {
        console.error(err);
      });
  }, [])


  return (
    <div id='scene-container' style={{width:'100vw', height:'100vh'}}>
      {view && map && React.Children.map(children || null, (child, i) => {
          return child && <child.type key={i} map={map} view={view} {...child.props}/>;
        })}
    </div>
  )
}

export default SceneComponent;