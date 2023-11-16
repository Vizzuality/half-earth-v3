import React from 'react';

import styles from './styles.module';

function LandcoverLegend() {
  const LEGEND_ITEMS = [
    { label: 'Water', color: '#3972B8' },
    { label: 'Trees', color: '#175408' },
    { label: 'Flooded Vegetation', color: '#4FAB6C' },
    { label: 'Crops', color: '#B89B35' },
    { label: 'Built area', color: '#FF0066' },
    { label: 'Bare ground', color: '#5B5A48' },
    { label: 'Snow/Ice', color: '#F2FAFF' },
    { label: 'Clouds', color: '#FAFAFA' },
    { label: 'Reangeland', color: '#EBE0D3' },
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
