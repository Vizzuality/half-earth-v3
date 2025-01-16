import React, { useEffect } from 'react';

import { useT } from '@transifex/react';

import styles from './map-legend-component-styles.module.scss';

function MapLegendComponent(props) {
  const { mapLegendLayers } = props;
  const t = useT();

  useEffect(() => {
    console.log(mapLegendLayers);
  }, [mapLegendLayers]);

  return (
    <div className={styles.container}>
      <span className={styles.title}>{t('Map Legend')}</span>
      <ul className={styles.layers}>
        {Object.values(mapLegendLayers).map((layer) => (
          <li>
            {/* <button type="button">Up</button>
            <button type="button">Down</button> */}
            <div className={styles.info}>
              <b>{layer.label?.toLowerCase()}</b>
              <span>{layer.parent}</span>
              <span>Image</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapLegendComponent;
