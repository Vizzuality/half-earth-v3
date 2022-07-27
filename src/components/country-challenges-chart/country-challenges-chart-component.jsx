import React, { useMemo } from 'react';
import cx from 'classnames';
import { useT, useLocale } from '@transifex/react';

import ScatterPlot from 'components/charts/scatter-plot';
import Dropdown from 'components/dropdown';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';

import { getIndicatorLabels } from 'constants/country-mode-constants';
import styles from './country-challenges-chart-styles.module.scss';

const CountryChallengesChartComponent = ({
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
}) => {
  const t = useT();
  const locale = useLocale();
  const indicatorLabels = useMemo(() => getIndicatorLabels(), [locale]);

  return (
    <div className={className}>
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
            onClick={handleSelectPreviousIndicator}
            style={{ transform: 'scaleX(-1)' }}
          >
            <ArrowButton className={styles.arrowButton} />
          </button>
          <span className={styles.xAxisIndicator}>
            {indicatorLabels[countryChallengesSelectedKey]}
          </span>
          <button onClick={handleSelectNextIndicator}>
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
};

export default CountryChallengesChartComponent;
