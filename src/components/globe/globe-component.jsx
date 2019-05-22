import React from 'react';
import cx from 'classnames';
import { WebScene } from '@esri/react-arcgis';
import styles from 'styles/themes/scene-theme.module.scss';
const { REACT_APP_ARGISJS_API_VERSION:API_VERSION } = process.env

const GlobeComponent = ({ sceneId, sceneSettings, onLoad, children }) => {
  return (
    <WebScene
      className={cx(styles.sceneContainer)}
      id={sceneId}
      viewProperties={sceneSettings}
      loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      onLoad={onLoad}
    >
      {children}
    </WebScene>
  )
}

export default GlobeComponent;