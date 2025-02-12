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
import { Loading } from 'he-components';
import last from 'lodash/last';

import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';
import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import spiTrendImg from 'images/dashboard/tutorials/tutorial_spi_temporalTrends-en.png?react';
import spiTrendFRImg from 'images/dashboard/tutorials/tutorial_spi_temporalTrends-fr.png?react';

import { SECTION_INFO } from '../../../../dashboard-sidebar/tutorials/sections/sections-info';

import styles from './national-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function TemporalTrendsSpiNationalChartComponent(props) {
  const t = useT();
  const locale = useLocale();
  const { lightMode } = useContext(LightModeContext);

  const { countryData, lang } = props;

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
        backgroundColor: [getCSSVariable('bubbles'), emptyArcColor],
        borderColor: [getCSSVariable('bubbles'), emptyArcColor],
        borderWidth: 1,
      },
    ],
  };
  const [chartInfo, setChartInfo] = useState();
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
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: t('SPI / Percent of Area Protected'),
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
      description: t(SECTION_INFO.SPI_TEMPORAL_TREND),
      imgAlt: t('Species Protection Index - Trends'),
      image: locale === 'fr' ? spiTrendFRImg : spiTrendImg,
    });
  };

  useEffect(() => {
    if (!lang) return;
    updateChartInfo();
  }, [lang]);

  useEffect(() => {
    updateChartInfo();
  }, []);

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
          backgroundColor: [getCSSVariable('bubble'), emptyArcColor],
          borderColor: [getCSSVariable('bubble'), emptyArcColor],
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
          backgroundColor: [getCSSVariable('area-protected'), emptyArcColor],
          borderColor: [getCSSVariable('area-protected'), emptyArcColor],
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
          borderColor: getCSSVariable('bubble'),
        },
        {
          label: t('Area protected'),
          data: countryData.map((item) => item.PercentAreaProtected),
          borderColor: getCSSVariable('area-protected'),
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
                isPercent
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
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Line options={options} data={data} />
          </ChartInfoComponent>
        </div>
      )}
    </div>
  );
}

export default TemporalTrendsSpiNationalChartComponent;
