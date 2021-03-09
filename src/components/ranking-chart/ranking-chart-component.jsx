import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import { ReactComponent as Arrow } from 'icons/arrow_right.svg';
import styles from './ranking-chart-styles.module.scss';
import SearchInput from 'components/search-input';
import Dropdown from "components/dropdown";
import {
  RANKING_GROUPS_SLUGS,
  RANKING_INDICATORS,
} from "./ranking-chart-selectors";

const LEGEND_TEXT = {
  [RANKING_GROUPS_SLUGS.species]: {
    [RANKING_INDICATORS.nonEndemic]: 'Non endemic species',
    [RANKING_INDICATORS.endemic]: 'Endemic species',
  },
  [RANKING_GROUPS_SLUGS.humanModification]: {
    [RANKING_INDICATORS.veryHigh]: 'Very high human modification',
    [RANKING_INDICATORS.totalMinusVeryHigh]: 'Human modification',
    [RANKING_INDICATORS.noModification]: 'No human modification',
  },
  [RANKING_GROUPS_SLUGS.protection]: {
    [RANKING_INDICATORS.protected]: 'Current protection',
    [RANKING_INDICATORS.protectionNeeded]: 'Additional protection needed',
    [RANKING_INDICATORS.protectionNotNeeded]: 'Non-formal protection needed',
  },
};

const GROUPS_SLUGS = { spi: 'spi', ...RANKING_GROUPS_SLUGS };
const GROUPS = [GROUPS_SLUGS.spi, GROUPS_SLUGS.species, GROUPS_SLUGS.humanModification, GROUPS_SLUGS.protection];
export const SORT_OPTIONS = [
  { label: 'species protection index', slug: RANKING_INDICATORS.spi, group: GROUPS_SLUGS.spi },
  { label: 'proportion of non endemic species', slug: RANKING_INDICATORS.nonEndemic, group: GROUPS_SLUGS.species },
  { label: 'proportion of endemic species', slug: RANKING_INDICATORS.endemic, group: GROUPS_SLUGS.species },
  {
    label: 'proportion of very high human modification',
    slug: RANKING_INDICATORS.veryHigh,
    group: GROUPS_SLUGS.humanModification,
  },
  {
    label: 'proportion of human modification',
    slug: RANKING_INDICATORS.totalMinusVeryHigh,
    group: GROUPS_SLUGS.humanModification,
  },
  {
    label: 'proportion of non human modification',
    slug: RANKING_INDICATORS.noModification,
    group: GROUPS_SLUGS.humanModification,
  },
  {
    label: 'proportion of protection',
    slug: RANKING_INDICATORS.protected,
    group: GROUPS_SLUGS.protection,
  },
  {
    label: 'proportion of additional protection needed',
    slug: RANKING_INDICATORS.protectionNeeded,
    group: GROUPS_SLUGS.protection,
  },
  {
    label: 'proportion of Non-formal protection needed',
    slug: RANKING_INDICATORS.protectionNotNeeded,
    group: GROUPS_SLUGS.protection,
  },
];

const categories = Object.keys(LEGEND_TEXT);

const RankingChart = ({
  data,
  className,
  countryISO,
  handleFilterSelection,
  selectedFilterOption,
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
          <div key={`legend-${key}`}> {LEGEND_TEXT[name][key]}: </div>
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

  return (
    <div className={className}>
      <div className={styles.chartTitleContainer}>
        <span className={styles.chartTitle}>Sort countries by</span>
        <Dropdown
          options={SORT_OPTIONS}
          groups={GROUPS}
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
                      [styles.found]: scrollPosition === i,
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
  scrollPosition: PropTypes.number,
  sortRankingCategory: PropTypes.string,
  handleSortClick: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
};

export default RankingChart;