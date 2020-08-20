import React from 'react';
import styles from './ranking-chart-styles.module.scss';
import cx from 'classnames';
// import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';

const legendText = {
  species: {
    nonEndemic: 'Non endemic species',
    endemic: 'Endemic species'
  },
  human: {
    veryHigh: 'Very high human modification',
    totalMinusVeryHigh: 'human modification'
  },
  protection: {
    protected: 'Protected areas',
    protectionNeeded: 'Protection needed',
    protectionNotNeeded: 'Protection non-needed'
  }
};
const categories = Object.keys(legendText);

const RankingChart = ({ data, className, handleInfoClick }) => {
  const renderBar = (name, d) => ((!d || !d[name]) ? null :
    <div className={styles.fullBar}>
      {Object.keys(d[name]).map(k => (
        <span className={cx(styles.bar, styles[k])} style={{ width: `${d[name][k]}%` }} />
      ))}
    </div>
  );
  const renderHeaderItem = (text) => (
    <div className={cx(styles.headerItem, styles.titleText)} key={text}>
      {text}
      <span className={styles.sortArrows}>
        <span className={styles.arrowUp} />
        <span className={styles.arrowDown} />
      </span>
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
      {data && data.length ?
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
      : null}
    </div>
  );
};

export default RankingChart;