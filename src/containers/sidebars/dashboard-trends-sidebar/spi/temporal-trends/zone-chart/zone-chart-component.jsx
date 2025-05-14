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

  const getLineColor = (item) => {
    const lineColors = [
      {
        iso3: 'MEX',
        region_key: '9',
        color: getCSSVariable('mexico-landscape'),
      },
      {
        iso3: 'MEX',
        region_key: '6',
        color: getCSSVariable('mexico-connectivity'),
      },
      {
        iso3: 'MEX',
        region_key: '11',
        color: getCSSVariable('mexico-pfp-vive'),
      },
      {
        iso3: 'PER',
        region_key: '10',
        color: getCSSVariable('peru-landscape'),
      },
      { iso3: 'PER', region_key: '4', color: getCSSVariable('peru-forest') },
      { iso3: 'PER', region_key: '2', color: getCSSVariable('peru-cattle') },
      {
        iso3: 'PER',
        region_key: '12',
        color: getCSSVariable('peru-reforestation'),
      },
      {
        iso3: 'BRA',
        region_key: '1',
        color: getCSSVariable('brazil-landscape'),
      },
      { iso3: 'BRA', region_key: '13', color: getCSSVariable('brazil-serra') },
      {
        iso3: 'BRA',
        region_key: '14',
        color: getCSSVariable('brazil-upper-parana'),
      },
      { iso3: 'BRA', region_key: '3', color: getCSSVariable('brazil-forest') },
      {
        iso3: 'MDG',
        region_key: '7',
        color: getCSSVariable('madagascar-landscape'),
      },
      {
        iso3: 'MDG',
        region_key: '8',
        color: getCSSVariable('madagascar-mangroves'),
      },
      {
        iso3: 'MDG',
        region_key: '5',
        color: getCSSVariable('madagascar-forest'),
      },
      {
        iso3: 'VNM',
        region_key: '15',
        color: getCSSVariable('vietnam-landscape'),
      },
    ];
    return (
      lineColors.find(
        (color) =>
          color.iso3 === item.iso3 && color.region_key === item.region_key
      )?.color || getCSSVariable('oslo-gray')
    );
  };

  const loadChartData = () => {
    let chartData;
    if (countryISO === 'EE') {
      if (clickedRegion) {
        const iso3 = zone === clickedRegion.iso3 ? zone : clickedRegion.iso3;
        chartData = zoneData.filter(
          (item) =>
            item.iso3 === iso3 && item.region_key === clickedRegion.region_key
        );
      } else if (zone === 'LND' || zone === 'INT') {
        chartData = zoneData;
      } else {
        chartData = zoneData?.filter((item) => item.iso3 === zone);
      }
    } else {
      const zoneName = zone === 'ZONE_3' ? 'ACC_3' : 'ACC_5';
      chartData = zoneData.filter((item) => item.region_key.includes(zoneName));
    }

    const datasets = [];

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
          borderColor: getLineColor(item),
        });
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
  }, [activeTrend, clickedRegion, zoneData]);

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
