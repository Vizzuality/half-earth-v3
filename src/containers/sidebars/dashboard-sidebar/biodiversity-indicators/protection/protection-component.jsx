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
  const {
    protectionTableData,
    countryName,
    lightMode,
    selectedCountry,
    updateCountry,
    onCountryChange,
    shiCountries,
    chartData,
    chartOptions,
  } = props;

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {/* <div className={styles.scores}>
        <div className={styles.metric}>
          <label>{t(countryName)}</label>
          <div className={styles.score}>
            <div className={styles.chartWrapper}>
              <b>{protectionScore}</b>
            </div>
            <div className={styles.results}>
              <b>{protectionArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} km<sup>2</sup></b>
              <span className={styles.desc}>
                <T
                  _str='of a total {totalArea} km{sup} suitable habitat within protected areas'
                  sup={<sup>2</sup>}
                  totalArea={totalArea}
                />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.metric}>
          <label>{t('Globally')}</label>
          <div className={styles.score}>
            <div className={styles.chartWrapper}>
              <b>{globalProtectionScore}</b>
            </div>
            <div className={styles.results}>
              <b>{globalProtectionArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} km<sup>2</sup></b>
              <span className={styles.desc}>
                <T
                  _str='of a total {globalArea} km{sup} suitable habitat within protected areas'
                  sup={<sup>2</sup>}
                  globalArea={globalArea}
                />
              </span>
            </div>
          </div>
        </div>
      </div> */}
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
        <div className={styles.legend}>
          <div className={cx(styles.legendBox, styles.blue)} />
          <span>{t(countryName)}</span>
          <div className={cx(styles.legendBox, styles.green)} />
          <span>{selectedCountry}</span>
        </div>
        {chartData && <Line options={chartOptions} data={chartData} />}
        {protectionTableData.length && (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th className={cx(styles.textLeft, styles.w20)}>
                  {t('Country')}
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
