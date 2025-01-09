import React from 'react';
import { Line } from 'react-chartjs-2';

import { useT } from '@transifex/react';

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

import styles from './habitat-component-styles.module.scss';

ChartJS.register(
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale
);

function HabitatComponent(props) {
  const t = useT();
  const {
    countryName,
    habitatTableData,
    lightMode,
    selectedCountry,
    shiCountries,
    chartData,
    onCountryChange,
    chartOptions,
    updateCountry,
  } = props;

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.chart}>
        <div className={styles.compareWrap}>
          <span className={styles.compare}>{t('Compare')}</span>
          <select value={selectedCountry} onChange={onCountryChange}>
            {shiCountries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.labels}>
          <span className={styles.dashed}>{t('Area')}</span>
          <span className={styles.dotted}>{t('Connectivity')}</span>
          <span className={styles.solid}>{t('Total')}</span>
        </div>
        <div className={styles.legend}>
          <div className={cx(styles.legendBox, styles.blue)} />
          <span>{t(countryName)}</span>
          <div className={cx(styles.legendBox, styles.green)} />
          <span>{selectedCountry}</span>
        </div>
        {chartData && <Line options={chartOptions} data={chartData} />}
        {habitatTableData.length && (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th className={cx(styles.textLeft, styles.w28)}>
                  {t('Country')}
                </th>
                <th className={cx(styles.textCenter, styles.w14)}>
                  {t('Stewardship')}
                </th>
                <th className={cx(styles.textCenter, styles.w14)}>
                  {t('Connectivity Score')}
                </th>
                <th className={cx(styles.textCenter, styles.w14)}>
                  {t('Area Score')}
                </th>
                <th className={cx(styles.textCenter, styles.w14)}>
                  {t('Total SHS')}
                </th>
              </tr>
            </thead>
            <tbody>
              {habitatTableData.map((row) => (
                <tr
                  key={row.country}
                  onClick={() => updateCountry({ value: row.country })}
                  className={
                    selectedCountry === row.country ||
                    countryName === row.country
                      ? styles.highlighted
                      : ''
                  }
                >
                  <td>{row.country}</td>
                  <td className={styles.textCenter}>
                    {numberToLocaleStringWithOneDecimal(row.stewardship)}%
                  </td>
                  <td className={styles.textCenter}>
                    {numberToLocaleStringWithOneDecimal(
                      row.countryConnectivityScore * 100
                    )}
                  </td>
                  <td className={styles.textCenter}>
                    {numberToLocaleStringWithOneDecimal(
                      row.countryAreaScore * 100
                    )}
                  </td>
                  <td className={styles.textCenter}>
                    {numberToLocaleStringWithOneDecimal(row.shs)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p>
          {t(
            '*The Species Habitat Score is calculated using the habitat suitable range map and remote sensing layers.'
          )}
        </p>
      </div>
    </div>
  );
}

export default HabitatComponent;
