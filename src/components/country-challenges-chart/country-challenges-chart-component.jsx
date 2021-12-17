import React from 'react';

import ScatterPlot from 'components/charts/scatter-plot';
import Dropdown from 'components/dropdown';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';

import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';

const CountryChallengesChartComponent = ({
  data,
  className,
  countryISO,
  xAxisTicks,
  yAxisTicks,
  handleBubbleClick,
  selectedFilterOption,
  handleFilterSelection,
  challengesFilterOptions,
  handleSelectNextIndicator,
  countryChallengesSelectedKey,
  handleSelectPreviousIndicator,
}) => {
  return (
    <div className={className}>
      <div className={styles.headerContainer}>
        <span className={styles.chartTitle}>Filter countries</span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            width="full"
            parentWidth="530px"
            options={challengesFilterOptions}
            selectedOption={selectedFilterOption}
            handleOptionSelection={handleFilterSelection}
          />
        </div>
      </div>
      <ScatterPlot
        data={data}
        countryISO={countryISO}
        xAxisTicks={xAxisTicks}
        yAxisTicks={yAxisTicks}
        onBubbleClick={handleBubbleClick}
        countryChallengesSelectedKey={countryChallengesSelectedKey}
      />
      <div className={styles.xAxisContainer}>
        <div className={styles.xAxisLabelContainer}>
          <button
            onClick={handleSelectPreviousIndicator}
            style={{ transform: 'scaleX(-1)' }}
          >
            <ArrowButton />
          </button>
          <span className={styles.xAxisIndicator}>
            {INDICATOR_LABELS[countryChallengesSelectedKey]}
          </span>
          <button onClick={handleSelectNextIndicator}>
            <ArrowButton />
          </button>
        </div>
      </div>
      <div className={styles.yAxisContainer}>
        <span className={styles.yAxisIndicator}>
          Species Protection Index (SPI)
        </span>
      </div>
    </div>
  );
};

export default CountryChallengesChartComponent;