import React from 'react';

import { useT } from '@transifex/react';

import styles from './map-legend-component-styles.module.scss';

function MapLegendComponent(props) {
  const { mapLegendLayers } = props;
  const t = useT();

  const getLayerIcon = (layer) => {
    // Add logic to determine the icon based on the layer properties
    if (layer.type === 'raster') {
      return '🗺️'; // Example icon for raster layers
    }
    if (layer.type === 'vector') {
      return '📊'; // Example icon for vector layers
    }
    return '❓'; // Default icon for unknown layer types
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>{t('Map Legend')}</span>
      <ul className={styles.layers}>
        {Object.values(mapLegendLayers).map((layer) => (
          <li key={layer.id}>
            {/* <button type="button">Up</button>
            <button type="button">Down</button> */}
            <div className={styles.info}>
              <b>{layer.label?.toLowerCase()}</b>
              <span>{layer.parent}</span>
              <span>{getLayerIcon(layer)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapLegendComponent;
