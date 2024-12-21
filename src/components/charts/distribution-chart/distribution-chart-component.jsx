/* eslint-disable camelcase */
import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './distribution-chart-styles.module.scss';

function DistributionsChartComponent(props) {
  const { options, data } = props;

  return (
    <div className={styles.container}>
      {data && (
        <div className={styles.chart}>
          <Bar options={options} data={data} />
        </div>
      )}
    </div>
  );
}

export default DistributionsChartComponent;
