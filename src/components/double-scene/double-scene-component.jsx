import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { loadModules } from 'esri-loader';
import Spinner from 'components/spinner';
import styles from 'styles/themes/scene-theme.module.scss';

const localExtent = { // sample extent
  xmax: -10834217,
  xmin: -10932882,
  ymax: 2493918,
  ymin: 2432667,
  spatialReference: {
    wkid: 3857
  }
};

const DoubleSceneComponent = ({ sceneId, children, loaderOptions, sceneSettings, onMapLoad = null, onViewLoad = null, style, spinner = true, interactionsDisabled = false, sceneMode }) => {

  const [map, setMap] = useState(null);
  const [viewGlobal, setViewGlobal] = useState(null);
  const [viewLocal, setViewLocal] = useState(null);
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
          const _viewGlobal = new SceneView({
            map: map,
            container: `scene-global-container-${sceneId}`,
            ...sceneSettings
          });
          setViewGlobal(_viewGlobal);

          const _viewLocal = new SceneView({
            map: map,
            container: `scene-local-container-${sceneId}`,
            ...sceneSettings,
            viewingMode: 'local',
            clippingArea: localExtent,
            extent: localExtent,
          });
          setViewLocal(_viewLocal);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },[map])

  useEffect(() => {
    if (map && viewGlobal && viewLocal) {
      setLoadState('loaded');
      onViewLoad && onViewLoad(map, viewGlobal)
    }
  }, [map, viewGlobal, viewLocal]);

  return (
    <>
      {loadState === 'loading' && <Spinner spinnerWithOverlay initialLoading display={spinner}/>}
      <div style={{ height: '100%', position: 'relative', width: '100%', pointerEvents: interactionsDisabled ? 'none' : 'unset', display: sceneMode === 'global' ? 'initial' : 'none'}}>
        <div id={`scene-global-container-${sceneId}`} className={styles.sceneContainer} style={{width: '100%', height:'100%', ...style}}>
          {loadState === 'loaded' && 
            ReactDOM.createPortal(
              React.Children.map(children || null, (child, i) => {
                return child && <child.type key={i} map={map} view={viewGlobal} {...child.props}/>;
              })
              ,
              document.getElementById("root")
            )
          }
        </div>
      </div>
      <div style={{ height: '100%',  position: 'relative', width: '100%', pointerEvents: interactionsDisabled ? 'none' : 'unset', display: sceneMode === 'local' ? 'initial' : 'none'}}>
        <div id={`scene-local-container-${sceneId}`} style={{width:'100%', height:'100%', ...style}}></div>
      </div>
    </>
  );
}

export default DoubleSceneComponent;