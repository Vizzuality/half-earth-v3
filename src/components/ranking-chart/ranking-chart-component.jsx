import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import { ReactComponent as Arrow } from 'icons/arrow_right.svg';
import styles from './ranking-chart-styles.module.scss';
import SearchInput from 'components/search-input';

const legendText = {
  species: {
    nonEndemic: 'Non endemic species',
    endemic: 'Endemic species'
  },
  'human modification': {
    veryHigh: 'Very high human modification',
    totalMinusVeryHigh: 'Human modification',
    noModification: 'No human modification'
  },
  protection: {
    protected: 'Current protection',
    protectionNeeded: ' Additional protection needed',
    protectionNotNeeded: 'Non-formal protection needed'
  }
};

const categories = Object.keys(legendText);

const RankingChart = ({
  data,
  className,
  countryISO,
  sortRankingCategory,
  handleSortClick,
  handleSearchChange,
  handleCountryClick,
  scrollPosition,
  searchTerm,
}) => {
  const [hasScrolled, changeHasScrolled] = useState(false);
  const tableRef = useRef();

  useEffect(() => {
    if (scrollPosition > -1 && tableRef.current) {
      const foundElement = document.getElementById(`country-${scrollPosition}`)
      if (foundElement) {
        foundElement.scrollIntoView();
        tableRef.current.scrollBy(0, -10);
      }
    }
  }, [scrollPosition, tableRef]);

  const onScroll = () => {
    if (!hasScrolled) {
      changeHasScrolled(true);
    }
  };

  const barTooltip = (d, name) => (
    <div className={styles.tooltip}>
      <div className={styles.labels}>
        {Object.keys(d[name]).map((key) => (
          <div key={`legend-${key}`}> {legendText[name][key]}: </div>
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

  return (
    <div className={className}>
      <div className={styles.chartTitleContainer}>
        <span className={styles.chartTitle}>Sort countries by</span>
      </div>
      <div className={styles.header}>
        {categories.map((category) => (
          <div key={category} className={cx(styles.headerItem, styles.titleText)}>
            {category.toUpperCase()}
          </div>
        ))}
        <SearchInput
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
                  <div className={cx(styles.spiCountry, {[styles.found]: scrollPosition === i })} id={`country-${i}`}>
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
  scrollPosition: PropTypes.number,
  sortRankingCategory: PropTypes.string,
  handleSortClick: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
};

export default RankingChart;