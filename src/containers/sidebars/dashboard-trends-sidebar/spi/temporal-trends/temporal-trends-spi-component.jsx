import React, { useContext, useEffect, useState } from 'react';

import { useT, T } from '@transifex/react';

import { numberToLocaleStringWithOneDecimal } from 'utils/dashboard-utils.js';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import last from 'lodash/last';

import Button from 'components/button';

import {
  MEX,
  PER,
  BRA,
  MDG,
  VNM,
  NATIONAL_TREND,
  PROVINCE_TREND,
  ZONE_3,
  ZONE_5,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';
import ProvinceChartContainer from './province-chart';
import TrendTableComponent from './trend-table/trend-table-component';
import ZoneChartContainer from './zone-chart';

function TemporalTrendsSpiComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  const { countryName, activeTrend, setActiveTrend, countryData, countryISO } =
    props;

  const [showTable, setShowTable] = useState(false);
  const [areaProtectedPercent, setAreaProtectedPercent] = useState();
  const [areaProtected, setAreaProtected] = useState(0);
  const [startYear, setStartYear] = useState('1980');

  const eewwfRegions = ['MEX', 'PER', 'BRA', 'MDG', 'VNM'];

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

  const handleActionChange = (option) => {
    setShowTable(false);
    setActiveTrend(option);
  };

  useEffect(() => {
    if (!countryData.length) return;
    getNationalData();
  }, [countryData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        {countryISO.toLowerCase() !== 'eewwf' && (
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
        )}
        {countryISO.toLowerCase() !== 'eewwf' && (
          <div className={styles.options}>
            <div className={styles.btnGroup}>
              <Button
                type="rectangular"
                className={cx(styles.saveButton, {
                  [styles.notActive]: activeTrend !== PROVINCE_TREND,
                })}
                label={PROVINCE_TREND}
                handleClick={() => handleActionChange(PROVINCE_TREND)}
              />
              <Button
                type="rectangular"
                className={cx(styles.saveButton, {
                  [styles.notActive]: activeTrend !== NATIONAL_TREND,
                })}
                label={NATIONAL_TREND}
                handleClick={() => handleActionChange(NATIONAL_TREND)}
              />
            </div>
            <span className={styles.helpText}>
              {t('Toggle national SPI and province-level breakdown.')}
            </span>
            {countryISO.toLowerCase() === 'guy' && (
              <div className={styles.btnGroup}>
                <Button
                  type="rectangular"
                  className={cx(styles.saveButton, {
                    [styles.notActive]: activeTrend !== ZONE_3,
                  })}
                  label="ZONE_3"
                  handleClick={() => handleActionChange(ZONE_3)}
                />
                <Button
                  type="rectangular"
                  className={cx(styles.saveButton, {
                    [styles.notActive]: activeTrend !== ZONE_5,
                  })}
                  label="ZONE_5"
                  handleClick={() => handleActionChange(ZONE_5)}
                />
              </div>
            )}
            {activeTrend === PROVINCE_TREND && (
              <>
                {!showTable && (
                  <Button
                    type="rectangular"
                    className={cx(styles.saveButton, styles.notActive)}
                    label={
                      countryISO.toLowerCase() !== 'eewwf'
                        ? t('View Full Province table')
                        : t('View Full Species table')
                    }
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
        )}
        {countryISO.toLowerCase() === 'eewwf' && (
          <div className={styles.options}>
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend !== MEX,
              })}
              label="Mexico"
              handleClick={() => handleActionChange(MEX)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend !== PER,
              })}
              label="Peru"
              handleClick={() => handleActionChange(PER)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend !== BRA,
              })}
              label="Brazil"
              handleClick={() => handleActionChange(BRA)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend !== MDG,
              })}
              label="Madagascar"
              handleClick={() => handleActionChange(MDG)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend !== VNM,
              })}
              label="Vietnam"
              handleClick={() => handleActionChange(VNM)}
            />
          </div>
        )}
      </div>
      {countryISO.toLowerCase() === 'eewwf' &&
        eewwfRegions.includes(activeTrend) && (
          <ZoneChartContainer {...props} zone={activeTrend} />
        )}
      {!showTable && countryISO.toLowerCase() !== 'eewwf' && (
        <>
          {activeTrend === NATIONAL_TREND && (
            <NationalChartContainer {...props} />
          )}
          {activeTrend === PROVINCE_TREND && (
            <ProvinceChartContainer {...props} />
          )}
          {activeTrend === ZONE_3 && (
            <ZoneChartContainer {...props} zone={ZONE_3} />
          )}
          {activeTrend === ZONE_5 && (
            <ZoneChartContainer {...props} zone={ZONE_5} />
          )}
        </>
      )}
      {showTable && <TrendTableComponent {...props} />}
    </div>
  );
}

export default TemporalTrendsSpiComponent;
