import React, { useContext, useEffect, useState } from 'react';

import { T, useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
  ZONE_3,
  ZONE_5,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';
import ProvinceChartContainer from './province-chart';
import ZoneChartContainer from './zone-chart';

function TemporalTrendsShiComponent(props) {
  const t = useT();
  const {
    shiValue,
    countryName,
    countryISO,
    shiActiveTrend,
    setShiActiveTrend,
  } = props;

  // const [chartData, setChartData] = useState();
  const [lostAvg, setLostAvg] = useState(0);
  const { lightMode } = useContext(LightModeContext);
  const [startYear] = useState(2001);

  const handleActionChange = (event) => {
    setShiActiveTrend(event.currentTarget.innerText);
  };

  useEffect(() => {
    if (countryISO === 'COD') {
      setShiActiveTrend(NATIONAL_TREND);
    }
  }, []);

  useEffect(() => {
    setLostAvg((100 - shiValue).toFixed(1));
  }, [shiValue]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        {countryISO.toLowerCase() !== 'eewwf' && (
          <p className={styles.description}>
            <T
              _str="Since {startYear}, the terrestrial vertebrate species of the {countryNameBold} have lost an average of {lostAvgBold} of their suitable habitat, leading to the country having a Species Habitat Index of {shiValueBold}."
              startYear={startYear}
              countryNameBold={<b>{t(countryName)}</b>}
              lostAvgBold={<b>{lostAvg}%</b>}
              shiValueBold={<b>{shiValue}</b>}
            />
          </p>
        )}
        <p className={styles.description}>
          {t(
            'The Area component addresses changes in habitat extent while the Connectivity component addresses changes in the fragmentation of habitat.'
          )}
        </p>
        {countryISO.toLowerCase() !== 'eewwf' && (
          <div className={styles.options}>
            <div className={styles.btnGroup}>
              <Button
                type="rectangular"
                className={cx(styles.saveButton, {
                  [styles.notActive]: shiActiveTrend !== NATIONAL_TREND,
                })}
                label={NATIONAL_TREND}
                handleClick={handleActionChange}
              />
              {countryISO === 'COD' && (
                <Button
                  type="rectangular"
                  className={cx(styles.saveButton, {
                    [styles.notActive]: shiActiveTrend !== PROVINCE_TREND,
                  })}
                  label={PROVINCE_TREND}
                  handleClick={handleActionChange}
                />
              )}
            </div>
            <span className={styles.helpText}>
              {t('Toggle national SHI and province-level breakdown.')}
            </span>
            {/* <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label="play animation"
          />
          <span className={styles.helpText}>
            {t('View how the percent of area protected, SPI, and score distributions have changed over time.')}
          </span> */}
          </div>
        )}
        {countryISO.toLowerCase() === 'guy' && (
          <div className={styles.btnGroup}>
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== ZONE_3,
              })}
              label="ZONE_3"
              handleClick={handleActionChange}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== ZONE_5,
              })}
              label="ZONE_5"
              handleClick={handleActionChange}
            />
          </div>
        )}
      </div>
      {shiActiveTrend === NATIONAL_TREND && (
        <NationalChartContainer {...props} />
      )}
      {shiActiveTrend === PROVINCE_TREND && (
        <ProvinceChartContainer {...props} />
      )}
      {shiActiveTrend === ZONE_3 && (
        <ZoneChartContainer {...props} zone={ZONE_3} />
      )}
      {shiActiveTrend === ZONE_5 && (
        <ZoneChartContainer {...props} zone={ZONE_5} />
      )}
    </div>
  );
}

export default TemporalTrendsShiComponent;
