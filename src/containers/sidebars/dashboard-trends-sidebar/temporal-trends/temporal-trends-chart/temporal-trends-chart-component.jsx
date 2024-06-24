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
    { value: 'Mai-Ndombe', label: 'Mai-Ndombe' },
    { value: 'Équateur', label: 'Équateur' },
    { value: 'Kasaï', label: 'Kasaï' },
    { value: 'Sankuru', label: 'Sankuru' },
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
          color: COLORS['oslo-gray'],
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
          color: COLORS['oslo-gray'],
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
        backgroundColor: COLORS.primary,
      },
      {
        label: 'Mammals',
        data: Array.from({ length: 5 }, () => ({
          x: faker.datatype.number({ min: 0, max: 200 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: COLORS.tango,
      },
      {
        label: 'Reptiles',
        data: Array.from({ length: 5 }, () => ({
          x: faker.datatype.number({ min: 0, max: 200 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: COLORS['medium-purple'],
      },
      {
        label: 'Amphibians',
        data: Array.from({ length: 5 }, () => ({
          x: faker.datatype.number({ min: 0, max: 200 }),
          y: faker.datatype.number({ min: 0, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: COLORS['french-rose'],
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
        data: [49, 51],
        backgroundColor: [COLORS.primary, COLORS['white-opacity-20']],
        borderColor: [COLORS.primary, COLORS['white-opacity-20']],
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
        <div className={styles.arcChart}>
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
            <span className={styles.score}>49</span>
          </div>
          <div className={styles.stats}>
            <b>19.58</b>
            <span>Area Protected</span>
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <Bubble options={options} data={data} />
      </div>
    </div>
  );
}

export default TemporalTrendsChartComponent;
