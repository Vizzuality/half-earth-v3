/* eslint-disable camelcase */
import React, { useContext } from 'react';

import { useT } from '@transifex/react';

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
  const t = useT();

  const { lightMode } = useContext(LightModeContext);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)} />
  );
}

export default ProvinceChartComponent;
