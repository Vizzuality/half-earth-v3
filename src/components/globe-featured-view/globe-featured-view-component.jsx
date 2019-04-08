import React from 'react';
import cx from 'classnames';
import { WebScene } from '@esri/react-arcgis';
import styles from './globe-featured-view-styles.module.scss'

const GlobeComponent = ({ sceneConfig, isSidebarOpen }) => {
  return (
    <WebScene
      className={cx(styles.sceneContainer, { [styles.expanded]: isSidebarOpen})}
      id="f430e65f20bc47ff846c9c9853fe855b"
      viewProperties={sceneConfig}
      onLoad={(map, view) => console.log(map,view)}
    />
  )
}

export default GlobeComponent;