import React from 'react';

import COLORS from 'styles/settings.scss';

import styles from './styles.module';

function LandcoverLegend() {
  const LEGEND_ITEMS = [
    { label: 'Water', color: COLORS.water },
    { label: 'Trees', color: COLORS.trees },
    { label: 'Flooded Vegetation', color: COLORS['flooded-vegetation'] },
    { label: 'Crops', color: COLORS.crops },
    { label: 'Built area', color: COLORS['built-area'] },
    { label: 'Bare ground', color: COLORS['bare-ground'] },
    { label: 'Snow/Ice', color: COLORS['snow-ice'] },
    { label: 'Clouds', color: COLORS.clouds },
    { label: 'Rangeland', color: COLORS.rangeland },
  ];

  return (
    <div className={styles.legendContainer}>
      <p className={styles.legendTitle}>Land cover types</p>
      <div className={styles.legendItems}>
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: item.color }}
            />
            <p className={styles.legendItemLabel}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandcoverLegend;
