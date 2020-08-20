import React from 'react';
import styles from './ranking-chart-styles.module.scss';
import cx from 'classnames';
// import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';
import { ReactComponent as QuestionIcon } from 'icons/borderedQuestion.svg';

const RankingChart = ({ data, className, handleInfoClick }) =>
  console.log('d', data) || (
    <div className={className}>
      <div className={styles.chartTitleContainer}>
        <span className={styles.chartTitle}>
          Ranking Species Protection Index
        </span>
        <QuestionIcon className={styles.question} onClick={handleInfoClick} />
      </div>
      <div className={styles.rankingChartContent}>
        <div className={styles.table}>
          <div className={cx(styles.row, styles.header)}>
            <div className={styles.titleText}>SPECIES</div>
            <div className={styles.titleText}>HUMAN</div>
            <div className={styles.titleText}>PROTECTION</div>
          </div>
          {data.map((d) => (
            <div className={styles.row}>
              <div>
                <span className={cx(styles.bar, styles.species)} />
              </div>
              <div>
                <span className={cx(styles.bar, styles.human)} />
              </div>
              <div>
                <span className={cx(styles.bar, styles.protection)} />
              </div>
              <div>
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
        <div className={styles.titleText}>Legend</div>
      </div>
    </div>
  );

export default RankingChart;