import React, { useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import cx from 'classnames';

import ScatterPlot from 'components/charts/scatter-plot-legacy';
import Dropdown from 'components/dropdown';

import { getIndicatorLabels } from 'constants/country-mode-constants';

import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';

import styles from './country-challenges-chart-styles.module.scss';

function CountryChallengesChartComponent({
  data,
  coastal,
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
  isShrunken,
}) {
  const t = useT();
  const locale = useLocale();
  const indicatorLabels = useMemo(() => getIndicatorLabels(), [locale]);

  return (
    <div
      className={cx(className, {
        [styles.shrunken]: isShrunken,
      })}
    >
      <div className={styles.headerContainer}>
        <span className={styles.chartTitle}>{t('Show')}</span>
        <div className={styles.landMarineDropdownWrapper}>
          <Dropdown
            disabled={!coastal}
            parentWidth="130px"
            options={landMarineOptions}
            selectedOption={selectedLandMarineOption}
            handleOptionSelection={handleLandMarineSelection}
          />
        </div>
        <span className={cx(styles.chartTitle, styles.filterTitle)}>
          {t('filter countries')}
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
            type="button"
            onClick={handleSelectPreviousIndicator}
            style={{ transform: 'scaleX(-1)' }}
          >
            <ArrowButton className={styles.arrowButton} />
          </button>
          <span className={styles.xAxisIndicator}>
            {indicatorLabels[countryChallengesSelectedKey]}
          </span>
          <button type="button" onClick={handleSelectNextIndicator}>
            <ArrowButton className={styles.arrowButton} />
          </button>
        </div>
      </div>
      <div className={styles.yAxisContainer}>
        <span className={styles.yAxisIndicator}>
          {t('Species Protection Index (SPI)')}
        </span>
      </div>
    </div>
  );
}

export default CountryChallengesChartComponent;
