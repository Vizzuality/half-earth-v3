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
import last from 'lodash/last';

import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';
import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import siiTrendImg from 'images/dashboard/tutorials/tutorial_sii_temporalTrends-en.png?react';

import { SECTION_INFO } from '../../../../dashboard-sidebar/tutorials/sections/sections-info';

import styles from './national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function NationalChartComponent(props) {
  const t = useT();
  const { nationalChartData, lang } = props;
  const [data, setData] = useState();
  const [siiValue, setSiiValue] = useState(0);
  const { lightMode } = useContext(LightModeContext);
  const emptyArcColor = lightMode
    ? getCSSVariable('dark-opacity')
    : getCSSVariable('white-opacity-20');
  const [isLoading, setIsLoading] = useState(true);
  const [lastYear, setLastYear] = useState();
  const [chartInfo, setChartInfo] = useState();
  const [globalRanking, setGlobalRanking] = useState(0);

  const blankData = {
    labels: [t('Global SPI'), t('Remaining')],
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

  const [siiData, setSiiData] = useState(blankData);

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
          text: t('Species Information Index'),
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

  const updateChartInfo = () => {
    setChartInfo({
      title: t('Temporal Trends'),
      description: t(SECTION_INFO.SII_TEMPORAL_TREND),
      imgAlt: t('Species Information Index - Trends'),
      image: siiTrendImg,
    });
  };

  useEffect(() => {
    updateChartInfo();
  }, [lang]);

  useEffect(() => {
    updateChartInfo();
  }, []);

  useEffect(() => {
    if (nationalChartData.length) {
      setData({
        labels: nationalChartData.map((item) => item.year),
        datasets: [
          {
            label: t('SII'),
            data: nationalChartData.map((item) => item.sii * 100),
            borderColor: getCSSVariable('bubble'),
          },
        ],
      });

      const lastValue = last(nationalChartData);

      const siiVal = lastValue.sii * 100;
      const sii = {
        labels: [t('Global SPI'), t('Remaining')],
        datasets: [
          {
            label: '',
            data: [siiVal, 100 - siiVal],
            backgroundColor: [getCSSVariable('bubble'), emptyArcColor],
            borderColor: [getCSSVariable('bubble'), emptyArcColor],
            borderWidth: 1,
          },
        ],
      };

      setLastYear(lastValue.year);
      setGlobalRanking(lastValue.globalRanking);
      setSiiValue(siiVal);
      setSiiData(sii);
      setIsLoading(false);
    }
  }, [nationalChartData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading && (
        <>
          <div className={styles.info}>
            <div className={styles.arcGrid}>
              <div className={styles.values}>
                <b>{lastYear}</b>
                <span>{t('Year')}</span>
              </div>
              <SpiArcChartComponent
                width="125x"
                height="75px"
                data={siiData}
                value={siiValue}
              />
              <div className={styles.values}>
                <b>{globalRanking}</b>
                <span>{t('Global Ranking')}</span>
              </div>
              <span />
              <span>SII</span>
            </div>
          </div>
          {data && (
            <div className={styles.chart}>
              <ChartInfoComponent chartInfo={chartInfo} {...props}>
                <Line options={options} data={data} />
              </ChartInfoComponent>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NationalChartComponent;
