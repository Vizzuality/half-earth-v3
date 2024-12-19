/* eslint-disable camelcase */
import React, { useContext } from 'react';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import cx from 'classnames';

import { LightModeContext } from '../../../../../../context/light-mode';

import styles from './province-chart-styles.module.scss';

ChartJS.register(LinearScale, ArcElement, PointElement, Tooltip, Legend);

function ProvinceChartComponent() {
  const { lightMode } = useContext(LightModeContext);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)} />
  );
}

export default ProvinceChartComponent;
