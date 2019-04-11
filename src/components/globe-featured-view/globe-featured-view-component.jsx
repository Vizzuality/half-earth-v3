import React, { Fragment } from 'react';
import cx from 'classnames';
import { WebScene } from '@esri/react-arcgis';
import styles from 'styles/themes/scene-theme.module.scss'
import ArcgisLayerManager from 'components/shared/arcgis-layer-manager';
import Sidebar from 'components/shared/sidebar';

const GlobeComponent = ({ sceneConfig, isSidebarOpen }) => {
  return (
    <Fragment>
      <WebScene
        className={cx(styles.sceneContainer, { [styles.expanded]: isSidebarOpen})}
        id="f430e65f20bc47ff846c9c9853fe855b"
        viewProperties={sceneConfig}
      >
        <ArcgisLayerManager />
      </WebScene>
      <Sidebar>
        <label>
          <span>layer</span>
          <input type="checkbox"/>
        </label>
      </Sidebar>
    </Fragment>
  )
}

export default GlobeComponent;