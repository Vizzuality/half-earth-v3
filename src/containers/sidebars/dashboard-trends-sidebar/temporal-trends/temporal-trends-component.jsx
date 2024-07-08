import React from 'react';

import cx from 'classnames';

import Button from 'components/button';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../dashboard-trends-sidebar-component';
import styles from '../dashboard-trends-sidebar-styles.module.scss';

import TemporalTrendsNationalChartContainer from './temporal-trends-national-chart';
import TemporalTrendsProvinceChartContainer from './temporal-trends-province-chart';

function TemporalTrendsComponent(props) {
  const { activeTrend, updateActiveTrend } = props;

  const handleActionChange = (event) => {
    updateActiveTrend(event.currentTarget.innerText);
  };

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
          <div className={styles.trendTypes}>
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
        <TemporalTrendsNationalChartContainer {...props} />
      )}
      {activeTrend === PROVINCE_TREND && (
        <TemporalTrendsProvinceChartContainer {...props} />
      )}
    </div>
  );
}

export default TemporalTrendsComponent;
