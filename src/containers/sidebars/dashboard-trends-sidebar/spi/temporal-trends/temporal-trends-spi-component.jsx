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
import { LightModeContext } from '../../../../../context/light-mode';
import { useT, T } from '@transifex/react';
import TrendTableComponent from './trend-table/trend-table-component';

function TemporalTrendsSpiComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  const { countryName, spiData, activeTrend, setActiveTrend, setYear } = props;

  const [showTable, setShowTable] = useState(false);
  const [spiInfo, setSpiInfo] = useState();
  const [areaProtectedPercent, setAreaProtectedPercent] = useState();
  const [countryRegions, setCountryRegions] = useState([]);
  const [areaProtected, setAreaProtected] = useState(0);
  const [startYear, setStartYear] = useState('1980');

  useEffect(() => {
    if (!spiData.trendData.length) return;
    getNationalData();
    const { regions } = spiData.trendData[0];
    setCountryRegions(regions);

  }, [spiData.trendData]);

  const getNationalData = async () => {
    if (spiData.trendData.length) {
      const data = spiData.trendData;
      const { country_scores } = data[0];
      const firstScore = country_scores[0];
      const currentScore = country_scores[country_scores.length - 1];
      setAreaProtectedPercent(currentScore.percentprotected_all.toFixed(2))
      setSpiInfo(`${firstScore.spi_all.toFixed(2)} in ${firstScore.year} to ${currentScore.spi_all.toFixed(2)} in ${currentScore.year}`);
      setYear(currentScore.year);

      const spiChange = currentScore.spi_all - firstScore.spi_all;
      const totalRegionAreas = getCountryArea();
      // 62.0950555134937
      // 30.8088823880089
      // 2,327,888.7255660617
      const areaProtectedChange = totalRegionAreas / spiChange;
      setAreaProtected(areaProtectedChange);
    }
  };

  const getCountryArea = () => {
    const { regions } = spiData.trendData[0];

    return regions.reduce((accumulator, region) => {
      return region.regional_scores[0].region_area + accumulator
    }, 0);
  }

  const handleActionChange = (event) => {
    setShowTable(false);
    setActiveTrend(event.currentTarget.innerText);
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        <p className={styles.description}>
          <T
            _str='Since {startYear}, the {countryName} has added {areaBold} of land into its protected area network, representing {areaProtectedPercentBold} of the total land in the country, increasing its Species Protection Index from {spiInfoBold}'
            startYear={startYear}
            countryName={countryName}
            areaBold={<b>{areaProtected.toFixed(2)} km<sup>2</sup></b>}
            areaProtectedPercentBold={<b>{areaProtectedPercent}%</b>}
            spiInfoBold={<b>{spiInfo}</b>}
          />
        </p>
        <div className={styles.options}>
          <div className={styles.btnGroup}>
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend === NATIONAL_TREND,
              })}
              label={PROVINCE_TREND}
              handleClick={handleActionChange}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeTrend === PROVINCE_TREND,
              })}
              label={NATIONAL_TREND}
              handleClick={handleActionChange}
            />
          </div>
          <span className={styles.helpText}>
            {t('Toggle national SPI and province-level breakdown.')}
          </span>
          {activeTrend !== NATIONAL_TREND && (
            <>
              {!showTable && <Button
                type="rectangular"
                className={cx(styles.saveButton, styles.notActive)}
                label={t('View full table')}
                handleClick={() => setShowTable(true)}
              />}
              {showTable && <Button
                type="rectangular"
                className={cx(styles.saveButton, styles.notActive)}
                label={t('Close full table')}
                handleClick={() => setShowTable(false)}
              />}
              <span className={styles.helpText}>
                {t('Open and download a full table of annual national and province level SPI over time.')}
              </span>
            </>
          )}
        </div>
      </div>
      {!showTable && <>
        {activeTrend === NATIONAL_TREND && (
          <NationalChartContainer {...props} />
        )}
        {activeTrend === PROVINCE_TREND &&
          <ProvinceChartContainer
            countryRegions={countryRegions}
            {...props} />}
      </>}
      {
        showTable && <TrendTableComponent {...props} />
      }
    </div >
  );
}

export default TemporalTrendsSpiComponent;
