import React, { useContext, useEffect, useState } from 'react';

import { T, useT } from '@transifex/react';

import cx from 'classnames';
import last from 'lodash/last';

import Button from 'components/button';

import { LightModeContext } from '../../../../../context/light-mode';
import { NATIONAL_TREND } from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';

function TemporalTrendsSiiComponent(props) {
  const t = useT();
  const { countryName, siiData } = props;
  const [nationalChartData, setNationalChartData] = useState({
    area_values: [],
    spi_values: [],
  });
  const [latestValues, setLatestValues] = useState({ year: 0, spi: 0 });
  const [firstValues, setFirstValues] = useState({ year: 0, spi: 0 });
  const [highestObservation, setHighestObservation] = useState(0);
  const [lowestObservation, setLowestObservation] = useState(0);
  const [currentYear, setCurrentYear] = useState(2023);
  const { lightMode } = useContext(LightModeContext);
  const taxa = 'all_terr_verts';

  const getNationalData = async () => {
    if (siiData.trendData.length) {
      const data = siiData.trendData;
      const { groups } = data[0];
      const allVertValues = groups.filter((group) => group.taxa === taxa);

      setNationalChartData(allVertValues[0]);

      const { values } = allVertValues[0];
      setLatestValues({
        year: last(values)[0],
        spi: (last(values)[1] * 100).toFixed(1),
      });
      setFirstValues({
        year: values[0][0],
        spi: (values[0][1] * 100).toFixed(1),
      });
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
          <T
            _str="In {currentYear}, {currentObservationBold} of the expected ranges of terrestrial vertebrate species in {countryName} had a recorded observation of that species. Since {startYear}, the annual SII has fluctuated between {highestObservationBold} and {lowestObservationBold}."
            currentYear={currentYear}
            currentObservationBold={<b>{latestValues.spi}%</b>}
            countryName={countryName}
            startYear={firstValues.year}
            highestObservationBold={<b>{highestObservation}</b>}
            lowestObservationBold={<b>{lowestObservation}</b>}
          />
        </p>
        <div className={styles.options}>
          <div className={styles.trendTypes}>
            <Button
              type="rectangular"
              className={styles.saveButton}
              label={NATIONAL_TREND}
            />
          </div>
          {/* <span className={styles.helpText}>
            {t('Toggle national SPI and province-level breakdown.')}
          </span> */}
          {/* <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label="play animation"
          />
          <span className={styles.helpText}>
            {t('View how the percent of area protected, SPI, and score distributions have changed over time.')}
          </span> */}
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
