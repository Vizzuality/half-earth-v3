import React, { useContext, useEffect, useState } from 'react';

import { T, useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';

import EsriFeatureService from 'services/esri-feature-service';

import { COUNTRIES_DATA_SERVICE_URL } from 'constants/layers-urls';

import {
  MEX,
  PER,
  BRA,
  MDG,
  VNM,
  LND,
  INT,
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
    setClickedRegion,
    view,
  } = props;

  // const [chartData, setChartData] = useState();
  const [lostAvg, setLostAvg] = useState(0);
  const { lightMode } = useContext(LightModeContext);
  const [startYear] = useState(2001);

  const eewwfRegions = ['MEX', 'PER', 'BRA', 'MDG', 'VNM', 'LND', 'INT'];

  const handleActionChange = (option) => {
    setClickedRegion(null);
    setShiActiveTrend(option);

    if (countryISO.toLowerCase() === 'eewwf') {
      if (option !== LND && option !== INT) {
        EsriFeatureService.getFeatures({
          url: COUNTRIES_DATA_SERVICE_URL,
          whereClause: `GID_0 = '${option}'`,
          returnGeometry: true,
        }).then((features) => {
          // eslint-disable-next-line no-shadow
          const { geometry } = features[0];

          view.goTo({
            target: geometry,
            center: [geometry.longitude - 20, geometry.latitude],
            zoom: 5.5,
            extent: geometry.clone(),
          });
        });
      } else {
        view.goTo({
          zoom: 1,
        });
      }
    }
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
                handleClick={() => handleActionChange(NATIONAL_TREND)}
              />
              {countryISO === 'COD' && (
                <Button
                  type="rectangular"
                  className={cx(styles.saveButton, {
                    [styles.notActive]: shiActiveTrend !== PROVINCE_TREND,
                  })}
                  label={PROVINCE_TREND}
                  handleClick={() => handleActionChange(PROVINCE_TREND)}
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
              handleClick={() => handleActionChange(ZONE_3)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== ZONE_5,
              })}
              label="ZONE_5"
              handleClick={() => handleActionChange(ZONE_5)}
            />
          </div>
        )}
        {countryISO.toLowerCase() === 'eewwf' && (
          <div className={styles.options}>
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== MEX,
              })}
              label="Mexico"
              handleClick={() => handleActionChange(MEX)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== PER,
              })}
              label="Peru"
              handleClick={() => handleActionChange(PER)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== BRA,
              })}
              label="Brazil"
              handleClick={() => handleActionChange(BRA)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== MDG,
              })}
              label="Madagascar"
              handleClick={() => handleActionChange(MDG)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== VNM,
              })}
              label="Vietnam"
              handleClick={() => handleActionChange(VNM)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== LND,
              })}
              label="Landscape"
              handleClick={() => handleActionChange(LND)}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: shiActiveTrend !== INT,
              })}
              label="Intervention"
              handleClick={() => handleActionChange(INT)}
            />
          </div>
        )}
      </div>
      {countryISO.toLowerCase() === 'eewwf' &&
        eewwfRegions.includes(shiActiveTrend) && (
          <ZoneChartContainer {...props} zone={shiActiveTrend} />
        )}
      {countryISO.toLowerCase() !== 'eewwf' && (
        <>
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
        </>
      )}
    </div>
  );
}

export default TemporalTrendsShiComponent;
