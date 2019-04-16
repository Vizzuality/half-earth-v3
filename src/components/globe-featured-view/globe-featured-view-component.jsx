import React from 'react';
import cx from 'classnames';
import { WebScene } from '@esri/react-arcgis';
import styles from 'styles/themes/scene-theme.module.scss'
import ArcgisLayerManager from 'components/shared/arcgis-layer-manager';
import { layerManagerToggle } from 'utils/layer-manager-utils';
import Sidebar from 'components/shared/sidebar';

import LocationWidget from 'components/shared/widgets/location-widget';
import NavigationToggleWidget from 'components/shared/widgets/navigation-toggle-widget';
import ZoomWidget from 'components/shared/widgets/zoom-widget';
import Legend from 'components/shared/legend';

const GlobeComponent = ({ sceneConfig, isSidebarOpen, sceneLayers, updateFeaturedGlobeQueryParam, activeLayers, query }) => {
  const toggleLayer = e => layerManagerToggle(e, "data-layer-id", activeLayers, query, updateFeaturedGlobeQueryParam);
  return (
    <>
      <WebScene
        className={cx(styles.sceneContainer, { [styles.expanded]: isSidebarOpen})}
        id={sceneConfig.id}
        viewProperties={sceneConfig}
      >
        <ArcgisLayerManager activeLayers={activeLayers}/>
        <LocationWidget />
        <ZoomWidget />
        <NavigationToggleWidget />
      </WebScene>
      <Sidebar>
        {
          sceneLayers &&
          sceneLayers.map(l => (
              <button key={l.id} data-layer-id={l.id} onClick={toggleLayer}>{l.title}</button>
          ))
        }
      </Sidebar>
      <Legend />
    </>
  )
}

export default GlobeComponent;