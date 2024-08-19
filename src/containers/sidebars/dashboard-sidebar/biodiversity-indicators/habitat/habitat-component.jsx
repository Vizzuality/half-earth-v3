import React, { useContext, useEffect, useState } from 'react';
import styles from './habitat-component-styles.module.scss';
import { Line } from 'react-chartjs-2';
import cx from 'classnames';
import { getCSSVariable } from 'utils/css-utils';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { LightModeContext } from '../../../../../context/light-mode';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend, CategoryScale);

function HabitatComponent(props) {
  const { habitatScore, globalHabitatScore, countryName, dataByCountry, habitatTableData } = props;
  const { lightMode } = useContext(LightModeContext);

  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [shiCountries, setShiCountries] = useState([]);
  const [chartData, setChartData] = useState();

  const onCountryChange = (event) => {
    setSelectedCountry(event.currentTarget.value);
    getChartData(event.currentTarget.value);
  }

  useEffect(() => {
    if (habitatTableData.length) {
      const countries = habitatTableData.map(item => item.country);

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
  }, [habitatTableData]);

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

  const getChartData = (countrySelected) => {
    const dates = [];
    const currentCountry = dataByCountry[countryName];
    // const globalCountry = dataByCountry.Global;

    const defaultCountryScores = { area: [], connectivity: [], total: [] };
    const selectedCountryScores = { area: [], connectivity: [], total: [] };

    if (currentCountry) {
      currentCountry.shs?.forEach(row => {
        defaultCountryScores.area.push(row.propchange * 100);
      });

      dataByCountry[countrySelected]?.shs.forEach(row => {
        dates.push(row.year);
        selectedCountryScores.area.push(row.propchange * 100);
      });

      if (currentCountry.frag.length > 0) {
        const fragYear = currentCountry.frag?.[0].gisfrag;
        currentCountry?.frag?.forEach(row => {
          defaultCountryScores.connectivity.push((row.gisfrag / fragYear) * 100);
        });

        const selectedFragYear = dataByCountry[countrySelected]?.frag?.[0].gisfrag;
        dataByCountry[countrySelected]?.frag?.forEach(row => {
          selectedCountryScores.connectivity.push((row.gisfrag / selectedFragYear) * 100);
        });
      }

      // countryScore = (currentCountry.shs[currentCountry.shs.length - 1].val - 100);
      // globalScore = (globalCountry.shs[globalCountry.shs.length - 1].val - 100);

      // setTrendArrows();

      for (let index = 0; index < dates.length; index += 1) {
        const dcTotal = (defaultCountryScores.area[index] +
          defaultCountryScores.connectivity[index]) / 2;
        defaultCountryScores.total.push(dcTotal);

        const scTotal = (selectedCountryScores.area[index] +
          selectedCountryScores.connectivity[index]) / 2;
        selectedCountryScores.total.push(scTotal);
      }
    }

    setChartData({
      labels: dates,
      datasets: [
        {
          label: `${countryName} Area`,
          fill: false,
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          borderDash: [5, 5],
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.area,
        },
        {
          label: `${countryName} Connectivity`,
          fill: false,
          borderDash: [3, 3],
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.connectivity,
        },
        {
          label: `${countryName} Total`,
          fill: false,
          backgroundColor: '#2F2CAE',
          borderColor: '#2F2CAE',
          pointBackgroundColor: '#2F2CAE',
          pointBorderColor: '#2F2CAE',
          pointStyle: false,
          data: defaultCountryScores.total,
        },
        {
          label: `${countrySelected} Area`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
          borderDash: [5, 5],
          pointStyle: false,
          data: selectedCountryScores.area,
        },
        {
          label: `${countrySelected} Connectivity`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
          borderDash: [3, 3],
          pointStyle: false,
          data: selectedCountryScores.connectivity,
        },
        {
          label: `${countrySelected} Total`,
          fill: false,
          backgroundColor: '#228D19',
          borderColor: '#228D19',
          pointBackgroundColor: '#228D19',
          pointBorderColor: '#228D19',
          pointStyle: false,
          data: selectedCountryScores.total,
        },
      ],
    });
  }

  const updateCountry = (country) => {
    setSelectedCountry(country.value);
    getChartData(country.value);
  }


  return (
    <div className={styles.container}>
      <p>
        *The Species Habitat Score is calculated using the habitat suitable
        range map and remote sensing layers.
      </p>
      <div className={styles.scores}>
        <div className={styles.metric}>
          <label>Guinea</label>
          <div className={styles.score}>
            <span className={cx(styles['material-symbols-outlined'], styles.arrow_downward)}>
              Down
            </span>
            <div className={styles.results}>
              <b>{habitatScore}%</b>
              <span className={styles.desc}>Suitable habitat lost in Guinea since 2001</span>
            </div>
          </div>
        </div>
        <div className={styles.metric}>
          <label>Globally</label>
          <div className={styles.score}>
            <span className={cx(styles['material-symbols-outlined'], styles.arrow_upward)}>
              Up
            </span>
            <div className={styles.results}>
              <b>{(globalHabitatScore - 100).toFixed(2)}%</b>
              <span className={styles.desc}>Suitable habitat lost globally since 2001</span>
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
        {habitatTableData.length &&
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th className={cx(styles.textLeft, styles.w28)}>Country</th>
                <th className={cx(styles.textCenter, styles.w14)}>Stewardship</th>
                <th className={cx(styles.textCenter, styles.w14)}>Connectivity Score</th>
                <th className={cx(styles.textCenter, styles.w14)}>Area Score</th>
                <th className={cx(styles.textCenter, styles.w14)}>Total SHS</th>
              </tr>
            </thead>
            <tbody>
              {habitatTableData.map(row => (
                <tr key={row.country} onClick={() => updateCountry({ value: row.country })}
                  className={(selectedCountry === row.country || countryName === row.country) ? styles.highlighted : ''}
                >
                  <td>{row.country}</td>
                  <td className={styles.textCenter}>{row.stewardship.toFixed(2)}%</td>
                  <td className={styles.textCenter}>
                    {(row.countryConnectivityScore * 100).toFixed(2)}
                  </td>
                  <td className={styles.textCenter}>
                    {(row.countryAreaScore * 100).toFixed(2)}
                  </td>
                  <td className={styles.textCenter}>{row.shs.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div >
  )
}

export default HabitatComponent
