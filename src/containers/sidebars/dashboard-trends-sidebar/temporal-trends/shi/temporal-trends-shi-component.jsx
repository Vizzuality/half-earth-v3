import React, { useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';

function TemporalTrendsShiComponent(props) {
  const { updateActiveTrend, shiTrendData, shiNationalData } = props;

  const [nationalChartData, setNationalChartData] = useState({
    area_values: [],
    spi_values: [],
  });

  // const [chartData, setChartData] = useState();
  const [lostAvg, setLostAvg] = useState(0)

  const getNationalData = async () => {
    if (shiNationalData) {
      const { area_values, spi_values } = shiNationalData[0].values;
      setNationalChartData({ area_values, spi_values });

      setLostAvg(100 - spi_values[spi_values.length - 1][1]);
    }
  };

  useEffect(() => {
    getNationalData();
  }, [shiNationalData]);

  const handleActionChange = (event) => {
    updateActiveTrend(event.currentTarget.innerText);
  };

  return (
    <div className={styles.trends}>
      <div className={styles.info}>
        <span className={styles.title}>Temporal Trends</span>
        <p className={styles.description}>
          Since 2001, the terrestrial vertebrate species of the Democratic
          Republic of the Congo have lost an average of <b>{lostAvg}</b>% of their suitable
          habitat, leading to the country having a Species Habitat Index of
          98.63.
        </p>
        <p className={styles.description}>
          The Area Score addresses changes in habitat extent while the
          Connectivity Score addresses changes in the fragmentation of habitat.
        </p>
        <div className={styles.options}>
          <Button
            type="rectangular"
            className={styles.saveButton}
            label={NATIONAL_TREND}
            handleClick={handleActionChange}
          />

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
        chartData={shiTrendData}
        {...props}
      />
    </div>
  );
}

export default TemporalTrendsShiComponent;
