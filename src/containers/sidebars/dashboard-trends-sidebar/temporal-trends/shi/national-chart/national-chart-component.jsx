import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import styles from './national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function NationalChartComponent(props) {
  const { countryData, nationalChartData, chartData } = props;
  const [data, setData] = useState();
  const [shiValue, setShiValue] = useState(0);
  const [nationalScores, setNationalScores] = useState({ areaScore: 0, connecivityScore: 0, year: 2001 })

  const blankData = {
    labels: ['Global SPI', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [
          getCSSVariable('temporal-spi'),
          getCSSVariable('white-opacity-20'),
        ],
        borderColor: [
          getCSSVariable('temporal-spi'),
          getCSSVariable('white-opacity-20'),
        ],
        borderWidth: 1,
      },
    ],
  };
  const [shiData, setShiData] = useState(blankData);

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
          color: getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          maxTicksLimit: 8
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: 'Species Habitat Index',
          color: getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          maxTicksLimit: 4
        },
      },
    },
  };


  useEffect(() => {
    if (nationalChartData.area_values.length) {
      const shiVal = (nationalScores.areaScore + nationalScores.connecivityScore) / 2;

      const shi = {
        labels: ['Global SHI', 'Remaining'],
        datasets: [
          {
            label: '',
            data: [shiVal, 100 - shiVal],
            backgroundColor: [
              getCSSVariable('temporal-spi'),
              getCSSVariable('white-opacity-20'),
            ],
            borderColor: [
              getCSSVariable('temporal-spi'),
              getCSSVariable('white-opacity-20'),
            ],
            borderWidth: 1,
          },
        ],
      };

      setShiValue(shiVal);
      setShiData(shi);
    }
  }, [nationalChartData]);

  useEffect(() => {
    if (chartData) {
      setData({
        labels: chartData.map((item) => item.year),
        datasets: [
          {
            label: 'Average Area Score',
            data: chartData.map((item) => item.avg_area),
            borderColor: getCSSVariable('birds'),
          },
          {
            label: 'Average Connectivity Score',
            data: chartData.map((item) => item.avg_conn),
            borderColor: getCSSVariable('mammals'),
          },
          {
            label: 'Average Habitat Score',
            data: chartData.map((item) => (item.avg_area + item.avg_conn) / 2),
            borderColor: getCSSVariable('reptiles'),
          },
        ],
      });

      const lastValues = chartData[chartData.length - 1];
      setNationalScores({
        areaScore: lastValues.avg_area,
        connecivityScore: lastValues.avg_conn,
        year: lastValues.year
      });
    }

  }, [chartData])


  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.arcGrid}>
          <b>{nationalScores.year}</b>
          <b>{nationalScores.areaScore}</b>
          <SpiArcChartComponent
            width="125x"
            height="75px"
            data={shiData}
            value={shiValue}
          />
          <b>{nationalScores.connecivityScore}</b>
          <b>{countryData?.prop_protected_ter}</b>
          <span>Year</span>
          <span>Area Score</span>
          <span>SHI</span>
          <span>Connectivity Score</span>
          <span>Global Ranking</span>
        </div>
      </div>
      {data && (
        <div className={styles.chart}>
          <Line options={options} data={data} />
        </div>
      )}
    </div>
  );
}

export default NationalChartComponent;
