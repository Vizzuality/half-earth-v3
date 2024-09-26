import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';

import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';
import { LightModeContext } from '../../../../../context/light-mode';
import { useT } from '@transifex/react';

function TemporalTrendsShiComponent(props) {
  const t = useT();
  const { shiData, shiValue } = props;

  // const [chartData, setChartData] = useState();
  const [lostAvg, setLostAvg] = useState(0);
  const { lightMode } = useContext(LightModeContext);

  useEffect(() => {
    setLostAvg((100 - shiValue).toFixed(2));

  }, [shiValue]);

  const handleActionChange = (event) => {

  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        <p className={styles.description}>
          Depuis 2001, les espèces de vertébrés terrestres de la République Démocratique du Congo ont perdu en moyenne 1,37 % de leur habitat approprié, ce qui a conduit le pays à avoir un indice d'habitat des espèces de 98,63.
        </p>
        <p className={styles.description}>
          Le score de surface traite des changements dans l'extension de l'habitat, tandis que le score de connectivité traite des changements dans la fragmentation de l'habitat.
        </p>
        <div className={styles.options}>
          <Button
            type="rectangular"
            className={styles.saveButton}
            label={NATIONAL_TREND}
            handleClick={handleActionChange}
          />
          {/*
          <span className={styles.helpText}>
            {t('Toggle national SPI and province-level breakdown.')}
          </span>
          <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label="play animation"
          />
          <span className={styles.helpText}>
            {t('View how the percent of area protected, SPI, and score distributions have changed over time.')}
          </span>*/}
        </div>
      </div>
      <NationalChartContainer
        chartData={shiData.trendData}
        {...props}
      />
    </div>
  );
}

export default TemporalTrendsShiComponent;
