import React, { useContext, useEffect, useState } from 'react';

import { T, useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import last from 'lodash/last';

import Button from 'components/button';

import { SII_LATEST_YEAR } from 'constants/dashboard-constants.js';

import { NATIONAL_TREND } from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import NationalChartContainer from './national-chart';

function TemporalTrendsSiiComponent(props) {
  const t = useT();
  const { countryName, countryData, countryISO } = props;
  const [nationalChartData, setNationalChartData] = useState([]);
  const [latestValues, setLatestValues] = useState({ year: 0, spi: 0 });
  const [firstValues, setFirstValues] = useState({ year: 0, spi: 0 });
  const [highestObservation, setHighestObservation] = useState(0);
  const [lowestObservation, setLowestObservation] = useState(0);
  const [currentYear, setCurrentYear] = useState(SII_LATEST_YEAR);
  const { lightMode } = useContext(LightModeContext);

  const getNationalData = async () => {
    if (countryData.length) {
      const allVertValues = countryData
        .filter((r) => r.year <= SII_LATEST_YEAR)
        .map((c) => ({
          year: c.year,
          globalRanking: c.sii_rank,
          sii: c.sii,
        }));

      setNationalChartData(allVertValues);
      const lastValue = last(allVertValues);
      setCurrentYear(lastValue.year);

      setLatestValues({
        year: lastValue.year,
        spi: lastValue.sii.toFixed(1),
      });
      setFirstValues({
        year: allVertValues[0].year,
        spi: allVertValues[0].sii.toFixed(1),
      });

      const orderBySII = [...allVertValues].sort((a, b) => a.sii - b.sii);
      setLowestObservation(orderBySII[0].sii);
      setHighestObservation(last(orderBySII).sii.toFixed(1));
    }
  };

  useEffect(() => {
    getNationalData();
  }, [countryData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Temporal Trends')}</span>
        {countryISO.toLowerCase() !== 'ee' && (
          <p className={styles.description}>
            <T
              _str="In {currentYear}, {currentObservationBold} of the expected ranges of terrestrial vertebrate species in {countryBold} had a recorded observation of that species. Since {startYear}, the annual SII has fluctuated between {lowestObservationBold} and {highestObservationBold}."
              currentYear={currentYear}
              countryBold={<b>{t(countryName)}</b>}
              currentObservationBold={<b>{latestValues.spi}%</b>}
              countryName={countryName}
              startYear={firstValues.year}
              highestObservationBold={<b>{highestObservation}</b>}
              lowestObservationBold={<b>{lowestObservation}</b>}
            />
          </p>
        )}
        {countryISO.toLowerCase() !== 'ee' && (
          <div className={styles.options}>
            <div className={styles.trendTypes}>
              <Button
                type="rectangular"
                className={styles.saveButton}
                label={NATIONAL_TREND}
              />
            </div>
            {/* <span className={styles.helpText}>
            {t('Toggle national SII and province-level breakdown.')}
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
        )}
      </div>
      <NationalChartContainer
        nationalChartData={nationalChartData}
        {...props}
      />
    </div>
  );
}

export default TemporalTrendsSiiComponent;
