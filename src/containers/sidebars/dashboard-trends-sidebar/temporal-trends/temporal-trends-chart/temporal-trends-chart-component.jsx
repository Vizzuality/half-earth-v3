import React from 'react';
import { Bubble } from 'react-chartjs-2';
import Select from 'react-select';

import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

import ArcChart from 'components/charts/arc-chart';

import COLORS from 'styles/settings';

import styles from './temporal-trends-chart-styles.module.scss';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function TemporalTrendsChartComponent() {
  const areaChartHeight = 100;
  const areaChartWidth = 220;
  const spi = 48.55;

  const provinces = [
    { value: 'Mai-Ndombe', label: 'Mai-Ndombe' },
    { value: 'Équateur', label: 'Équateur' },
    { value: 'Kasaï', label: 'Kasaï' },
    { value: 'Sankuru', label: 'Sankuru' },
  ];

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Red dataset',
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Blue dataset',
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
          <div
            style={{
              height: areaChartHeight,
              width: areaChartWidth,
            }}
          >
            <ArcChart
              color={COLORS.primary}
              parentHeight={areaChartHeight}
              parentWidth={areaChartWidth}
              value={spi}
            />
          </div>
          <div className={styles.stats}>
            <b>19.58</b>
            <span>Area Protected</span>
          </div>
        </div>
      </div>
      <Bubble options={options} data={data} />
    </div>
  );
}

export default TemporalTrendsChartComponent;
