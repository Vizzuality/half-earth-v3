import React from 'react';
import cx from 'classnames';
import { WebScene } from '@esri/react-arcgis';
import styles from './globe-data-view-styles.module.scss'

const GlobeComponent = ({ sceneConfig, isSidebarOpen }) => {
  console.log(WebScene)
  return (
    <WebScene
      className={cx(styles.sceneContainer, { [styles.expanded]: isSidebarOpen})}
      id="cb5148d43124477f88d5e36e5fd566ea"
      viewProperties={sceneConfig}
    />
  )
}

export default GlobeComponent;