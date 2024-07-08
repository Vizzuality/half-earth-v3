/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

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

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import COLORS from 'styles/settings';

import Amphibians from 'images/amphibians.svg';
import Birds from 'images/birds.svg';
import Mammals from 'images/mammals.svg';
import Reptiles from 'images/reptiles.svg';

import styles from './score-distribution-chart-styles.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ScoreDistributionChartComponent(props) {
  const { countryData } = props;
  const [scores, setScores] = useState({
    birds: {
      count: 0,
      total: 0,
      percentage: 0,
    },
    mammals: {
      count: 0,
      total: 0,
      percentage: 0,
    },
    reptiles: {
      count: 0,
      total: 0,
      percentage: 0,
    },
    amphibians: {
      count: 0,
      total: 0,
      percentage: 0,
    },
  });

  const getPercentage = (species) => {
    const { count, total } = scores[species];
    const percent = (count / total) * 100 || 0;
    return [percent, 100 - percent];
  };

  useEffect(() => {
    if (countryData) {
      const {
        endemic_birds,
        birds,
        endemic_mammals,
        mammals,
        endemic_reptiles,
        reptiles,
        endemic_amphibians,
        amphibians,
      } = countryData;

      setScores({
        birds: {
          count: endemic_birds,
          total: birds,
        },
        mammals: {
          count: endemic_mammals,
          total: mammals,
        },
        reptiles: {
          count: endemic_reptiles,
          total: reptiles,
        },
        amphibians: {
          count: endemic_amphibians,
          total: amphibians,
        },
      });
    }
  }, [countryData]);

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
          color: COLORS.white,
        },
        grid: {
          color: COLORS['oslo-gray'],
          display: false,
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
        backgroundColor: COLORS.birds,
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        backgroundColor: COLORS.mammals,
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 3',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        backgroundColor: COLORS.reptiles,
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 4',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        backgroundColor: COLORS.amphibians,
        stack: 'Stack 0',
      },
    ],
  };

  const birdData = {
    labels: ['Birds', 'Remaining'],
    datasets: [
      {
        label: '',
        data: getPercentage('birds'),
        backgroundColor: [COLORS.birds, COLORS['white-opacity-20']],
        borderColor: [COLORS.birds, COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  const mammalsData = {
    labels: ['Mammals', 'Remaining'],
    datasets: [
      {
        label: '',
        data: getPercentage('mammals'),
        backgroundColor: [COLORS.mammals, COLORS['white-opacity-20']],
        borderColor: [COLORS.mammals, COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  const reptilesData = {
    labels: ['Reptiles', 'Remaining'],
    datasets: [
      {
        label: '',
        data: getPercentage('reptiles'),
        backgroundColor: [COLORS.reptiles, COLORS['white-opacity-20']],
        borderColor: [COLORS.reptiles, COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  const amphibianData = {
    labels: ['Amphibians', 'Remaining'],
    datasets: [
      {
        label: '',
        data: getPercentage('amphibians'),
        backgroundColor: [COLORS.amphibians, COLORS['white-opacity-20']],
        borderColor: [COLORS.amphibians, COLORS['white-opacity-20']],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>NATIONAL SPI BY TAXONOMIC GROUP</div>
      <div className={styles.spis}>
        <SpiArcChartComponent
          scores={scores}
          data={birdData}
          img={Birds}
          species="birds"
        />

        <SpiArcChartComponent
          scores={scores}
          data={mammalsData}
          img={Mammals}
          species="mammals"
        />

        <SpiArcChartComponent
          scores={scores}
          data={reptilesData}
          img={Reptiles}
          species="reptiles"
        />

        <SpiArcChartComponent
          scores={scores}
          data={amphibianData}
          img={Amphibians}
          species="amphibians"
        />
      </div>

      <div className={styles.chart}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default ScoreDistributionChartComponent;
