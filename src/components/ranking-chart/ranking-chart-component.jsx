import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import HeaderItem from 'components/header-item';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';
import { ReactComponent as Arrow } from 'icons/arrow_right.svg';
import styles from './ranking-chart-styles.module.scss';

const legendText = {
  species: {
    nonEndemic: 'Non endemic species',
    endemic: 'Endemic species'
  },
  human: {
    veryHigh: 'Very high human modification',
    totalMinusVeryHigh: 'Human modification',
    noModification: 'No human modification'
  },
  protection: {
    protected: 'Protected areas',
    protectionNeeded: 'Protection needed',
    protectionNotNeeded: 'Protection non-needed'
  }
};
const categories = Object.keys(legendText);


const RankingChart = ({
  data,
  className,
  countryISO,
  handleInfoClick,
  sortRankingCategory,
  handleSortClick,
  handleCountryClick
}) => {
  const [hasScrolled, changeHasScrolled] = useState(false);
  const tableRef = useRef();

  const onScroll = () => {
    if (!hasScrolled) {
      changeHasScrolled(true);
    }
  }

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
              height: `${100 / Object.keys(d[name]).length}%`
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

  const renderLegend = () => (
    <div className={styles.legend}>
      {Object.keys(legendText).map((category) => (
        <div className={styles.legendBlock} key={`legend-${category}`}>
          {Object.keys(legendText[category]).map((text) => (
            <div className={styles.legendItem} key={`legend-item-${text}`}>
              <span className={cx(styles.legendColor, styles[text])} />
              <span className={styles.legendText}>
                {legendText[category][text]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={className}>
      <div className={styles.chartTitleContainer}>
        <span className={styles.chartTitle}>
          Ranking Species Protection Index
        </span>
        <QuestionIcon className={styles.question} onClick={handleInfoClick} />
      </div>
      {data && data.length ? (
        <div className={styles.rankingChartContentContainer}>
          <div
            className={cx(styles.rankingChartContent, {
              [styles.scrolled]: hasScrolled
            })}
            onScroll={onScroll}
            ref={tableRef}
          >
            <div className={styles.header}>
              {categories.map((category) => (
                <HeaderItem
                  title={category.toUpperCase()}
                  key={category}
                  className={cx(styles.headerItem, styles.titleText)}
                  isSortSelected={
                    sortRankingCategory &&
                    sortRankingCategory.split('-')[0] &&
                    sortRankingCategory.split('-')[0] === category.toUpperCase()
                  }
                  sortDirection={
                    sortRankingCategory && sortRankingCategory.split('-')[1]
                  }
                  handleSortClick={handleSortClick}
                />
              ))}
            </div>
            <div className={styles.table}>
              {data.map((d) => (
                <div className={styles.row} key={d.name}>
                  {categories.map((category) => renderBar(category, d))}
                  <div className={styles.spiCountry}>
                    <span className={cx(
                      styles.titleText,
                      styles.spiIndex,
                      {[styles.selectedCountry]: countryISO === d.iso}
                    )}>
                      {d.index}.
                    </span>
                    <button
                      className={styles.spiCountryText}
                      onClick={() => handleCountryClick(d.iso, d.name)}
                    >
                      <span className={cx(
                        styles.spiCountryName,
                        {[styles.selectedCountry]: countryISO === d.iso}
                      )}>
                        {d.name}
                      </span>
                      <span className={cx(
                        styles.spiCountryIndex,
                        {[styles.selectedCountry]: countryISO === d.iso}
                      )}>
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
          {renderLegend()}
        </div>
      ) : null}
    </div>
  );
};

RankingChart.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  sortRankingCategory: PropTypes.string,
  handleInfoClick: PropTypes.func.isRequired,
  handleSortClick: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired
};

export default RankingChart;