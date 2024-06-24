import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import COLORS from 'styles/settings';

import Amphibians from 'images/amphibians.svg';
import Birds from 'images/birds.svg';
import Mammals from 'images/mammals.svg';
import Reptiles from 'images/reptiles.svg';

import styles from './score-distribution-styles.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ScoreDistributionChartComponent() {
  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        display: true,
        title: {
          display: true,
          text: 'Protection Score',
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
        stacked: true,
        display: true,
        title: {
          display: true,
          text: 'Number of Species',
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

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        backgroundColor: COLORS.primary,
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        backgroundColor: COLORS.tango,
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 3',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        backgroundColor: COLORS['medium-purple'],
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 4',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        backgroundColor: COLORS['french-rose'],
        stack: 'Stack 0',
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
        data: [69.87, 30.13],
        backgroundColor: [COLORS.primary, COLORS['white-opacity-20']],
        borderColor: [COLORS.primary, COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  const mammalsData = {
    labels: ['Mammals', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [60.98, 39.02],
        backgroundColor: [COLORS.tango, COLORS['white-opacity-20']],
        borderColor: [COLORS.tango, COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  const reptilesData = {
    labels: ['Reptiles', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [63.45, 36.55],
        backgroundColor: [COLORS['medium-purple'], COLORS['white-opacity-20']],
        borderColor: [COLORS['medium-purple'], COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  const amphibianData = {
    labels: ['Amphibians', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [49.02, 49.98],
        backgroundColor: [COLORS['french-rose'], COLORS['white-opacity-20']],
        borderColor: [COLORS['french-rose'], COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  const areaChartHeight = 100;
  const areaChartWidth = 120;

  return (
    <div className={styles.container}>
      <div className={styles.title}>NATIONAL SPI BY TAXONOMIC GROUP</div>
      <div className={styles.spis}>
        <div className={styles.spi}>
          <span className={styles.score}>69.87</span>
          <Doughnut
            data={birdData}
            options={doughnutOptions}
            width={areaChartWidth}
            height={areaChartHeight}
          />
          <div className={styles.taxoGroup}>
            <img src={Birds} width={40} height={40} alt="Birds" />
            <div className={styles.richness}>Species Richness:</div>
            <div className={styles.score}>1058 Birds</div>
          </div>
        </div>
        <div className={styles.spi}>
          <span className={styles.score}>60.98</span>
          <Doughnut
            data={mammalsData}
            options={doughnutOptions}
            width={areaChartWidth}
            height={areaChartHeight}
          />
          <div className={styles.taxoGroup}>
            <img src={Mammals} width={40} height={40} alt="Mammals" />
            <div className={styles.richness}>Species Richness:</div>
            <div className={styles.score}>498 Mammals</div>
          </div>
        </div>
        <div className={styles.spi}>
          <span className={styles.score}>63.45</span>
          <Doughnut
            data={reptilesData}
            options={doughnutOptions}
            width={areaChartWidth}
            height={areaChartHeight}
          />
          <div className={styles.taxoGroup}>
            <img src={Reptiles} width={40} height={40} alt="Reptiles" />
            <div className={styles.richness}>Species Richness:</div>
            <div className={styles.score}>362 Reptiles</div>
          </div>
        </div>
        <div className={styles.spi}>
          <span className={styles.score}>49.02</span>
          <Doughnut
            data={amphibianData}
            options={doughnutOptions}
            width={areaChartWidth}
            height={areaChartHeight}
          />
          <div className={styles.taxoGroup}>
            <img src={Amphibians} width={40} height={40} alt="Amphibians" />
            <div className={styles.richness}>Species Richness:</div>
            <div className={styles.score}>228 Amphibians</div>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default ScoreDistributionChartComponent;
