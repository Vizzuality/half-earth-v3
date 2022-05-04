import React from 'react';
import cx from 'classnames';

import ScatterPlot from 'components/charts/scatter-plot';
import Dropdown from 'components/dropdown';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';

import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';

const { REACT_APP_FEATURE_MARINE } = process.env;

const CountryChallengesChartComponent = ({
  data,
  className,
  countryISO,
  xAxisTicks,
  yAxisTicks,
  handleBubbleClick,
  selectedFilterOption,
  selectedLandMarineOption,
  handleLandMarineSelection,
  handleFilterSelection,
  challengesFilterOptions,
  landMarineOptions,
  handleSelectNextIndicator,
  countryChallengesSelectedKey,
  handleSelectPreviousIndicator,
}) => {
  return (
    <div className={className}>
      <div className={styles.headerContainer}>
        {REACT_APP_FEATURE_MARINE ? (
          <>
            <span className={styles.chartTitle}>Show</span>
            <div className={styles.landMarineDropdownWrapper}>
              <Dropdown
                parentWidth="130px"
                options={landMarineOptions}
                selectedOption={selectedLandMarineOption}
                handleOptionSelection={handleLandMarineSelection}
              />
            </div>
            <span className={cx(styles.chartTitle, styles.filterTitle)}>
              filter countries
            </span>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                width="full"
                parentWidth="330px"
                options={challengesFilterOptions}
                selectedOption={selectedFilterOption}
                handleOptionSelection={handleFilterSelection}
              />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
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
