import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ranking-chart-styles.module.scss';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import { SORT } from './ranking-chart';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';
import { ReactComponent as Arrow } from 'icons/arrow_right.svg';

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

  const renderBar = (name, d) =>
    !d || !d[name] ? null : (
      <Tooltip
        html={
          <div className={styles.tooltip}>
            <div className={styles.labels}>
              {Object.keys(d[name]).map((key) => (
                <div>{legendText[name][key]}: </div>
              ))}
            </div>
            <div className={styles.values}>
              {Object.keys(d[name]).map((key) => (
                <div
                  className={cx(styles.valuesBox, styles[key])}
                  style={{
                    height: `${100 / Object.keys(d[name]).length}%`
                  }}
                >
                  {Math.floor(d[name][key] * 100) / 100}%
                </div>
              ))}
            </div>
          </div>
        }
        animation="none"
        position="bottom"
      >
        <div className={styles.fullBar}>
          {Object.keys(d[name]).map((k) => (
            <span
              className={cx(styles.bar, styles[k])}
              style={{ width: `${d[name][k]}%` }}
            />
          ))}
        </div>
      </Tooltip>
    );

  const renderHeaderItem = (category) => {
    const sortedCategory =
      sortRankingCategory && sortRankingCategory.split('-')[0];
    const direction = sortRankingCategory && sortRankingCategory.split('-')[1];
    return (
      <button
        className={cx(styles.headerItem, styles.titleText)}
        key={category}
        onClick={() => handleSortClick(category)}
      >
        {category}
        <span className={styles.sortArrows}>
          {(!sortRankingCategory ||
            (sortedCategory === category && direction === SORT.ASC)) && (
            <span className={styles.arrowUp} />
          )}
          {(!sortRankingCategory ||
            (sortedCategory === category && direction === SORT.DESC)) && (
            <span className={styles.arrowDown} />
          )}
        </span>
      </button>
    );
  };

  const renderTable = () => (
    <div className={styles.table}>
      <div className={cx(styles.row, styles.header)}>
        {categories.map((category) => renderHeaderItem(category.toUpperCase()))}
      </div>
      {data.map((d) => (
        <div className={styles.row} key={d.name}>
          {categories.map((category) => renderBar(category, d))}
          <div className={styles.spiCountry}>
            <span className={cx(styles.titleText, styles.spiIndex)}>
              {d.index}.
            </span>
            <button
              className={cx(styles.titleText, styles.spiCountryText)}
              onClick={() => handleCountryClick(d.iso, d.name)}
            >{`${d.name} (${d.spi})`}</button>
          </div>
        </div>
      ))}
    </div>
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
            className={styles.rankingChartContent}
            onScroll={onScroll}
            ref={tableRef}
          >
            {renderTable()}
            <div className={cx(styles.scrollHint, { [styles.fade]: hasScrolled })}>
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
  handleInfoClick: PropTypes.func.isRequired,
  sortRankingCategory: PropTypes.func.isRequired,
  handleSortClick: PropTypes.func.isRequired,
  handleCountryClick: PropTypes.func.isRequired
};

export default RankingChart;