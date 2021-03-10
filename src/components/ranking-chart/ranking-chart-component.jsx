import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import { ReactComponent as Arrow } from 'icons/arrow_right.svg';
import SearchInput from 'components/search-input';
import Dropdown from "components/dropdown";
import styles from './ranking-chart-styles.module.scss';
import {
  RANKING_LEGEND,
  SORT_OPTIONS,
  SORT_GROUPS,
} from "constants/country-mode-constants";

const categories = Object.keys(RANKING_LEGEND);
const RankingChart = ({
  data,
  className,
  countryISO,
  handleFilterSelection,
  selectedFilterOption,
  handleSearchChange,
  handleCountryClick,
  scrollIndex,
  searchTerm,
}) => {
  const [hasScrolled, changeHasScrolled] = useState(false);

  const tableRef = useRef();
  useEffect(() => {
    const ROW_HEIGHT = 24;
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
              style={{ width: `${d[name][k]}%` }}
              key={`tooltip-${k}`}
            />
          ))}
        </div>
      </Tooltip>
    );
console.log('s', handleSearchChange);
  return (
    <div className={className}>
      <div className={styles.chartTitleContainer}>
        <span className={styles.chartTitle}>Sort countries by</span>
        <Dropdown
          options={SORT_OPTIONS}
          groups={SORT_GROUPS}
          selectedOption={selectedFilterOption}
          handleOptionSelection={handleFilterSelection}
        />
      </div>
      <div className={styles.header}>
        {categories.map((category) => (
          <div
            key={category}
            className={cx(styles.headerItem, styles.titleText)}
          >
            {category.toUpperCase()}
          </div>
        ))}
        <SearchInput
          className={styles.searchInput}
          placeholder="Search country"
          onChange={handleSearchChange}
          value={searchTerm}
          type="transparent"
        />
      </div>
      {data && data.length ? (
        <div className={styles.rankingChartContentContainer}>
          <div
            className={cx(styles.rankingChartContent, {
              [styles.scrolled]: hasScrolled,
            })}
            onScroll={onScroll}
            ref={tableRef}
          >
            <div className={styles.table}>
              {data.map((d, i) => (
                <div className={styles.row} key={d.name}>
                  {categories.map((category) => renderBar(category, d))}
                  <div
                    className={cx(styles.spiCountry, {
                      [styles.found]: scrollIndex === i,
                    })}
                    id={`country-${i}`}
                  >
                    <span
                      className={cx(styles.titleText, styles.spiIndex, {
                        [styles.selectedCountry]: countryISO === d.iso,
                      })}
                    >
                      {d.index}.
                    </span>
                    <button
                      className={styles.spiCountryText}
                      onClick={() => handleCountryClick(d.iso, d.name)}
                    >
                      <span
                        className={cx(styles.spiCountryName, {
                          [styles.selectedCountry]: countryISO === d.iso,
                        })}
                      >
                        {d.name}
                      </span>
                      <span
                        className={cx(styles.spiCountryIndex, {
                          [styles.selectedCountry]: countryISO === d.iso,
                        })}
                      >
                        ({d.spi})
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={cx(styles.scrollHint, { [styles.fade]: hasScrolled })}
            >
              <Arrow className={styles.arrow} />
              Scroll
            </div>
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