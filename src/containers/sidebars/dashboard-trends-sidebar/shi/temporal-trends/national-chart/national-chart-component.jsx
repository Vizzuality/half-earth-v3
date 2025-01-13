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
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import { SHI_LATEST_YEAR } from 'constants/dashboard-constants.js';

import SHILegend from '../../../../../../assets/images/dashboard/shi_legend.png';

import styles from './national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function NationalChartComponent(props) {
  const t = useT();
  const { countryData } = props;
  const { lightMode } = useContext(LightModeContext);
  const [data, setData] = useState();
  const [shiValue, setShiValue] = useState(0);
  const [nationalScores, setNationalScores] = useState({
    areaScore: 0,
    connecivityScore: 0,
    year: SHI_LATEST_YEAR,
  });
  const emptyArcColor = lightMode
    ? getCSSVariable('dark-opacity')
    : getCSSVariable('white-opacity-20');
  const blankData = {
    labels: [t('Global SPI'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [getCSSVariable('habitat'), emptyArcColor],
        borderColor: [getCSSVariable('habitat'), emptyArcColor],
        borderWidth: 1,
      },
    ],
  };
  const [shiData, setShiData] = useState(blankData);
  const [isLoading, setIsLoading] = useState(true);
  const shiStartYear = 2001;

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
          maxTicksLimit: 8,
        },
      },
      y: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: t('Species Habitat Index'),
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
          maxTicksLimit: 10,
        },
      },
    },
  };

  useEffect(() => {
    if (!countryData.length) return;

    const filteredData = countryData.filter(
      (item) => item.Year >= shiStartYear && item.Year <= SHI_LATEST_YEAR
    );

    setData({
      labels: filteredData.map((item) => item.Year),
      datasets: [
        {
          label: t('Average Area Score'),
          data: filteredData.map((item) => item.SHI_AreaScore),
          borderColor: getCSSVariable('area'),
        },
        {
          label: t('Average Connectivity Score'),
          data: filteredData.map((item) => item.SHI_AvgConnectivityScore),
          borderColor: getCSSVariable('connectivity'),
        },
        {
          label: t('Average Habitat Score'),
          data: filteredData.map(
            (item) =>
              (parseFloat(item.SHI_AreaScore) +
                parseFloat(item.SHI_AvgConnectivityScore)) /
              2
          ),
          borderColor: getCSSVariable('habitat'),
        },
      ],
    });

    const headerValues = countryData.find(
      (item) => item.Year === SHI_LATEST_YEAR
    );
    const {
      SHI_AreaScore,
      SHI_AvgConnectivityScore,
      SHI_GlobalRanking,
      SHI_AvgHabitatScore,
    } = headerValues;

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
          data: [SHI_AvgHabitatScore * 100, 100 - SHI_AvgHabitatScore * 100],
          backgroundColor: [getCSSVariable('habitat'), emptyArcColor],
          borderColor: [getCSSVariable('habitat'), emptyArcColor],
          borderWidth: 1,
        },
      ],
    };

    setShiValue(parseFloat(SHI_AvgHabitatScore * 100));
    setShiData(shi);
    setIsLoading(false);
  }, [countryData]);

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
              <div className={styles.mapLegend}>
                <img src={SHILegend} alt="spi-legend" />
                <div className={styles.legendValues}>
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
              <div className={styles.legend}>
                <div className={cx(styles.legendBox, styles.habitat)} />
                <span>{t('Habitat Score')}</span>
                <div className={cx(styles.legendBox, styles.area)} />
                <span>{t('Area Score')}</span>
                <div className={cx(styles.legendBox, styles.connectivity)} />
                <span>{t('Connectivity Score')}</span>
              </div>
              <Line options={options} data={data} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NationalChartComponent;
