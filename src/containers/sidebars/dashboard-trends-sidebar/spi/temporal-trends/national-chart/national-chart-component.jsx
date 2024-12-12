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
import last from 'lodash/last';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import { LightModeContext } from '../../../../../../context/light-mode';

import styles from './national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function TemporalTrendsSpiNationalChartComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);

  const { countryData } = props;

  const [data, setData] = useState();
  const [currentScore, setCurrentScore] = useState();
  const [areaProtected, setAreaProtected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const emptyArcColor = lightMode
    ? getCSSVariable('dark-opacity')
    : getCSSVariable('white-opacity-20');

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
    if (!countryData.length) return;
    setIsLoading(false);
    setCurrentScore(last(countryData));
  }, [countryData]);

  useEffect(() => {
    if (!currentScore) return;
    const { SPI, PercentAreaProtected } = currentScore;

    const globalSpi = {
      labels: [t('Global SPI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [SPI, 100 - SPI],
          backgroundColor: [getCSSVariable('temporal-spi'), emptyArcColor],
          borderColor: [getCSSVariable('temporal-spi'), emptyArcColor],
          borderWidth: 1,
        },
      ],
    };

    const areaProt = {
      labels: [t('Area Protected'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [PercentAreaProtected, 100 - PercentAreaProtected],
          backgroundColor: [getCSSVariable('temporal-spi'), emptyArcColor],
          borderColor: [getCSSVariable('temporal-spi'), emptyArcColor],
          borderWidth: 1,
        },
      ],
    };

    setData({
      labels: countryData.map((item) => item.Year),
      datasets: [
        {
          label: 'SPI',
          data: countryData.map((item) => item.SPI),
          borderColor: getCSSVariable('birds'),
        },
        {
          label: t('Area protected'),
          data: countryData.map((item) => item.PercentAreaProtected),
          borderColor: getCSSVariable('mammals'),
        },
      ],
    });
    setSpiArcData(globalSpi);
    setAreaProtected(PercentAreaProtected);
    setAreaProtectedData(areaProt);
  }, [currentScore]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading && (
        <div className={styles.info}>
          {currentScore && (
            <div className={styles.arcGrid}>
              <div className={styles.values}>
                <b>{currentScore?.Year}</b>
                <span>{t('Year')}</span>
              </div>
              <SpiArcChartComponent
                width="125x"
                height="75px"
                data={areaProtectedData}
                value={areaProtected}
              />
              <SpiArcChartComponent
                width="125x"
                height="75px"
                data={spiArcData}
                value={currentScore?.SPI}
              />
              <div className={styles.values}>
                <b>{currentScore.GlobalRanking}</b>
                <span>{t('Global Ranking')}</span>
              </div>
              <span />
              <span>{t('Area Protected')}</span>
              <span>SPI</span>
            </div>
          )}
        </div>
      )}
      {data && (
        <div className={styles.chart}>
          <Line options={options} data={data} />
        </div>
      )}
    </div>
  );
}

export default TemporalTrendsSpiNationalChartComponent;
