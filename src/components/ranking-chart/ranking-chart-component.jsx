import React from 'react';
import PropTypes from 'prop-types';
import styles from './ranking-chart-styles.module.scss';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import { SORT } from './ranking-chart';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';


const legendText = {
  species: {
    nonEndemic: 'Non endemic species',
    endemic: 'Endemic species'
  },
  human: {
    veryHigh: 'Very high human modification',
    totalMinusVeryHigh: 'Human modification'
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
  handleSortClick
}) => {
  const renderBar = (name, d) =>
    !d || !d[name] ? null : (
      <Tooltip
        html={
          <div className={styles.tooltip}>
            <div className={styles.labels}>
              {Object.keys(d[name]).map((k) => (
                <div>{legendText[name][k]}: </div>
              ))}
            </div>
            <div className={styles.values}>
              {Object.keys(d[name]).map(
                (k) =>
                  (<div
                    className={cx(styles.valuesBox, styles[k])}
                    style={{
                      height: `${100 / Object.keys(d[name]).length}%`
                    }}
                  >
                    {Math.floor(d[name][k] * 100) / 100}%
                  </div>)
              )}
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
    const sortedCategory = sortRankingCategory && sortRankingCategory.split('-')[0];
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
          <div className={styles.rankingChartContent}>
            <div className={styles.table}>
              <div className={cx(styles.row, styles.header)}>
                {categories.map((c) => renderHeaderItem(c.toUpperCase()))}
              </div>
              {data.map((d) => (
                <div className={styles.row} key={d.name}>
                  {categories.map((c) => renderBar(c, d))}
                  <div className={styles.spiCountry}>
                    <span className={cx(styles.titleText, styles.spiIndex)}>
                      {d.index}.
                    </span>
                    <span className={styles.titleText}>
                      {`${d.name} (${d.spi})`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.legend}>
              {Object.keys(legendText).map((category) => (
                <div className={styles.legendBlock}>
                  {Object.keys(legendText[category]).map((text) => (
                    <div className={styles.legendItem}>
                      <span className={cx(styles.legendColor, styles[text])} />
                      <span className={styles.legendText}>
                        {legendText[category][text]}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
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
  handleInfoClick: PropTypes.func.isRequired,
  sortRankingCategory: PropTypes.func.isRequired,
  handleSortClick: PropTypes.func.isRequired
};

export default RankingChart;