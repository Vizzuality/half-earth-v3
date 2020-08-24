import React from 'react';
import ScatterPlot from 'components/charts/scatter-plot';
import { INDICATOR_LABELS, CHALLENGES_RELATED_FILTERS } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';

const CountryChallengesChartComponent = ({
  data,
  className,
  countryISO,
  xAxisTicks,
  yAxisTicks,
  handleInfoClick,
  handleBubbleClick,
  handleFilterSelection,
  handleSelectNextIndicator,
  countryChallengesSelectedKey,
  handleSelectPreviousIndicator,
}) => (
  <div className={className}>
    <div>
      <span className={styles.chartTitle}>Countries challenges</span>
      <QuestionIcon className={styles.question} onClick={handleInfoClick}/>
    </div>
    <div>
    <label for="cars">Filter countries with similar:</label>
    <select name="cars" id="cars" onChange={(event) => handleFilterSelection(event.target.value)}>
      {CHALLENGES_RELATED_FILTERS.map(filter => (
        <option key={filter.slug} value={filter.slug}>{filter.name}</option>
      ))}
    </select>
    </div>
    <ScatterPlot
      data={data}
      countryISO={countryISO}
      xAxisLabels={INDICATOR_LABELS}
      xAxisTicks={xAxisTicks}
      yAxisTicks={yAxisTicks}
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
    <div className={styles.yAxisContainer}>
      <span className={styles.yAxisIndicator}>Species Protection Index (SPI)</span>
    </div>
  </div>
  )

export default CountryChallengesChartComponent;