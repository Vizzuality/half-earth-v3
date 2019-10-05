import React, { useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import Spinner from 'components/spinner';
import styles from 'styles/themes/scene-theme.module.scss';

const SceneComponent = ({ sceneId, children, loaderOptions, sceneSettings, onMapLoad = null, onViewLoad = null, style, spinner = true }) => {

  const [map, setMap] = useState(null);
  const [view, setView] = useState(null);
  const [loadState, setLoadState] = useState('loading');

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
            container: `scene-container-${sceneId}`,
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
      onViewLoad && onViewLoad(map, view)
    }
  }, [map, view]);


  if (loadState === 'loading') {
    return (
    <div style={{ height: '100%', position: 'relative', width: '100%' }}>
      <div id={`scene-container-${sceneId}`} className={styles.sceneContainer} style={{width:'0%', height:'0%'}} />
      <Spinner spinnerWithOverlay initialLoading display={spinner}/>
    </div>
    )
  } else if (loadState === 'loaded') {
    return (
      <div style={{ height: '100%', position: 'relative', width: '100%' }}>
        <div id={`scene-container-${sceneId}`} className={styles.sceneContainer} style={{width:'100%', height:'100%', backgroundColor: '#0A212E', ...style}}>
          {React.Children.map(children || null, (child, i) => {
            return child && <child.type key={i} map={map} view={view} {...child.props}/>;
          })}
        </div>
      </div>
    )
  }

}

export default SceneComponent;