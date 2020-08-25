import React, { useState } from 'react';
import cx from 'classnames';
import ScatterPlot from 'components/charts/scatter-plot';
import { INDICATOR_LABELS, CHALLENGES_RELATED_FILTERS_OPTIONS, FILTERS_DICTIONARY } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';
import { ReactComponent as SwitchArrow } from 'icons/switch.svg';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';

const CountryChallengesChartComponent = ({
  data,
  className,
  countryISO,
  xAxisTicks,
  yAxisTicks,
  filtersOpen,
  selectedFilter,
  handleInfoClick,
  handleBubbleClick,
  handleFiltersToggle,
  handleFilterSelection,
  handleSelectNextIndicator,
  countryChallengesSelectedKey,
  handleSelectPreviousIndicator,
}) => {


  return (
    <div className={className}>
      <div>
        <span className={styles.chartTitle}>Countries challenges</span>
        <QuestionIcon className={styles.question} onClick={handleInfoClick}/>
      </div>
      <div className={styles.filterSelectContainer}>
        <div className={styles.selectLabelContainer} onClick={handleFiltersToggle}>
          <p className={styles.filterSelectLabel}>{FILTERS_DICTIONARY[selectedFilter]}</p>
          <SwitchArrow className={cx(styles.switchIcon, {[styles.filtersOpen]: filtersOpen})}/>
        </div>
        {filtersOpen &&
          <ul className={styles.filterSelect} name="filters" id="filters">
            <li className={cx(styles.filterOption, styles.optionsLabel)}>Filter countries with similar:</li>
            {CHALLENGES_RELATED_FILTERS_OPTIONS.map(filter => (
              <li
                className={cx(
                  styles.filterOption,
                  {[styles.selectedFilter]: filter.slug === selectedFilter}
                )}
                key={filter.slug}
                onClick={() => handleFilterSelection(filter.slug)}>
                  {filter.name}
                </li>
            ))}
          </ul>
        }
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
} 

export default CountryChallengesChartComponent;