import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { loadModules } from 'esri-loader';
import Spinner from 'components/spinner';
import styles from 'styles/themes/scene-theme.module.scss';

const SceneComponent = ({ 
  style,
  sceneId,
  children,
  sceneName,
  className,
  loaderOptions,
  sceneSettings,
  spinner = true,
  onMapLoad = null,
  onViewLoad = null,
  interactionsDisabled = false,
}) => {

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

  if (loadState === 'loading') {
    return (
    <>
      <div id={`scene-container-${sceneName || sceneId}`} className={styles.sceneContainer} style={{width:'0%', height:'0%'}} />
      <Spinner spinnerWithOverlay initialLoading display={spinner}/>
    </>
    )
  } else if (loadState === 'loaded') {
    return (
      <div className={cx(styles.sceneWrapper, className)} style={{ pointerEvents: interactionsDisabled ? 'none' : 'unset' }}>
        <div id={`scene-container-${sceneName || sceneId}`}>
          {React.Children.map(children || null, (child, i) => {
            return child && <child.type key={i} map={map} view={view} {...child.props}/>;
          })}
        </div>
      </div>
    )
  }

}

export default SceneComponent;