import React, { useContext, useEffect, useState } from 'react';
import styles from './protection-component-styles.module.scss';
import cx from 'classnames';
import { getCSSVariable } from 'utils/css-utils';
import { LightModeContext } from '../../../../../context/light-mode';
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
    dataByCountry,
    protectionScore,
    globalProtectionScore,
    protectionArea,
    globalProtectionArea
  } = props;
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [shiCountries, setShiCountries] = useState([]);
  const [globalScore, setGlobalScore] = useState(0);
  const [chartData, setChartData] = useState();
  const { lightMode } = useContext(LightModeContext);

  useEffect(() => {
    if (protectionTableData.length) {
      const countries = protectionTableData.map(item => item.country);

      const sortedCountries = countries.sort((a, b) => {
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA === 'GLOBAL' || nameB === 'GLOBAL') {
          return -2;
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      setShiCountries(sortedCountries);
      getChartData('Global');
    }

  }, [protectionTableData])


  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: 'Year',
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
        },
      },
      y: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: 'Species Habitat Score',
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
        },
      },
    },
  };

  const onCountryChange = (event) => {
    setSelectedCountry(event.currentTarget.value);
    getChartData(event.currentTarget.value);
  }

  const getChartData = (countrySelected) => {
    const dates = [];
    const currentCountry = dataByCountry[countryName];
    const globalCountry = dataByCountry.Global;

    const defaultCountryScores = { values: [] };
    const selectedCountryScores = { values: [] };

    if (currentCountry) {
      currentCountry.shs?.forEach(row => {
        defaultCountryScores.values.push(row.propchange * 100);
      });

      dataByCountry[countrySelected]?.shs.forEach(row => {
        dates.push(row.year);
        selectedCountryScores.values.push(row.propchange * 100);
      });

      setGlobalScore(globalCountry.shs[globalCountry.shs.length - 1].val - 100);
    }

    setChartData({
      labels: dates,
      datasets: [
        {
          label: `${countryName}`,
          fill: false,
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.values,
        },
        {
          label: `${countrySelected}`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
          pointStyle: false,
          data: selectedCountryScores.values,
        },
      ],
    });

    // suitableCountryProtectedArea = this.translate.instant(
    //   'suitable_protected_area_km',
    //   {
    //     countryArea: this.protectionTargetArea.toLocaleString(
    //       [],
    //       { maximumFractionDigits: 0 },
    //     ),
    //   },
    // );
    // this.suitableGlobalProtectedArea = this.translate.instant(
    //   'suitable_protected_area_km',
    //   {
    //     countryArea: this.globalProtectionTargetArea.toLocaleString(
    //       [],
    //       { maximumFractionDigits: 0 },
    //     ),
    //   },
    // );
  }

  const updateCountry = (country) => {
    setSelectedCountry(country.value);
    getChartData(country.value);
  }

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
        {chartData && <Line options={options} data={chartData} />}
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
