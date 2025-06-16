import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { useLocale, useT } from '@transifex/react';

import { numberToLocaleStringWithOneDecimal } from 'utils/dashboard-utils.js';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import cx from 'classnames';

import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';

import { SECTION_INFO } from '../../tutorials/sections/sections-info';

import styles from './protection-component-styles.module.scss';

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale
);

function ProtectionComponent(props) {
  const t = useT();
  const locale = useLocale();
  const {
    protectionTableData,
    countryName,
    lightMode,
    defaultCountryName,
    selectedCountry,
    updateCountry,
    onCountryChange,
    shiCountries,
    chartData,
    chartOptions,
    lang,
    countryISO,
  } = props;

  const [chartInfo, setChartInfo] = useState();
  const [tableInfo, setTableInfo] = useState();

  const updateChartInfo = () => {
    const speciesIndicatorGraphImg = `dashboard/tutorials/tutorial_species_indicatorGraph-${
      locale || 'en'
    }.png?react`;
    const speciesIndicatorTableImg = `dashboard/tutorials/tutorial_species_indicatorTable-${
      locale || 'en'
    }.png?react`;

    setChartInfo({
      title: t('Species Indicators - Graph'),
      description: t(SECTION_INFO.INDICATOR_SCORES),
      imgAlt: t('Species Indicators Graph'),
      image: speciesIndicatorGraphImg,
    });

    setTableInfo({
      title: t('Species Indicators - Table'),
      description: t(SECTION_INFO.INDICATOR_SCORES),
      imgAlt: t('Species Indicators Table'),
      image: speciesIndicatorTableImg,
    });
  };

  useEffect(() => {
    updateChartInfo();
  }, [lang]);

  useEffect(() => {
    updateChartInfo();
  }, []);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.chart}>
        <div className={styles.compareWrap}>
          <span className={styles.compare}>{t('Compare')}</span>
          <select value={selectedCountry} onChange={onCountryChange}>
            {shiCountries.map(
              (item) =>
                item !== countryName && (
                  <option key={item} value={item}>
                    {t(item)}
                  </option>
                )
            )}
          </select>
        </div>
        <div className={styles.legend}>
          <div className={cx(styles.legendBox, styles.blue)} />
          <span>{t(defaultCountryName) || t(countryName)}</span>
          {selectedCountry !== 'Global' && countryISO === 'EE' && (
            <>
              <div className={cx(styles.legendBox, styles.green)} />
              <span>{t(selectedCountry)}</span>
            </>
          )}
          {countryISO !== 'EE' && (
            <>
              <div className={cx(styles.legendBox, styles.green)} />
              <span>{t(selectedCountry)}</span>
            </>
          )}
        </div>
        {chartData && (
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Line options={chartOptions} data={chartData} />
          </ChartInfoComponent>
        )}
        {protectionTableData.length && (
          <ChartInfoComponent chartInfo={tableInfo} {...props}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th className={cx(styles.textLeft, styles.w20)}>
                    {countryISO === 'EE' ? t('Region') : t('Country')}
                  </th>
                  <th className={cx(styles.textCenter)}>{t('Stewardship')}</th>
                  <th className={cx(styles.textCenter, styles.w28)}>
                    {t('Range Protected')}
                  </th>
                  <th className={cx(styles.textCenter, styles.w28)}>
                    {t('Target Protected')}
                  </th>
                  <th className={cx(styles.textCenter, styles.w12)}>
                    {t('Total SPS')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {protectionTableData.map((row) => (
                  <tr
                    key={row.country}
                    onClick={() => updateCountry({ value: row.country })}
                    className={`${
                      selectedCountry === row.country ||
                      countryName === row.country
                        ? styles.highlighted
                        : ''
                    }`}
                  >
                    <td>{t(row.country)}</td>
                    <td className={styles.textCenter}>
                      {numberToLocaleStringWithOneDecimal(row.stewardship)}%
                    </td>
                    <td className={styles.textCenter}>
                      {numberToLocaleStringWithOneDecimal(
                        parseFloat(row.rangeProtected)
                      )}{' '}
                      km
                      <sup>2</sup>
                    </td>
                    <td className={styles.textCenter}>
                      {numberToLocaleStringWithOneDecimal(
                        parseFloat(row.targetProtected)
                      )}{' '}
                      km
                      <sup>2</sup>
                    </td>
                    <td className={styles.textCenter}>
                      {numberToLocaleStringWithOneDecimal(row.sps)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ChartInfoComponent>
        )}

        <p>
          {t(
            '*The Species Protection Score is calculated using the habitat suitable range map and the WDPA Protected Areas.'
          )}
        </p>
      </div>
    </div>
  );
}

export default ProtectionComponent;
