import { useState, useRef, useEffect, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import PropTypes from 'prop-types';

import { roundSPI } from 'utils/data-formatting-utils';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';
import camelCase from 'lodash/camelCase';
import groupBy from 'lodash/groupBy';

import HeaderItem from 'components/header-item';
import SearchInput from 'components/search-input';

import {
  getRankingLegend,
  SORT_GROUPS_SLUGS,
} from 'constants/country-mode-constants';
import { getCountryNames } from 'constants/translation-constants';

import { getLegendItems } from './ranking-chart-constants';
import styles from './ranking-chart-styles.module.scss';

const categories = Object.keys(SORT_GROUPS_SLUGS);
const ROW_HEIGHT = 20;

function RankingChart({
  data,
  className,
  countryISO,
  handleSearchChange,
  handleCountryClick,
  scrollIndex,
  searchTerm,
  selectedLandMarineOption,
  categorySort,
  handleSortClick,
}) {
  const t = useT();
  const locale = useLocale();
  const [hasScrolled, changeHasScrolled] = useState(false);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);

  const LEGEND_ITEMS = useMemo(() => getLegendItems(), [locale]);
  const rankingLegend = useMemo(() => getRankingLegend(), [locale]);
  const RANKING_HEADER_LABELS = {
    [SORT_GROUPS_SLUGS.species]: t('species'),
    [SORT_GROUPS_SLUGS.humanModification]: t('human modification'),
    [SORT_GROUPS_SLUGS.protection]: t('protection'),
    [SORT_GROUPS_SLUGS.spi]: t('spi'),
  };

  const tableRef = useRef();

  const scrollTableVertically = (distance) => {
    tableRef.current.scroll(0, distance);
  };

  useEffect(() => {
    if (scrollIndex > -1 && tableRef.current) {
      scrollTableVertically(ROW_HEIGHT * scrollIndex);
    }
  }, [scrollIndex, tableRef]);

  useEffect(() => {
    const selectedCountry = data.find((d) => d.iso === countryISO);
    if (selectedCountry) {
      const PADDING = 30;
      scrollTableVertically(ROW_HEIGHT * selectedCountry.index - PADDING);
    }
  }, [selectedLandMarineOption]);

  const countryNames = useMemo(getCountryNames, [locale]);

  const onScroll = () => {
    if (!hasScrolled) {
      changeHasScrolled(true);
    }
  };

  useEffect(() => {
    const PADDING = 20;
    const selectedCountry = data.find((d) => d.iso === countryISO);

    if (selectedCountry) {
      scrollTableVertically(ROW_HEIGHT * selectedCountryIndex - PADDING);
    }
  }, [handleSortClick, tableRef.current, selectedCountryIndex]);

  useEffect(() => {
    const selectedCountry = data.find((d) => d.iso === countryISO);
    const countryIndex = data.indexOf(selectedCountry);
    setSelectedCountryIndex(countryIndex);
  }, [handleSortClick, handleCountryClick]);

  const barTooltip = (d, name, attrs) => (
    <div className={styles.tooltip} {...attrs} key={`tooltip-${name}`}>
      <div className={styles.labels}>
        {Object.keys(d[name]).map((key) => (
          <div key={`legend-${key}`}> {rankingLegend[name][key]}: </div>
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
            {Math.floor((d[name][key] || 0) * 100) / 100}%
          </div>
        ))}
      </div>
    </div>
  );

  const renderBar = (name, d) =>
    !d || !d[name] ? null : (
      <div
        className={styles.barContainer}
        key={`bar-container-${name}-${d.iso}`}
      >
        <Tooltip
          content={barTooltip(d, name)}
          delay={100}
          placement="right"
          key={`tooltip-bar-${name}-${d.iso}`}
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
      </div>
    );
  return (
    <div className={className}>
      <div className={styles.chartTitleContainer}>
        <span className={styles.chartTitle}>
          {t('Ranking by', { _comment: '{Ranking by}: Land SPI' })}
        </span>
      </div>
      <div className={styles.header}>
        <SearchInput
          className={styles.searchInput}
          placeholder={t('Search country')}
          onChange={handleSearchChange}
          value={searchTerm}
        />
        {categories.map((category) => {
          const title = RANKING_HEADER_LABELS[category];
          return (
            <div
              key={category}
              className={cx(styles.headerItem, {
                [styles.spiHeader]: category === 'spi',
              })}
            >
              <HeaderItem
                title={title}
                theme={{
                  headerItem: styles.tableHeaderItem,
                  arrowUp: styles.arrowUp,
                }}
                key={title}
                isSortSelected={
                  categorySort &&
                  categorySort.split('-')[0] &&
                  categorySort.split('-')[0] === camelCase(title)
                }
                sortDirection={categorySort && categorySort.split('-')[1]}
                handleSortClick={handleSortClick}
              />
            </div>
          );
        })}
      </div>
      {data && data.length ? (
        <div
          className={cx(styles.rankingChartContent, {
            [styles.scrolled]: hasScrolled,
          })}
          onScroll={onScroll}
          ref={tableRef}
          id="ranking-scroll"
        >
          {data.map((d, i) => (
            <div
              className={cx(styles.row, {
                [styles.selectedCountry]: countryISO === d.iso,
              })}
              key={d.name}
            >
              <button
                type="button"
                className={styles.spiCountryButton}
                onClick={() => handleCountryClick(d.iso, d.name)}
              >
                <span
                  className={cx(styles.spiCountryIndex, {
                    [styles.found]: scrollIndex === i,
                  })}
                >
                  {`${i + 1}.`}
                </span>
                <span
                  className={cx(styles.spiCountryName, {
                    [styles.found]: scrollIndex === i,
                  })}
                >
                  {countryNames[d.name] || d.name}
                </span>
              </button>
              {categories.map((category) =>
                category === 'spi' ? (
                  <span
                    key={category}
                    className={cx(styles.titleText, styles.spiIndex)}
                  >
                    {roundSPI(d[category])}
                  </span>
                ) : (
                  renderBar(category, d)
                )
              )}
            </div>
          ))}
        </div>
      ) : null}
      <div className={styles.legendContainer}>
        <div className={styles.blank} />
        {Object.values(groupBy(LEGEND_ITEMS, 'category')).map(
          (categoryItems) => (
            <div
              key={
                categoryItems && categoryItems[0] && categoryItems[0].category
              }
              className={styles.legendCategoryContainer}
            >
              {categoryItems.map((i) => (
                <div key={i.legend} className={styles.legendItem}>
                  <div
                    className={styles.legendColor}
                    style={{ background: i.color }}
                  />
                  <p>{i.legend}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

RankingChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array,
  className: PropTypes.string,
  searchTerm: PropTypes.string,
  scrollIndex: PropTypes.number.isRequired,
  handleCountryClick: PropTypes.func.isRequired,
};

RankingChart.defaultProps = {
  data: null,
  className: undefined,
  searchTerm: undefined,
};

export default RankingChart;
