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

import styles from './distributions-chart-styles.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DistributionsChartComponent(props) {
  const { countryData, scoreDistributionData, chartData, chartType } = props;
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

  useEffect(() => {
    if (chartData) {

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
  }, [chartData]);

  useEffect(() => {
    if (chartData) {
      const ampSet = getHistogramData('AMPHIBIA');
      const mamSet = getHistogramData('MAMMALIA');
      const repSet = getHistogramData('REPTILIA');
      const birdSet = getHistogramData('AVES');

      const taxaSet = {};

      chartData.forEach(a => {
        let floorScore;
        if (chartType === 'area') {
          floorScore = Math.floor(a.area_score);
        } else if (chartType === 'habitat score') {
          floorScore = Math.floor((a.area_score + a.connectivity_score) / 2);
        } else if (chartType === 'connectivity') {
          floorScore = Math.floor(a.connectivity_score);
        }

        if (!taxaSet.hasOwnProperty(floorScore)) {
          taxaSet[floorScore] = 1;
        } else {
          taxaSet[floorScore] += 1;
        }
      });

      setData({
        datasets: [
          // {
          //   label: '# of occurance',
          //   data: ampSet,
          //   backgroundColor: getCSSVariable('amphibians'),
          //   stack: 'Stack 0',
          //   barPercentage: 1,
          // },
          // {
          //   label: '# of occurance',
          //   data: mamSet,
          //   backgroundColor: getCSSVariable('mammals'),
          //   stack: 'Stack 0',
          //   barPercentage: 1,
          // },
          // {
          //   label: '# of occurance',
          //   data: repSet,
          //   backgroundColor: getCSSVariable('reptiles'),
          //   stack: 'Stack 0',
          //   barPercentage: 1,
          // },
          // {
          //   label: '# of occurance',
          //   data: birdSet,
          //   backgroundColor: getCSSVariable('birds'),
          //   stack: 'Stack 0',
          //   barPercentage: 1,
          // },
          {
            label: '# of occurance',
            data: taxaSet,
            backgroundColor: getCSSVariable('birds'),
            stack: 'Stack 0',
            barPercentage: 1,
          },
        ],
      });
    }
  }, [chartData, chartType]);

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
        type: 'linear',
        offset: false,
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
          offset: false,
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          stepSize: 25,
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
          stepSize: 10,
        },
      },
    },
  };

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

  const getHistogramData = (taxa) => {
    const taxaGroup = chartData.filter(item => item.taxa === taxa);
    const taxaSet = {};

    taxaGroup.forEach(a => {
      const floorScore = Math.floor(a.area_score);
      if (!taxaSet.hasOwnProperty(floorScore)) {
        taxaSet[floorScore] = 1;
      } else {
        taxaSet[floorScore] += 1;
      }
    });
    return taxaSet;
  }

  return (
    <div className={styles.container}>
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

export default DistributionsChartComponent;
