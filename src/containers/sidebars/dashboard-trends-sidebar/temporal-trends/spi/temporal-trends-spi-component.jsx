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
import { useT } from '@transifex/react';
import TrendTableComponent from './trend-table/trend-table-component';

function TemporalTrendsSpiComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  const { countryName, spiData } = props;

  const areaProtected = (328357).toLocaleString();
  const [showTable, setShowTable] = useState(false);
  const [activeTrend, setActiveTrend] = useState(PROVINCE_TREND);
  const [spiInfo, setSpiInfo] = useState();
  const [areaProtectedPercent, setAreaProtectedPercent] = useState();

  const getNationalData = async () => {
    if (spiData.trendData.length) {
      const data = spiData.trendData;
      const { country_scores } = data[0];
      const firstScore = country_scores[0];
      const currentScore = country_scores[country_scores.length - 1];
      setAreaProtectedPercent(currentScore.percentprotected_all.toFixed(2))
      setSpiInfo(`${firstScore.spi_all.toFixed(2)} in ${firstScore.year} to ${currentScore.spi_all.toFixed(2)} in ${currentScore.year}`);
    }
  };

  useEffect(() => {
    getNationalData();
  }, [spiData.trendData]);

  const handleActionChange = (event) => {
    setActiveTrend(event.currentTarget.innerText);
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        <p className={styles.description}>
          Since 1980, the {countryName} has added <b>{areaProtected} km<sup>2</sup></b> of
          land into its protected area network, representing <b>{areaProtectedPercent}%</b> of the total
          land in the country, increasing its Species Protection Index from <b>{spiInfo}</b>.
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
        {activeTrend === PROVINCE_TREND && <ProvinceChartContainer {...props} />}
      </>}
      {
        showTable && <TrendTableComponent {...props} />
      }
    </div >
  );
}

export default TemporalTrendsSpiComponent;
