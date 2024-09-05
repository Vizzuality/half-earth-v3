import React from 'react';
import styles from './protection-component-styles.module.scss';
import cx from 'classnames';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend, CategoryScale);

function ProtectionComponent(props) {
  const {
    protectionTableData,
    countryName,
    protectionScore,
    globalProtectionScore,
    protectionArea,
    globalProtectionArea,
    lightMode,
    selectedCountry,
    updateCountry,
    onCountryChange,
    shiCountries,
    chartData,
    chartOptions
  } = props;


  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <p>
        *The Species Protection Score is calculated using the species expert range map and the WDPA Protected Areas.
      </p>
      <div className={styles.scores}>
        <div className={styles.metric}>
          <label>{countryName}</label>
          <div className={styles.score}>
            <div className={styles.chartWrapper}>
              <b>{protectionScore}</b>
            </div>
            <div className={styles.results}>
              <b>{protectionArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} km<sup>2</sup></b>
              <span className={styles.desc}>
                of a total 15,461 km<sup>2</sup> suitable habitat within protected areas
              </span>
            </div>
          </div>
        </div>
        <div className={styles.metric}>
          <label>Globally</label>
          <div className={styles.score}>
            <div className={styles.chartWrapper}>
              <b>{globalProtectionScore}</b>
            </div>
            <div className={styles.results}>
              <b>{globalProtectionArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} km<sup>2</sup></b>
              <span className={styles.desc}>of a total 87,338 km<sup>2</sup> suitable habitat within protected areas</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <div className={styles.compareWrap}>
          <label className={styles.compare}>Compare</label>
          <select value={selectedCountry} onChange={onCountryChange}>
            {shiCountries.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className={styles.labels}>
          <label className={styles.dashed}>Area</label>
          <label className={styles.dotted}>Connectivity</label>
          <label className={styles.solid}>Total</label>
        </div>
        <div className={styles.legend}>
          <div className={cx(styles.legendBox, styles.blue)}></div>
          <label>{countryName}</label>
          <div className={cx(styles.legendBox, styles.green)}></div>
          <label>{selectedCountry}</label>
        </div>
        {chartData && <Line options={chartOptions} data={chartData} />}
        {protectionTableData.length &&
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th className={cx(styles.textLeft, styles.w20)}>Country</th>
                <th className={cx(styles.textCenter)}>Stewardship</th>
                <th className={cx(styles.textCenter, styles.w28)}>Range Protected</th>
                <th className={cx(styles.textCenter, styles.w28)}>Target Protected</th>
                <th className={cx(styles.textCenter, styles.w12)}>Total SPS</th>
              </tr>
            </thead>
            <tbody>
              {protectionTableData.map(row => (
                <tr key={row.country} onClick={() => updateCountry({ value: row.country })}
                  className={(selectedCountry === row.country || countryName === row.country) ? styles.highlighted : ''}
                >
                  <td>{row.country}</td>
                  <td className={styles.textCenter}>{row.stewardship.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</td>
                  <td className={styles.textCenter}>
                    {row.rangeProtected.toLocaleString(undefined, { maximumFractionDigits: 2 })} km<sup>2</sup>
                  </td>
                  <td className={styles.textCenter}>
                    {row.targetProtected.toLocaleString(undefined, { maximumFractionDigits: 2 })} km<sup>2</sup>
                  </td>
                  <td className={styles.textCenter}>{row.sps.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  )
}

export default ProtectionComponent
