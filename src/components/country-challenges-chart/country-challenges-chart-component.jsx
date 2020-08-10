import React from 'react';
import ScatterPlot from 'components/charts/scatter-plot';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';

const CountryChallengesChartComponent = ({
  data,
  countryISO,
  className,
  countryChallengesSelectedKey
}) => (
  <div className={className}>
    <span className={styles.chartTitle}>Countries challenges</span>
    <ScatterPlot
      data={data}
      countryISO={countryISO}
      xAxisLabels={INDICATOR_LABELS}
      countryChallengesSelectedKey={countryChallengesSelectedKey}
    />
  </div>
  )

export default CountryChallengesChartComponent;