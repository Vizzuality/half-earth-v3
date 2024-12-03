import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import cx from 'classnames';
import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Loading } from 'he-components';
import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import styles from './national-chart-styles.module.scss';
import { LightModeContext } from '../../../../../../context/light-mode';
import { useT } from '@transifex/react';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function NationalChartComponent(props) {
  const t = useT();
  const { countryData, chartData } = props;
  const { lightMode } = useContext(LightModeContext);
  const [data, setData] = useState();
  const [shiValue, setShiValue] = useState(0);
  const [nationalScores, setNationalScores] = useState({ areaScore: 0, connecivityScore: 0, year: 2001 })
  const emptyArcColor = lightMode ? getCSSVariable('dark-opacity') : getCSSVariable('white-opacity-20');
  const blankData = {
    labels: ['Global SPI', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [
          getCSSVariable('temporal-spi'),
          emptyArcColor,
        ],
        borderColor: [
          getCSSVariable('temporal-spi'),
          emptyArcColor,
        ],
        borderWidth: 1,
      },
    ],
  };
  const [shiData, setShiData] = useState(blankData);
  const [isLoading, setIsLoading] = useState(true);

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
          text: 'Year',
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          maxTicksLimit: 8
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: 'Species Habitat Index',
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          maxTicksLimit: 4
        },
      },
    },
  };

  useEffect(() => {
    if (!chartData.length) return;

    setData({
      labels: chartData.map((item) => item.year),
      datasets: [
        {
          label: t('Average Area Score'),
          data: chartData.map((item) => item.avg_area),
          borderColor: getCSSVariable('birds'),
        },
        {
          label: t('Average Connectivity Score'),
          data: chartData.map((item) => item.avg_conn),
          borderColor: getCSSVariable('mammals'),
        },
        {
          label: t('Average Habitat Score'),
          data: chartData.map((item) => (item.avg_area + item.avg_conn) / 2),
          borderColor: getCSSVariable('reptiles'),
        },
      ],
    });

    const lastValues = chartData[chartData.length - 1];
    setNationalScores({
      areaScore: lastValues.avg_area,
      connecivityScore: lastValues.avg_conn,
      year: lastValues.year
    });

    const shiVal = (lastValues.avg_area + lastValues.avg_conn) / 2;

    const shi = {
      labels: [t('Global SHI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [shiVal, 100 - shiVal],
          backgroundColor: [
            getCSSVariable('temporal-spi'),
            emptyArcColor,
          ],
          borderColor: [
            getCSSVariable('temporal-spi'),
            emptyArcColor,
          ],
          borderWidth: 1,
        },
      ],
    };

    setShiValue(shiVal);
    setShiData(shi);
    setIsLoading(false);

  }, [chartData])


  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading && <>
        <div className={styles.info}>
          <div className={styles.arcGrid}>
            <div className={styles.values}>
              <b>{nationalScores.year}</b>
              <span>{t('Year')}</span>
            </div>
            <div className={styles.values}>
              <b>{nationalScores.areaScore}</b>
              <span>{t('Area Score')}</span>
            </div>
            <SpiArcChartComponent
              width="125x"
              height="75px"
              data={shiData}
              value={shiValue}
            />
            <div className={styles.values}>
              <b>{nationalScores.connecivityScore}</b>
              <span>{t('Connectivity Score')}</span>
            </div>
            <div className={styles.values}>
              <b>{countryData?.prop_protected_ter}</b>
              <span>{t('Global Ranking')}</span>
            </div>
            <span></span>
            <span></span>
            <span>{t('SHI')}</span>
          </div>
        </div>
        {data && (
          <div className={styles.chart}>
            <Line options={options} data={data} />
          </div>
        )}
      </>}
    </div >
  );
}

export default NationalChartComponent;
