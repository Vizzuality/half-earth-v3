import React, { useState } from 'react';
import cx from 'classnames';
import { WebScene } from '@esri/react-arcgis';
import styles from 'styles/themes/scene-theme.module.scss';
const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const GlobeComponent = ({ sceneId, sceneSettings, onLoad, children }) => {
  const [ sceneMap, setMap ] = useState(null);
  const [ sceneView, setView ] = useState(null);
  const [ sceneLoaded, setLoaded ] = useState(false);

  const handleOnLoad = (map, view) => {
    setMap(map);
    setView(view);
    setLoaded(true);
    onLoad(map, view);
  }

  return (
    <WebScene
      className={cx(styles.sceneContainer)}
      id={sceneId}
      onLoad={onLoad}
      viewProperties={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    >
      {children}
    </WebScene>
  )
}

export default GlobeComponent;