import React, { useState, useRef, useEffect, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import PropTypes from 'prop-types';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

// import Dropdown from 'components/dropdown';

import SearchInput from 'components/search-input';

import {
  // SORT_GROUPS,
  // getSortOptions,
  getRankingLegend,
  SORT_GROUPS_SLUGS,
} from 'constants/country-mode-constants';

import { LEGEND_ITEMS } from './ranking-chart-constants';
import styles from './ranking-chart-styles.module.scss';

const categories = Object.keys(SORT_GROUPS_SLUGS);
function RankingChart({
  data,
  coastal,
  className,
  countryISO,
  // handleFilterSelection,
  // selectedFilterOption,
  handleSearchChange,
  handleCountryClick,
  scrollIndex,
  searchTerm,
  selectedLandMarineOption,
  handleLandMarineSelection,
}) {
  const t = useT();
  const locale = useLocale();
  const [hasScrolled, changeHasScrolled] = useState(false);

  const rankingLegend = useMemo(() => getRankingLegend(), [locale]);
  // const sortOptions = useMemo(() => getSortOptions(), [locale]);
  const RANKING_HEADER_LABELS = {
    [SORT_GROUPS_SLUGS.species]: t('species'),
    [SORT_GROUPS_SLUGS.humanModification]: t('human modification'),
    [SORT_GROUPS_SLUGS.protection]: t('protection'),
    [SORT_GROUPS_SLUGS.spi]: t('spi'),
  };

  const tabsData = {
    land: {
      text: t('Land SPI'),
    },
    marine: {
      text: t('Marine SPI'),
    },
  };

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
        <div>
          {Object.keys(tabsData).map((key) => (
            <button
              key={key}
              disabled={!coastal}
              type="button"
              className={cx({
                [styles.switchDataButton]: true,
                [styles.switchDataActiveButton]:
                  selectedLandMarineOption.slug === key,
              })}
              onClick={() => handleLandMarineSelection(key)}
            >
              {tabsData[key].text}
            </button>
          ))}
        </div>

        {/*
        <span className={cx(styles.chartTitle, styles.filterTitle)}>
          {t('sort countries')}
        </span>
        <div className={styles.dropdownWrapper}>
          <Dropdown
            width="full"
            parentWidth="410px"
            options={sortOptions}
            groups={SORT_GROUPS}
            selectedOption={selectedFilterOption}
            handleOptionSelection={handleFilterSelection}
          />
        </div> */}
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
                  type="button"
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
