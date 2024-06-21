import React from 'react';

import Button from 'components/button';

import styles from '../dashboard-trends-sidebar-styles.module.scss';

import ScoreDistributionChartContainer from './score-distributions-chart';

function ScoreDistributionsComponent(props) {
  return (
    <div className={styles.trends}>
      <div className={styles.info}>
        <span className={styles.title}>Score Distributions</span>

        <p className={styles.description}>
          View the distribution of the individual Species Protection Scores for
          all terrestrial vertebrates. Amphibians have the lowest average
          protection score while birds have the highest.
        </p>
        <div className={styles.options}>
          <Button
            type="rectangular"
            className={styles.saveButton}
            label="view full table"
          />
          <span className={styles.helpText}>
            Open and download a full table of species SPS and relevant traits at
            national and province levels for a selected year.
          </span>
        </div>
      </div>

      <ScoreDistributionChartContainer {...props} />
    </div>
  );
}

export default ScoreDistributionsComponent;
