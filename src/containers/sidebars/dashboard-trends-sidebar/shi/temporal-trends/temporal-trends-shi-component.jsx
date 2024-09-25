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
          Since 2001, the terrestrial vertebrate species of the Democratic
          Republic of the Congo have <b>lost an average of {lostAvg}%</b> of their suitable
          habitat, leading to the country having a <b>Species Habitat Index of {shiValue}.</b>
        </p>
        <p className={styles.description}>
          The <b>Area Score</b> addresses changes in habitat extent while the <b>Connectivity Score</b> addresses changes in the fragmentation of habitat.
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
