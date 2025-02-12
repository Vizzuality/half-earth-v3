import React, { useContext, useEffect, useState } from 'react';

import { useT, T } from '@transifex/react';

import { numberToLocaleStringWithOneDecimal } from 'utils/dashboard-utils.js';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import last from 'lodash/last';

import Button from 'components/button';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';
import ProvinceChartContainer from './province-chart';
import TrendTableComponent from './trend-table/trend-table-component';

function TemporalTrendsSpiComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  const { countryName, activeTrend, setActiveTrend, countryData } = props;

  const [showTable, setShowTable] = useState(false);
  const [areaProtectedPercent, setAreaProtectedPercent] = useState();
  const [areaProtected, setAreaProtected] = useState(0);
  const [startYear, setStartYear] = useState('1980');

  const getNationalData = async () => {
    if (countryData) {
      const firstScore = countryData[0];
      setStartYear(firstScore.Year);
      const currentScore = last(countryData);
      setAreaProtectedPercent(currentScore.PercentAreaProtected.toFixed(1));

      const spiChange = currentScore.SPI - firstScore.SPI;
      const totalRegionAreas = currentScore.AreaProtected;
      const areaProtectedChange = totalRegionAreas / spiChange;
      setAreaProtected(areaProtectedChange);
    }
  };

  const handleActionChange = (event) => {
    setShowTable(false);
    setActiveTrend(event.currentTarget.innerText);
  };

  useEffect(() => {
    if (!countryData.length) return;
    getNationalData();
  }, [countryData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        <p className={styles.description}>
          <T
            _str="Since {startYear}, the {countryName} has added {areaBold} of land into its protected area network, representing {areaProtectedPercentBold} of the total land in the country, increasing its Species Protection Index from {spiInfoBold}"
            startYear={startYear}
            countryName={t(countryName)}
            areaBold={
              <b>
                {numberToLocaleStringWithOneDecimal(areaProtected)} km
                <sup>2</sup>
              </b>
            }
            areaProtectedPercentBold={<b>{areaProtectedPercent}%</b>}
            spiInfoBold={
              <b>{`${countryData[0]?.SPI.toFixed(1)} ${t('in')} ${
                countryData[0]?.Year
              } ${t('to')} ${last(countryData)?.SPI.toFixed(1)} ${t('in')} ${
                last(countryData)?.Year
              }`}</b>
            }
          />
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
            {t('Toggle national SPI and province-level breakdown.')}
          </span>
          {activeTrend !== NATIONAL_TREND && (
            <>
              {!showTable && (
                <Button
                  type="rectangular"
                  className={cx(styles.saveButton, styles.notActive)}
                  label={t('View Full Province table')}
                  handleClick={() => setShowTable(true)}
                />
              )}
              {showTable && (
                <Button
                  type="rectangular"
                  className={cx(styles.saveButton, styles.notActive)}
                  label={t('Close full table')}
                  handleClick={() => setShowTable(false)}
                />
              )}
              {/* <span className={styles.helpText}>
                {t(
                  'Open and download a full table of annual national and province level SPI over time.'
                )}
              </span> */}
            </>
          )}
        </div>
      </div>
      {!showTable && (
        <>
          {activeTrend === NATIONAL_TREND && (
            <NationalChartContainer {...props} />
          )}
          {activeTrend === PROVINCE_TREND && (
            <ProvinceChartContainer {...props} />
          )}
        </>
      )}
      {showTable && <TrendTableComponent {...props} />}
    </div>
  );
}

export default TemporalTrendsSpiComponent;
