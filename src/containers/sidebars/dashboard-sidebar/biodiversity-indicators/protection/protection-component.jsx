import React, { useState } from 'react';
import styles from './protection-component-styles.module.scss';
import { T, useT } from '@transifex/react';
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
  const t = useT();
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

  const [totalArea, setTotalArea] = useState(0);
  const [globalArea, setGlobalArea] = useState(0);


  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <p>
        {t('*The Species Protection Score is calculated using the habitat suitable range map and the WDPA Protected Areas.')}
      </p>
      <div className={styles.scores}>
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
      </div>
      <div className={styles.chart}>
        <div className={styles.compareWrap}>
          <label className={styles.compare}>{t('Compare')}</label>
          <select value={selectedCountry} onChange={onCountryChange}>
            {shiCountries.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className={styles.labels}>
          <label className={styles.dashed}>{t('Area')}</label>
          <label className={styles.dotted}>{t('Connectivity')}</label>
          <label className={styles.solid}>{t('Total')}</label>
        </div>
        <div className={styles.legend}>
          <div className={cx(styles.legendBox, styles.blue)}></div>
          <label>{t(countryName)}</label>
          <div className={cx(styles.legendBox, styles.green)}></div>
          <label>{selectedCountry}</label>
        </div>
        {chartData && <Line options={chartOptions} data={chartData} />}
        {protectionTableData.length &&
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th className={cx(styles.textLeft, styles.w20)}>{t('Country')}</th>
                <th className={cx(styles.textCenter)}>{t('Stewardship')}</th>
                <th className={cx(styles.textCenter, styles.w28)}>{t('Range Protected')}</th>
                <th className={cx(styles.textCenter, styles.w28)}>{t('Target Protected')}</th>
                <th className={cx(styles.textCenter, styles.w12)}>{t('Total SPS')}</th>
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
