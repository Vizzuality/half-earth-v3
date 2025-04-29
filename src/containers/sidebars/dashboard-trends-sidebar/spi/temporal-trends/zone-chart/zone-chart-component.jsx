import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { useLocale, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';

import styles from './zone-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function ZoneChartComponent(props) {
  const t = useT();
  const locale = useLocale();
  const { lightMode } = useContext(LightModeContext);
  const {
    zone,
    zoneData,
    setSelectedProvince,
    clickedRegion,
    countryISO,
    activeTrend,
  } = props;
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
          text: t('Year'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
        },
      },
      y: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: t('SPI'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
          font: {
            size: 14,
            weight: 'bold',
          },
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

  const [chartInfo, setChartInfo] = useState('');
  const [data, setData] = useState();

  const loadChartData = () => {
    let chartData;
    if (countryISO === 'EEWWF') {
      if (clickedRegion) {
        const iso3 = zone === clickedRegion.iso3 ? zone : clickedRegion.iso3;
        chartData = zoneData.filter(
          (item) =>
            item.iso3 === iso3 && item.region_key === clickedRegion.region_key
        );
      } else {
        chartData = zoneData.filter((item) => item.iso3 === zone);
      }
    } else {
      const zoneName = zone === 'ZONE_3' ? 'ACC_3' : 'ACC_5';
      chartData = zoneData.filter((item) => item.region_key.includes(zoneName));
    }

    const datasets = [];

    const lineColors = [
      getCSSVariable('area-protected'),
      getCSSVariable('bubble'),
      getCSSVariable('birds'),
      getCSSVariable('mammals'),
      getCSSVariable('reptiles'),
      getCSSVariable('amphibians'),
      getCSSVariable('bubble-selected'),
      getCSSVariable('firefly'),
      getCSSVariable('medium-purple'),
    ];

    chartData.forEach((item) => {
      const existingDataset = datasets.find(
        (dataset) => dataset.label === item.name
      );
      if (existingDataset) {
        existingDataset.data.push(parseFloat((item.spi * 100).toFixed(1)));
      } else {
        datasets.push({
          label: item.name,
          data: [parseFloat((item.spi * 100).toFixed(1))],
          borderColor: lineColors[0],
        });

        lineColors.shift();
      }
    });

    const labels = Array.from(new Set(chartData.map((item) => item.year)));

    setData({
      labels,
      datasets,
    });
  };

  useEffect(() => {
    if (clickedRegion) {
      setSelectedProvince(clickedRegion);
    }
  }, [clickedRegion]);

  useEffect(() => {
    loadChartData();
  }, [activeTrend, clickedRegion]);

  useEffect(() => {
    loadChartData();
  }, []);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {data && (
        <div className={styles.chart}>
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Line options={options} data={data} />
          </ChartInfoComponent>
        </div>
      )}
    </div>
  );
}

export default ZoneChartComponent;
