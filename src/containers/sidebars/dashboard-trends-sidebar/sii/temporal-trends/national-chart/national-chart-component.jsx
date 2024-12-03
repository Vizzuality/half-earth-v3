import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import cx from 'classnames';
import { getCSSVariable } from 'utils/css-utils';
import last from 'lodash/last';
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
  const { nationalChartData } = props;
  const [data, setData] = useState();
  const [spiValue, setSpiValue] = useState(0);
  const { lightMode } = useContext(LightModeContext);
  const emptyArcColor = lightMode ? getCSSVariable('dark-opacity') : getCSSVariable('white-opacity-20');
  const [isLoading, setIsLoading] = useState(true);
  const [lastYear, setLastYear] = useState();

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

  const [spiData, setSpiData] = useState(blankData);

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
          text: t('Species Information Index'),
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
    if (nationalChartData && nationalChartData.values?.length) {
      const values = nationalChartData.values;

      setData({
        labels: values.map((item) => item[0]),
        datasets: [
          {
            label: t('SII'),
            data: values.map((item) => (item[1] * 100)),
            borderColor: getCSSVariable('birds'),
          },
        ],
      });

      setLastYear(last(values)[0]);

      const spiVal = nationalChartData.metrics[0] * 100;
      const spi = {
        labels: [t('Global SPI'), t('Remaining')],
        datasets: [
          {
            label: '',
            data: [spiVal, 100 - spiVal],
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

      setSpiValue(spiVal);
      setSpiData(spi);
      setIsLoading(false);
    }
  }, [nationalChartData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading && <>
        <div className={styles.info}>
          <div className={styles.arcGrid}>
            <div className={styles.values}>
              <b>{lastYear}</b>
              <span>{t('Year')}</span>
            </div>
            <SpiArcChartComponent
              width="125x"
              height="75px"
              data={spiData}
              value={spiValue}
            />
            <div className={styles.values}>
              <b>{nationalChartData.metrics?.[1]}</b>
              <span>{t('Global Ranking')}</span>
            </div>
            <span></span>
            <span>SII</span>

          </div>
        </div>
        {data && (
          <div className={styles.chart}>
            <Line options={options} data={data} />
          </div>
        )}
      </>}
    </div>
  );
}

export default NationalChartComponent;
