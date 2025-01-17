import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import { LAYER_OPTIONS } from 'constants/dashboard-constants.js';

import styles from './map-legend-component-styles.module.scss';

function MapLegendComponent(props) {
  const { mapLegendLayers } = props;
  const t = useT();

  const getLayerIcon = (layer) => {
    if (layer.parentId === LAYER_OPTIONS.EXPERT_RANGE_MAPS) {
      return (
        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
          <div
            className={styles.box}
            style={{
              backgroundColor: 'rgb(23, 40, 135)',
            }}
          />
        </div>
      );
    }
    if (layer.imageUrl) {
      // Use layer image, (Point observations)
      return <img src={layer.imageUrl} width={20} height={20} alt="Point" />;
    }

    // Use layer outline styles (Administrative Layers)
    if (layer.outline) {
      const { color } = layer.outline;
      const outline = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      return (
        <div className={styles.wrapper}>
          <div
            className={styles.box}
            style={{
              borderColor: outline,
            }}
          />
        </div>
      );
    }

    // Use layer styling classes (Protected Areas)
    if (layer.classes) {
      return (
        <div className={cx(styles.wrapper, styles.column)}>
          {layer.classes.map((item) => {
            const { color } = item.symbol;
            const backgroundColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
            return (
              <div style={{ display: 'flex', gap: '5px' }}>
                <div className={styles.box} style={{ backgroundColor }} />
                {t(item.label)}
              </div>
            );
          })}
        </div>
      );
    }
    return '❓'; // Default icon for unknown layer types
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>{t('Map Legend')}</span>
      <ul className={styles.layers}>
        {Object.values(mapLegendLayers).map((layer) => (
          <li key={`${layer.id}-${layer.label}`}>
            {/* <button type="button">Up</button>
            <button type="button">Down</button> */}
            <div className={styles.info}>
              <b>{layer.label?.toLowerCase()}</b>
              <span>{layer.parent}</span>
              {getLayerIcon(layer)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapLegendComponent;
