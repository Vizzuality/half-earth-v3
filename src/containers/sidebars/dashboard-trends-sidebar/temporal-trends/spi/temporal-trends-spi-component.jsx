import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';
import ProvinceChartContainer from './province-chart';
import last from 'lodash/last';
import { LightModeContext } from '../../../../../context/light-mode';

function TemporalTrendsSpiComponent(props) {
  const { countryData, spiData } = props;

  const areaProtected = (328357).toLocaleString();

  const [activeTrend, setActiveTrend] = useState(NATIONAL_TREND);
  const [spiInfo, setSpiInfo] = useState();
  const [nationalChartData, setNationalChartData] = useState({
    area_values: [],
    spi_values: [],
  });
  const [areaProtectedPercent, setAreaProtectedPercent] = useState(0);
  const { lightMode } = useContext(LightModeContext);

  const getNationalData = async () => {
    if (spiData.trendData.length) {
      const data = spiData.trendData;
      const { area_values, spi_values } = data[0].values;
      setNationalChartData({ area_values, spi_values });

      setSpiInfo(`${spi_values?.[0][1]} in ${spi_values?.[0][0]} to ${last(spi_values)[1]} in ${last(spi_values)[0]}`);
      setAreaProtectedPercent(area_values[area_values.length - 1][1]);
    }
  };

  useEffect(() => {
    getNationalData();

  }, [spiData]);

  const handleActionChange = (event) => {
    setActiveTrend(event.currentTarget.innerText);
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>Temporal Trends</span>
        <p className={styles.description}>
          Since 1980, the {countryData?.NAME_0} has added <b>{areaProtected} km<sup>2</sup></b> of
          land into its protected area network, representing <b>{areaProtectedPercent}%</b> of the total
          land in the country, increasing its Species Protection Index from <b>{spiInfo}</b>.
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
