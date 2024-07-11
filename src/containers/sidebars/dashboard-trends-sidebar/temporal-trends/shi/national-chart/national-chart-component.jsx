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

import { getCSSVariable } from 'utils/css-utils';

import styles from './national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function NationalChartComponent(props) {
  const { countryData, nationalChartData } = props;
  const [data, setData] = useState();
  const [areaProtected, setAreaProtected] = useState(0);
  const [spiValue, setSpiValue] = useState(0);

  const blankData = {
    labels: ['Global SPI', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [getCSSVariable('temporal-spi'), getCSSVariable('white-opacity-20')],
        borderColor: [getCSSVariable('temporal-spi'), getCSSVariable('white-opacity-20')],
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
          color: getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
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
        },
      },
    },
  };

  // useEffect(() => {
  //   console.log(countryData)
  //   if (countryData) {
  //     const spi = {
  //       labels: ['Global SPI', 'Remaining'],
  //       datasets: [
  //         {
  //           label: '',
  //           data: [
  //             countryData.Global_SPI_ter,
  //             100 - countryData.Global_SPI_ter,
  //           ],
  //           backgroundColor: [
  //             getCSSVariable('temporal-spi'),
  //             getCSSVariable('white-opacity-20'),
  //           ],
  //           borderColor: [getCSSVariable('temporal-spi'), getCSSVariable('white-opacity-20')],
  //           borderWidth: 1,
  //         },
  //       ],
  //     };

  //     setSpiData(spi);
  //   }
  // }, [countryData]);

  useEffect(() => {
    if (nationalChartData.area_values.length) {
      console.log(nationalChartData);
      setData({
        labels: nationalChartData.spi_values.map(item => item[0]),
        datasets: [
          {
            label: 'SHI',
            data: nationalChartData.spi_values.map(item => item[1]),
            borderColor: getCSSVariable('birds'),
          },
          {
            label: 'Area protected',
            data: nationalChartData.area_values.map(item => item[1]),
            borderColor: getCSSVariable('mammals'),
          },
        ],
      });
      const spiVal = nationalChartData.spi_values[nationalChartData.spi_values.length - 1][1];

      const spi = {
        labels: ['Global SPI', 'Remaining'],
        datasets: [
          {
            label: '',
            data: [
              spiVal,
              100 - spiVal,
            ],
            backgroundColor: [
              getCSSVariable('temporal-spi'),
              getCSSVariable('white-opacity-20'),
            ],
            borderColor: [getCSSVariable('temporal-spi'), getCSSVariable('white-opacity-20')],
            borderWidth: 1,
          },
        ],
      };


      setSpiValue(spiVal);
      setSpiData(spi);
    }
  }, [nationalChartData])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.arcGrid}>
          <b>2024</b>
          <b>98.37</b>
          <SpiArcChartComponent
            width="125x"
            height="75px"
            data={spiData}
            value={spiValue}
          />
          <b>98.88</b>
          <b>{countryData?.prop_protected_ter}</b>
          <span>Year</span>
          <span>Area Score</span>
          <span>SHI</span>
          <span>Connectivity Score</span>
          <span>Global Ranking</span>
        </div>
      </div>
      {data && <div className={styles.chart}>
        <Line options={options} data={data} />
      </div>}
    </div>
  );
}

export default NationalChartComponent;
