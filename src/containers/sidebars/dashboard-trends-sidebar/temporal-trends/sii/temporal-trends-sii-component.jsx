import React, { useContext, useEffect, useState } from 'react';
import last from 'lodash/last';

import cx from 'classnames';

import Button from 'components/button';

import { NATIONAL_TREND } from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import NationalChartContainer from './national-chart';
import { LightModeContext } from '../../../../../context/light-mode';
import { useT } from '@transifex/react';

function TemporalTrendsSiiComponent(props) {
  const t = useT();
  const { countryData, siiData } = props;
  const [nationalChartData, setNationalChartData] = useState({
    area_values: [],
    spi_values: [],
  });
  const [latestValues, setLatestValues] = useState({ year: 0, spi: 0 })
  const { lightMode } = useContext(LightModeContext);
  const taxa = 'all_terr_verts';

  const getNationalData = async () => {
    if (siiData.trendData.length) {
      const data = siiData.trendData;
      const { groups } = data[0];
      const allVertValues = groups.filter(group => group.taxa === taxa);

      setNationalChartData(allVertValues[0]);

      const { values } = allVertValues[0];
      setLatestValues({ year: last(values)[0], spi: (last(values)[1] * 100).toFixed(2) })
    }
  };

  useEffect(() => {
    getNationalData();
  }, [siiData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        <p className={styles.description}>
          Species data coverage remains low in <b>{countryData?.NAME_0}</b>. In {latestValues.year}, {latestValues.spi}% of the expected ranges of terrestrial vertebrate species
          here had a recorded observation of that species. Since 1950, the
          annual SII has fluctuated between 1.6 and 0.0.
        </p>
        <div className={styles.options}>
          <div className={styles.trendTypes}>
            <Button
              type="rectangular"
              className={styles.saveButton}
              label={NATIONAL_TREND}
            />
          </div>
          <span className={styles.helpText}>
            {t('Toggle national SPI and province-level breakdown.')}
          </span>
          {/* <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label="play animation"
          /> */}
          <span className={styles.helpText}>
            {t('View how the percent of area protected, SPI, and score distributions have changed over time.')}
          </span>
        </div>
      </div>
      <NationalChartContainer
        nationalChartData={nationalChartData}
        {...props}
      />
    </div>
  );
}

export default TemporalTrendsSiiComponent;
