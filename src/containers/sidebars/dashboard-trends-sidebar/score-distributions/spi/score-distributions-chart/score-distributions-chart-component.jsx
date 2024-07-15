/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { getCSSVariable } from 'utils/css-utils';

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

import Amphibians from 'images/amphibians.svg';
import Birds from 'images/birds.svg';
import Mammals from 'images/mammals.svg';
import Reptiles from 'images/reptiles.svg';

import styles from './score-distributions-chart-styles.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ScoreDistributionsChartComponent(props) {
  const { countryData, scoreDistributionData } = props;
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

  const [data, setData] = useState();

  const getPercentage = (species) => {
    const { count, total } = scores[species];
    const percent = (count / total) * 100 || 0;
    return [percent, 100 - percent];
  };

  const labels = [
    '0',
    '10',
    '20',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100',
  ];

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

  useEffect(() => {
    if (scoreDistributionData) {
      setData({
        labels,
        datasets: [
          {
            data: scoreDistributionData.map((item) => item[0]),
            backgroundColor: getCSSVariable('birds'),
          },
        ],
      });
    }
  }, [scoreDistributionData]);

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
          color: getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
          display: false,
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
        },
      },
      y: {
        stacked: true,
        display: true,
        title: {
          display: true,
          text: 'Number of Species',
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

  // const labels = [
  //   '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'
  // ];

  // const data = {
  //   labels,
  // datasets: [
  //   {
  //     label: 'Dataset 1',
  //     data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
  //     backgroundColor: getCSSVariable('birds'),
  //     stack: 'Stack 0',
  //   },
  //   {
  //     label: 'Dataset 2',
  //     data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
  //     backgroundColor: getCSSVariable('mammals'),
  //     stack: 'Stack 0',
  //   },
  //   {
  //     label: 'Dataset 3',
  //     data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
  //     backgroundColor: getCSSVariable('reptiles'),
  //     stack: 'Stack 0',
  //   },
  //   {
  //     label: 'Dataset 4',
  //     data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
  //     backgroundColor: getCSSVariable('amphibians'),
  //     stack: 'Stack 0',
  //   },
  // ],
  // };

  const birdData = {
    labels: ['Birds', 'Remaining'],
    datasets: [
      {
        label: '',
        data: getPercentage('birds'),
        backgroundColor: [
          getCSSVariable('birds'),
          getCSSVariable('white-opacity-20'),
        ],
        borderColor: [
          getCSSVariable('birds'),
          getCSSVariable('white-opacity-20'),
        ],
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
        backgroundColor: [
          getCSSVariable('mammals'),
          getCSSVariable('white-opacity-20'),
        ],
        borderColor: [
          getCSSVariable('mammals'),
          getCSSVariable('white-opacity-20'),
        ],
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
        backgroundColor: [
          getCSSVariable('reptiles'),
          getCSSVariable('white-opacity-20'),
        ],
        borderColor: [
          getCSSVariable('reptiles'),
          getCSSVariable('white-opacity-20'),
        ],
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
        backgroundColor: [
          getCSSVariable('amphibians'),
          getCSSVariable('white-opacity-20'),
        ],
        borderColor: [
          getCSSVariable('amphibians'),
          getCSSVariable('white-opacity-20'),
        ],
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

      {data && (
        <div className={styles.chart}>
          <Bar options={options} data={data} />
        </div>
      )}
    </div>
  );
}

export default ScoreDistributionsChartComponent;
