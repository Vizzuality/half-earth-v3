import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import cx from 'classnames';
import { getCSSVariable } from 'utils/css-utils';
import { Loading } from 'he-components';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import styles from './national-chart-styles.module.scss';
import { LightModeContext } from '../../../../../../context/light-mode';
import { useT } from '@transifex/react';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function TemporalTrendsSpiNationalChartComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);

  const { spiData } = props;

  const [data, setData] = useState();
  const [currentScore, setCurrentScore] = useState();
  const [areaProtected, setAreaProtected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const emptyArcColor = lightMode ? getCSSVariable('dark-opacity') : getCSSVariable('white-opacity-20');

  const blankData = {
    labels: [t('Global SPI'), t('Remaining')],
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

  const [spiArcData, setSpiArcData] = useState(blankData);
  const [areaProtectedData, setAreaProtectedData] = useState(blankData);

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
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: t('SPI / Percent of Area Protected'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
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

  useEffect(() => {
    if (!spiData.trendData.length) return;
    setIsLoading(false);
    const data = spiData.trendData;
    const { country_scores } = data[0];

    setCurrentScore(country_scores[country_scores.length - 1]);
  }, [spiData.trendData]);

  useEffect(() => {
    if (!currentScore) return;
    const spi = {
      labels: [t('Global SPI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [currentScore.spi_all, 100 - currentScore.spi_all],
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

    const areaProt = {
      labels: [t('Area Protected'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [currentScore.percentprotected_all, 100 - currentScore.percentprotected_all],
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

    const data = spiData.trendData;
    const { country_scores } = data[0];

    setData({
      labels: country_scores.map((item) => item.year),
      datasets: [
        {
          label: 'SPI',
          data: country_scores.map((item) => item.spi_all),
          borderColor: getCSSVariable('birds'),
        },
        {
          label: t('Area protected'),
          data: country_scores.map((item) => item.percentprotected_all),
          borderColor: getCSSVariable('mammals'),
        },
      ],
    });
    setSpiArcData(spi);
    setAreaProtected(currentScore.percentprotected_all);
    setAreaProtectedData(areaProt);
  }, [currentScore]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading &&
        <div className={styles.info}>
          {currentScore &&
            <div className={styles.arcGrid}>
              <div className={styles.values}>
                <b>{currentScore?.year}</b>
                <span>{t('Year')}</span>
              </div>
              <SpiArcChartComponent
                width="125x"
                height="75px"
                data={spiArcData}
                value={currentScore.spi_all}
              />
              <SpiArcChartComponent
                width="125x"
                height="75px"
                data={areaProtectedData}
                value={areaProtected}
              />
              <div className={styles.values}>
                <b>{currentScore?.national_rank}</b>
                <span>SPI</span>
              </div>
              <span></span>
              <span>{t('Area Protected')}</span>
              <span>{t('Global Ranking')}</span>
            </div>
          }
        </div>
      }
      {data && (
        <div className={styles.chart}>
          <Line options={options} data={data} />
        </div>
      )}
    </div>
  );
}

export default TemporalTrendsSpiNationalChartComponent;
