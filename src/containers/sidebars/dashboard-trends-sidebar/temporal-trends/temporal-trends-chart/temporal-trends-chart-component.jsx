import React from 'react';
import { Bubble, Doughnut } from 'react-chartjs-2';
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

import COLORS from 'styles/settings';

import styles from './temporal-trends-chart-styles.module.scss';

ChartJS.register(LinearScale, ArcElement, PointElement, Tooltip, Legend);

function TemporalTrendsChartComponent() {
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

  const doughnutOptions = {
    cutout: '80%',
    radius: '100%',
    rotation: -90,
    responsive: false,
    circumference: 180,
    hoverOffset: 5,
    animation: {
      animateRotate: true,
      animateScale: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },
    },
  };

  const birdData = {
    labels: ['Birds', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [48.55, 51.45],
        backgroundColor: [COLORS['temporal-spi'], COLORS['white-opacity-20']],
        borderColor: [COLORS['temporal-spi'], COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

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
          <div className={styles.spi}>
            <Doughnut
              data={birdData}
              options={doughnutOptions}
              width="125x"
              height="75px"
            />
            <span className={styles.score}>48.55</span>
          </div>
          <b>19.58</b>
          <span>Year</span>
          <span>SPI</span>
          <span>Area Protected</span>
        </div>
        {/* <div className={styles.arcChart}>
          <div className={styles.stats}>
            <b>2024</b>
            <span>Year</span>
          </div>
          <div className={styles.spi}>
            <Doughnut
              data={birdData}
              options={doughnutOptions}
              width="125x"
              height="75px"
            />
            <span className={styles.score}>48.55</span>
          </div>
          <div className={styles.stats}>
            <b>19.58</b>
            <span>Area Protected</span>
          </div>
        </div> */}
      </div>
      <div className={styles.chart}>
        <Bubble options={options} data={data} />
      </div>
    </div>
  );
}

export default TemporalTrendsChartComponent;
