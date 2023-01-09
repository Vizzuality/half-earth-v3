import React, { useState, useRef, useEffect, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import PropTypes from 'prop-types';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import SearchInput from 'components/search-input';

import {
  getRankingLegend,
  SORT_GROUPS_SLUGS,
} from 'constants/country-mode-constants';

import { LEGEND_ITEMS } from './ranking-chart-constants';
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
}) {
  const t = useT();
  const locale = useLocale();
  const [hasScrolled, changeHasScrolled] = useState(false);

  const rankingLegend = useMemo(() => getRankingLegend(), [locale]);
  const RANKING_HEADER_LABELS = {
    [SORT_GROUPS_SLUGS.species]: t('species'),
    [SORT_GROUPS_SLUGS.humanModification]: t('human modification'),
    [SORT_GROUPS_SLUGS.protection]: t('protection'),
    [SORT_GROUPS_SLUGS.spi]: t('spi'),
  };

  const tableRef = useRef();
  useEffect(() => {
    if (scrollIndex > -1 && tableRef.current) {
      tableRef.current.scroll(0, ROW_HEIGHT * scrollIndex);
    }
  }, [scrollIndex, tableRef]);

  useEffect(() => {
    const selectedCountry = data.find((d) => d.iso === countryISO);
    if (selectedCountry) {
      const PADDING = 30;
      tableRef.current.scroll(0, ROW_HEIGHT * selectedCountry.index - PADDING);
    }
  }, [selectedLandMarineOption]);

  const onScroll = () => {
    if (!hasScrolled) {
      changeHasScrolled(true);
    }
  };

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
            {Math.floor(d[name][key] * 100) / 100}%
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
        <span className={styles.chartTitle}>{t('Ranking by')}</span>
      </div>
      <div className={styles.header}>
        <SearchInput
          className={styles.searchInput}
          placeholder={t('Search country')}
          onChange={handleSearchChange}
          value={searchTerm}
        />
        {categories.map((category) => (
          <div
            key={category}
            className={cx(styles.headerItem, {
              [styles.spiHeader]: category === 'spi',
            })}
          >
            <p className={styles.titleText}>{`${RANKING_HEADER_LABELS[
              category
            ].toUpperCase()}`}</p>
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
        </div>
      ) : null}
      <div className={styles.legendContainer}>
        {LEGEND_ITEMS.map((i) => (
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ background: i.color }}
            />
            <p>{i.legend}</p>
          </div>
        ))}
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
