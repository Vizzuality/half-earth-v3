import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import Select from 'react-select';

import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import COLORS from 'styles/settings';

import styles from './temporal-trends-province-chart-styles.module.scss';

ChartJS.register(LinearScale, ArcElement, PointElement, Tooltip, Legend);

function TemporalTrendsProvinceChartComponent(props) {
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

  const provinces = [
    { value: 'Bas-Uélé', label: 'Bas-Uélé' },
    { value: 'Haut-Uélé', label: 'Haut-Uélé' },
    { value: 'Ituri', label: 'Ituri' },
    { value: 'Bas-Congo', label: 'Bas-Congo' },
    { value: 'Équateur', label: 'Équateur' },
    { value: 'Haut-Lomami', label: 'Haut-Lomami' },
    { value: 'Haut-Katanga', label: 'Haut-Katanga' },
    { value: 'Haut-Kasaï', label: 'Haut-Kasaï' },
    { value: 'Kwango', label: 'Kwango' },
    { value: 'Kwilu', label: 'Kwilu' },
    { value: 'Lomami', label: 'Lomami' },
    { value: 'Lualaba', label: 'Lualaba' },
    { value: 'Mai-Ndombe', label: 'Mai-Ndombe' },
    { value: 'Maniema', label: 'Maniema' },
    { value: 'Mongala', label: 'Mongala' },
    { value: 'Nord-Kivu', label: 'Nord-Kivu' },
    { value: 'Nord-Ubangi', label: 'Nord-Ubangi' },
    { value: 'Sankuru', label: 'Sankuru' },
    { value: 'Sud-Kivu', label: 'Sud-Kivu' },
    { value: 'Sud-Ubangi', label: 'Sud-Ubangi' },
    { value: 'Tanganyika', label: 'Tanganyika' },
    { value: 'Tshopo', label: 'Tshopo' },
    { value: 'Tshuapa', label: 'Tshuapa' },
    { value: 'Kinshasa', label: 'Kinshasa' },
    { value: 'Kasaï Central', label: 'Kasaï Central' },
    { value: 'Kasaï Oriental', label: 'Kasaï Oriental' },
  ];

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
          text: 'Total Area (1000 km2)',
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
          text: 'Species Protection Index',
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
    datasets: [
      {
        label: 'Birds',
        data: Array.from({ length: 5 }, () => ({
          x: faker.datatype.number({ min: 0, max: 200 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: COLORS.birds,
      },
      {
        label: 'Mammals',
        data: Array.from({ length: 5 }, () => ({
          x: faker.datatype.number({ min: 0, max: 200 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: COLORS.mammals,
      },
      {
        label: 'Reptiles',
        data: Array.from({ length: 5 }, () => ({
          x: faker.datatype.number({ min: 0, max: 200 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: COLORS.reptiles,
      },
      {
        label: 'Amphibians',
        data: Array.from({ length: 5 }, () => ({
          x: faker.datatype.number({ min: 0, max: 200 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: COLORS.amphibians,
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
        <div className={styles.specs}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={provinces[0]}
            isClearable
            isSearchable
            name="provinces"
            options={provinces}
          />
          <span>
            <b>#13</b> in Species Protection Index
          </span>
          <span>
            <b>#1</b> in vertebrate species richness
          </span>
          <span>
            <b>#16</b> in size
          </span>
        </div>
        <div className={styles.arcGrid}>
          <b>2024</b>
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
        </div>
      </div>
      <div className={styles.chart}>
        <Bubble options={options} data={data} />
      </div>
    </div>
  );
}

export default TemporalTrendsProvinceChartComponent;
