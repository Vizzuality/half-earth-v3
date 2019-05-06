import React from 'react';
import cx from 'classnames';
import { WebScene } from '@esri/react-arcgis';
import styles from 'styles/themes/scene-theme.module.scss';

const GlobeComponent = ({ sceneId, sceneSettings, children }) => {
  return (
    <WebScene
      className={cx(styles.sceneContainer)}
      id={sceneId}
      viewProperties={sceneSettings}
    >
      {children}
    </WebScene>
  )
}

export default GlobeComponent;