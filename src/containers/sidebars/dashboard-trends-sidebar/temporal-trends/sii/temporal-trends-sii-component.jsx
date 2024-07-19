import React, { useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';

import { NATIONAL_TREND } from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';

function TemporalTrendsSiiComponent(props) {
  const { siiData } = props;
  const [nationalChartData, setNationalChartData] = useState({
    area_values: [],
    spi_values: [],
  });

  const taxa = 'all_terr_verts';

  const getNationalData = async () => {
    if (siiData.trendData.length) {
      const data = siiData.trendData;
      const { groups } = data[0];
      const allVertValues = groups.filter(group => group.taxa === taxa);

      setNationalChartData(allVertValues[0]);
    }
  };

  useEffect(() => {
    getNationalData();
  }, [siiData]);

  return (
    <div className={styles.trends}>
      <div className={styles.info}>
        <span className={styles.title}>Temporal Trends</span>
        <p className={styles.description}>
          Species data coverage remains low in Democratic Republic of Congo. In
          2023, 0.44% of the expected ranges of terrestrial vertebrate species
          here had a recorded observation of that species. Since 1950, the
          annual SII has fluctuated between 1.6 and 0.0.
        </p>
        <div className={styles.options}>
          <div className={styles.trendTypes}>
            <Button
              type="rectangular"
              className={styles.saveButton}
              label={NATIONAL_TREND}
            />
          </div>
          <span className={styles.helpText}>
            Toggle national SPI and province-level breakdown.
          </span>
          <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label="play animation"
          />
          <span className={styles.helpText}>
            View how the percent of area protected, SPI, and score distributions
            have changed over time.
          </span>
        </div>
      </div>
      <NationalChartContainer
        nationalChartData={nationalChartData}
        {...props}
      />
    </div>
  );
}

export default TemporalTrendsSiiComponent;
