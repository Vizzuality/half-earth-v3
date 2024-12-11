/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { useT } from '@transifex/react';

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
import { Loading } from 'he-components';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import { LightModeContext } from '../../../../../../context/light-mode';
import { SHI_LATEST_YEAR } from '../../../../../../utils/dashboard-utils';

import styles from './national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function NationalChartComponent(props) {
  const t = useT();
  const { countryData, chartData } = props;
  const { lightMode } = useContext(LightModeContext);
  const [data, setData] = useState();
  const [shiValue, setShiValue] = useState(0);
  const [nationalScores, setNationalScores] = useState({
    areaScore: 0,
    connecivityScore: 0,
    year: 2001,
  });
  const emptyArcColor = lightMode
    ? getCSSVariable('dark-opacity')
    : getCSSVariable('white-opacity-20');
  const blankData = {
    labels: ['Global SPI', 'Remaining'],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [getCSSVariable('temporal-spi'), emptyArcColor],
        borderColor: [getCSSVariable('temporal-spi'), emptyArcColor],
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
          maxTicksLimit: 8,
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
          maxTicksLimit: 4,
        },
      },
    },
  };

  useEffect(() => {
    if (!countryData.length) return;

    setData({
      labels: countryData.map((item) => item.Year),
      datasets: [
        {
          label: t('Average Area Score'),
          data: countryData.map((item) => item.SHI_AreaScore),
          borderColor: getCSSVariable('birds'),
        },
        {
          label: t('Average Connectivity Score'),
          data: countryData.map((item) => item.SHI_AvgConnectivityScore),
          borderColor: getCSSVariable('mammals'),
        },
        {
          label: t('Average Habitat Score'),
          data: countryData.map((item) => item.SHI_AvgHabitatScore),
          borderColor: getCSSVariable('reptiles'),
        },
      ],
    });

    const headerValues = countryData.find(
      (item) => item.Year === SHI_LATEST_YEAR
    );
    const { SHI_AreaScore, SHI_AvgConnectivityScore, SHI_GlobalRanking, SHI } =
      headerValues;

    setNationalScores({
      areaScore: parseFloat(SHI_AreaScore).toFixed(1),
      connecivityScore: parseFloat(SHI_AvgConnectivityScore).toFixed(1),
      year: SHI_LATEST_YEAR,
      globalRanking: SHI_GlobalRanking,
    });

    const shi = {
      labels: [t('Global SHI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [SHI, 100 - SHI],
          backgroundColor: [getCSSVariable('temporal-spi'), emptyArcColor],
          borderColor: [getCSSVariable('temporal-spi'), emptyArcColor],
          borderWidth: 1,
        },
      ],
    };

    setShiValue(parseFloat(SHI));
    setShiData(shi);
    setIsLoading(false);
  }, [chartData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading && (
        <>
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
                <b>{nationalScores.globalRanking}</b>
                <span>{t('Global Ranking')}</span>
              </div>
              <span />
              <span />
              <span>{t('SHI')}</span>
            </div>
          </div>
          {data && (
            <div className={styles.chart}>
              <Line options={options} data={data} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NationalChartComponent;
