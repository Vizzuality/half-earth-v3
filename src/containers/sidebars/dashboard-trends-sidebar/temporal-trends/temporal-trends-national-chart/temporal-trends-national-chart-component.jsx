import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import COLORS from 'styles/settings';

import styles from './temporal-trends-national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function TemporalTrendsNationalChartComponent(props) {
  const { countryData } = props;
  const blankData = {
    labels: ['Global SPI', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [COLORS['temporal-spi'], COLORS['white-opacity-20']],
        borderColor: [COLORS['temporal-spi'], COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };
  const [spiData, setSpiData] = useState(blankData);

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
          color: COLORS.white,
        },
        grid: {
          color: COLORS['oslo-gray'],
        },
        ticks: {
          color: COLORS['oslo-gray'],
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: 'SPI / Percent of Area Protected',
          color: COLORS.white,
        },
        grid: {
          color: COLORS['oslo-gray'],
        },
        ticks: {
          color: COLORS['oslo-gray'],
        },
      },
    },
  };

  const data = {
    labels: [
      '1980',
      '1985',
      '1990',
      '1995',
      '2000',
      '2005',
      '2010',
      '2015',
      '2020',
      '2025',
    ],
    datasets: [
      {
        label: 'SPI',
        data: [20, 20, 20, 30, 30, 38, 38, 43, 45, 60],
        borderColor: COLORS.birds,
      },
      {
        label: 'Area protected',
        data: [10, 10, 10, 14, 15, 18, 25, 28, 30, 50],
        borderColor: COLORS.mammals,
      },
    ],
  };

  useEffect(() => {
    if (countryData) {
      const spi = {
        labels: ['Global SPI', 'Remaining'],
        datasets: [
          {
            label: '',
            data: [
              countryData.Global_SPI_ter,
              100 - countryData.Global_SPI_ter,
            ],
            backgroundColor: [
              COLORS['temporal-spi'],
              COLORS['white-opacity-20'],
            ],
            borderColor: [COLORS['temporal-spi'], COLORS['white-opacity-20']],
            borderWidth: 1,
          },
        ],
      };

      setSpiData(spi);
    }
  }, [countryData]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.arcGrid}>
          <b>2024</b>
          <SpiArcChartComponent
            width="125x"
            height="75px"
            data={spiData}
            value={countryData?.Global_SPI_ter}
          />
          <SpiArcChartComponent
            width="125x"
            height="75px"
            data={spiData}
            value={countryData?.Global_SPI_ter}
          />
          <b>{countryData?.prop_protected_ter}</b>
          <span>Year</span>
          <span>SPI</span>
          <span>Area Protected</span>
          <span>Global Ranking</span>
        </div>
      </div>
      <div className={styles.chart}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default TemporalTrendsNationalChartComponent;
