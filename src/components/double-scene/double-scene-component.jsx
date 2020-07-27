import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from 'components/spinner';
import { LOCAL_SCENE, GLOBAL_SCENE } from 'constants/view-props';
import styles from 'styles/themes/scene-theme.module.scss';

const DoubleSceneComponent = props => {
  const {
    localMap,
    globalMap,
    viewGlobal,
    viewLocal,
    spatialReference,
    spinner,
    loadState,
    sceneId,
    children,
    interactionsDisabled,
    style,
    sceneMode
  } = props;
  
  return (
    <>
      {loadState === 'loading' && <Spinner spinnerWithOverlay initialLoading display={spinner}/>}
      <div style={{ height: '100%', position: 'relative', width: '100%', pointerEvents: interactionsDisabled ? 'none' : 'unset', display: sceneMode === GLOBAL_SCENE ? 'initial' : 'none'}}>
        <div id={`scene-global-container-${sceneId}`} className={styles.sceneContainer} style={{width: '100%', height:'100%', ...style}}>
          {loadState === 'loaded' && 
            ReactDOM.createPortal(
              React.Children.map(children || null, (child, i) => {
                return child && <child.type key={i} map={globalMap} maps={[localMap, globalMap]} view={viewGlobal} viewLocal={viewLocal} spatialReference={spatialReference} {...child.props}/>;
              })
              ,
              document.getElementById("root")
            )
          }
        </div>
      </div>
      <div style={{ height: '100%',  position: 'relative', width: '100%', pointerEvents: interactionsDisabled ? 'none' : 'unset', display: sceneMode === LOCAL_SCENE ? 'initial' : 'none'}}>
        <div id={`scene-local-container-${sceneId}`} style={{width:'100%', height:'100%', ...style}}></div>
      </div>
    </>
  );
}

export default DoubleSceneComponent;