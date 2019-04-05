import React from 'react';
import cx from 'classnames';
import { Scene } from '@esri/react-arcgis';
import styles from './globe-styles.module.scss'

const GlobeComponent = ({ isSidebarOpen }) => {
  return (
    <Scene
      className={cx(styles.scene, { [styles.expanded]: isSidebarOpen})}
      mapProperties={{ basemap: 'satellite' }}
      viewProperties={{
          center: [-0, 0],
          zoom: 3,
          ui: {
            components: ['zoom', 'navigation-toggle']
          }
      }}
      onLoad={(map, view) => {
        view.ui.move(['zoom', 'navigation-toggle'], "top-right")
      }}
    />
  )
}

export default GlobeComponent;