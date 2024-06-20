import React from 'react';

import Button from 'components/button';

import styles from '../dashboard-trends-sidebar-styles.module.scss';

import TemporalTrendsChartContainer from './temporal-trends-chart';

function TemporalTrendsComponent(props) {
  return (
    <div className={styles.trends}>
      <div className={styles.info}>
        <span className={styles.title}>Temporal Trends</span>
        <p className={styles.description}>
          Since 1980, the Democratic Republic of the Congo has added 328357 km2
          of land into its protected area network, representing 14% of the total
          land in the country, increasing its Species Protection Index from
          27.21 in 1980 to 63 in 2023.
        </p>
        <div className={styles.options}>
          <Button
            type="rectangular"
            className={styles.saveButton}
            label="play animation"
          />
          <span className={styles.helpText}>
            View how the percent of area protected, SPI, and score distributions
            have changed over time.
          </span>
          <Button
            type="rectangular"
            className={styles.saveButton}
            label="view full table"
          />
          <span className={styles.helpText}>
            Open and download a full table of annual national and province level
            SPI over time.
          </span>
        </div>
      </div>

      <TemporalTrendsChartContainer {...props} />
    </div>
  );
}

export default TemporalTrendsComponent;
