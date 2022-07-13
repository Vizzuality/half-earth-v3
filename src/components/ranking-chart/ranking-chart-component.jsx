import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useT } from '@transifex/react';

import { Tooltip } from 'react-tippy';
import { ReactComponent as Arrow } from 'icons/arrow_right.svg';
import SearchInput from 'components/search-input';
import Dropdown from 'components/dropdown';
import styles from './ranking-chart-styles.module.scss';
import {
  SORT_GROUPS,
  SORT_OPTIONS,
  RANKING_LEGEND,
  SORT_GROUPS_SLUGS,
  RANKING_HEADER_LABELS,
} from 'constants/country-mode-constants';

const categories = Object.keys(SORT_GROUPS_SLUGS);
const RankingChart = ({
  data,
  coastal,
  className,
  countryISO,
  handleFilterSelection,
  selectedFilterOption,
  handleSearchChange,
  handleCountryClick,
  scrollIndex,
  searchTerm,
  landMarineOptions,
  selectedLandMarineOption,
  handleLandMarineSelection,
}) => {
  const [hasScrolled, changeHasScrolled] = useState(false);
  const t = useT();

  const tableRef = useRef();
  useEffect(() => {
    const ROW_HEIGHT = 23;
    if (scrollIndex > -1 && tableRef.current) {
      tableRef.current.scroll(0, ROW_HEIGHT * scrollIndex);
    }
  }, [scrollIndex, tableRef]);

  const onScroll = () => {
    if (!hasScrolled) {
      changeHasScrolled(true);
    }
  };

  const barTooltip = (d, name) => (
    <div className={styles.tooltip}>
      <div className={styles.labels}>
        {Object.keys(d[name]).map((key) => (
          <div key={`legend-${key}`}> {RANKING_LEGEND[name][key]}: </div>
        ))}
      </div>
      <div className={styles.values}>
        {Object.keys(d[name]).map((key) => (
          <div
            className={cx(styles.valuesBox, styles[key])}
            style={{
              height: `${100 / Object.keys(d[name]).length}%`,
            }}
            key={`legend-value-${key}`}
          >
            {Math.floor(d[name][key] * 100) / 100}%
          </div>
        ))}
      </div>
    </div>
  );

  const renderBar = (name, d) =>
    !d || !d[name] ? null : (
      <Tooltip
        html={barTooltip(d, name)}
        animation="none"
        delay={50}
        position="right"
        className={styles.barContainer}
        key={`tooltip-bar-${name}`}
      >
        <div className={styles.fullBar}>
          {Object.keys(d[name]).map((k) => (
            <span
              className={cx(styles.bar, styles[k])}
              style={{ width: `${d[name][k] || '0'}%` }}
              key={`tooltip-${k}`}
            />
          ))}
        </div>
      </Tooltip>
    );
  return (
    <div className={className}>
      <div className={styles.chartTitleContainer}>
        <span className={styles.chartTitle}>{t('Show')}</span>
        <div className={styles.landMarineDropdownWrapper}>
          <Dropdown
            disabled={!coastal}
            width="full"
            parentWidth="130px"
            options={landMarineOptions}
            selectedOption={selectedLandMarineOption}
            handleOptionSelection={handleLandMarineSelection}
          />
        </div>
        <span className={cx(styles.chartTitle, styles.filterTitle)}>
          {t('sort countries')}
        </span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            width="full"
            parentWidth="410px"
            options={SORT_OPTIONS}
            groups={SORT_GROUPS}
            selectedOption={selectedFilterOption}
            handleOptionSelection={handleFilterSelection}
          />
        </div>
      </div>
      <div className={styles.header}>
        <SearchInput
          className={styles.searchInput}
          placeholder={t('Search country')}
          onChange={handleSearchChange}
          value={searchTerm}
          type="transparent"
        />
        {categories.map((category) => (
          <div
            key={category}
            className={cx(styles.headerItem, {
              [styles.spiHeader]: category === 'spi',
            })}
          >
            {RANKING_HEADER_LABELS[category].split(' ').map((word) => (
              <p
                key={word}
                className={styles.titleText}
              >{`${word.toUpperCase()}`}</p>
            ))}
          </div>
        ))}
      </div>
      {data && data.length ? (
        <div
          className={cx(styles.rankingChartContent, {
            [styles.scrolled]: hasScrolled,
          })}
          onScroll={onScroll}
          ref={tableRef}
        >
          <div className={styles.table}>
            {data.map((d, i) => (
              <div
                className={cx(styles.row, {
                  [styles.selectedCountry]: countryISO === d.iso,
                })}
                key={d.name}
              >
                <button
                  className={styles.spiCountryButton}
                  onClick={() => handleCountryClick(d.iso, d.name)}
                >
                  <span
                    className={cx(styles.spiCountryIndex, {
                      [styles.found]: scrollIndex === i,
                      [styles.selectedCountry]: countryISO === d.iso,
                    })}
                  >
                    {`${i + 1}.`}
                  </span>
                  <span
                    className={cx(styles.spiCountryName, {
                      [styles.found]: scrollIndex === i,
                      [styles.selectedCountry]: countryISO === d.iso,
                    })}
                  >
                    {d.name}
                  </span>
                </button>
                {categories.map((category) =>
                  category === 'spi' ? (
                    <span
                      key={category}
                      className={cx(styles.titleText, styles.spiIndex)}
                    >
                      {d[category]}
                    </span>
                  ) : (
                    renderBar(category, d)
                  )
                )}
              </div>
            ))}
          </div>
          <div
            className={cx(styles.scrollHint, { [styles.fade]: hasScrolled })}
          >
            <Arrow className={styles.arrow} />
            {t('Scroll')}
          </div>
        </div>
      ) : null}
    </div>
  );
};

RankingChart.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  searchTerm: PropTypes.string,
  scrollIndex: PropTypes.number,
  sortRankingCategory: PropTypes.string,
  handleCountryClick: PropTypes.func.isRequired,
};

export default RankingChart;
