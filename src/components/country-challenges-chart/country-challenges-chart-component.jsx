import React from 'react';
import ScatterPlot from 'components/charts/scatter-plot';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';

const CountryChallengesChartComponent = ({
  data,
  className,
  countryISO,
  xAxisTicks,
  handleBubbleClick,
  handleSelectNextIndicator,
  countryChallengesSelectedKey,
  handleSelectPreviousIndicator,
}) => (
  <div className={className}>
    <span className={styles.chartTitle}>Countries challenges</span>
    <ScatterPlot
      data={data}
      countryISO={countryISO}
      xAxisLabels={INDICATOR_LABELS}
      xAxisTicks={xAxisTicks}
      onBubbleClick={handleBubbleClick}
      countryChallengesSelectedKey={countryChallengesSelectedKey}
    />
    <div className={styles.xAxisContainer}>
      <div className={styles.xAxisLabelContainer}>
        <button onClick={handleSelectPreviousIndicator} style={{ transform: "scaleX(-1)" }}>
          <ArrowButton />
        </button>
        <span className={styles.xAxisIndicator}>{INDICATOR_LABELS[countryChallengesSelectedKey]}</span>
        <button onClick={handleSelectNextIndicator}>
          <ArrowButton />
        </button>
      </div>
    </div>
  </div>
  )

export default CountryChallengesChartComponent;