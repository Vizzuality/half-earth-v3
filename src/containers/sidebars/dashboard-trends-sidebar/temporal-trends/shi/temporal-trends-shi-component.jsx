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
  const { activeTrend, updateActiveTrend, countryData, selectedIndex } = props;

  const [nationalChartData, setNationalChartData] = useState({
    area_values: [],
    spi_values: [],
  });

  const getNationalData = async () => {
    const region_id = '90b03e87-3880-4164-a310-339994e3f919';
    const taxa = 'all_terr_verts';
    const url = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/nrc?region_id=${region_id}&taxa=${taxa}`;

    const response = await fetch(url);
    const data = await response.json();
    const { area_values, spi_values } = data[0].values;
    setNationalChartData({ area_values, spi_values });
  };

  useEffect(() => {
    getNationalData();
  }, []);

  const handleActionChange = (event) => {
    updateActiveTrend(event.currentTarget.innerText);
  };

  return (
    <div className={styles.trends}>
      <div className={styles.info}>
        <span className={styles.title}>Temporal Trends</span>
        <p className={styles.description}>
          Since 2001, the terrestrial vertebrate species of the Democratic
          Republic of the Congo have lost an average of 1.37% of their suitable
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
        {...props}
      />
    </div>
  );
}

export default TemporalTrendsShiComponent;
