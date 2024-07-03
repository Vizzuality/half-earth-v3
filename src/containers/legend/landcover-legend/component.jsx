import { getCSSVariable } from 'utils/css-utils';

import styles from './styles.module';

function LandcoverLegend() {
  const LEGEND_ITEMS = [
    { label: 'Water', color: getCSSVariable('water') },
    { label: 'Trees', color: getCSSVariable('trees') },
    {
      label: 'Flooded Vegetation',
      color: getCSSVariable('flooded-vegetation'),
    },
    { label: 'Crops', color: getCSSVariable('crops') },
    { label: 'Built area', color: getCSSVariable('built-area') },
    { label: 'Bare ground', color: getCSSVariable('bare-ground') },
    { label: 'Snow/Ice', color: getCSSVariable('snow-ice') },
    { label: 'Clouds', color: getCSSVariable('clouds') },
    { label: 'Rangeland', color: getCSSVariable('rangeland') },
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
