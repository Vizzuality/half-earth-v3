import React, { useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';
import ProvinceChartContainer from './province-chart';

function TemporalTrendsSpiComponent(props) {
  const { countryData, spiData } = props;

  const [activeTrend, setActiveTrend] = useState(NATIONAL_TREND);
  const [nationalChartData, setNationalChartData] = useState({
    area_values: [],
    spi_values: [],
  });

  const getNationalData = async () => {
    if (spiData.trendData.length) {
      const data = spiData.trendData;
      const { area_values, spi_values } = data[0].values;
      setNationalChartData({ area_values, spi_values });
    }
  };

  useEffect(() => {
    getNationalData();
  }, [spiData]);

  const handleActionChange = (event) => {
    setActiveTrend(event.currentTarget.innerText);
  };

  return (
    <div className={styles.trends}>
      <div className={styles.info}>
        <span className={styles.title}>Temporal Trends</span>
        <p className={styles.description}>
          Since 1980, the <b>{countryData?.NAME_0}</b> has added 328357 km2 of
          land into its protected area network, representing 14% of the total
          land in the country, increasing its Species Protection Index from
          27.21 in 1980 to 63 in 2023.
        </p>
        <div className={styles.options}>
          <div className={styles.btnGroup}>
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend === PROVINCE_TREND,
              })}
              label={NATIONAL_TREND}
              handleClick={handleActionChange}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend === NATIONAL_TREND,
              })}
              label={PROVINCE_TREND}
              handleClick={handleActionChange}
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
          {activeTrend !== NATIONAL_TREND && (
            <>
              <Button
                type="rectangular"
                className={cx(styles.saveButton, styles.notActive)}
                label="view full table"
              />
              <span className={styles.helpText}>
                Open and download a full table of annual national and province
                level SPI over time.
              </span>
            </>
          )}
        </div>
      </div>

      {activeTrend === NATIONAL_TREND && (
        <NationalChartContainer
          nationalChartData={nationalChartData}
          {...props}
        />
      )}
      {activeTrend === PROVINCE_TREND && <ProvinceChartContainer {...props} />}
    </div>
  );
}

export default TemporalTrendsSpiComponent;
