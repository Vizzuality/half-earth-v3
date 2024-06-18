import React from 'react';

import Button from 'components/button';

import styles from './score-distributions-styles.module.scss';

function ScoreDistributionsComponent() {
  return (
    <div className={styles.temporalTrends}>
      <div className={styles.title}>
        <div className={styles.info}>
          <span className={styles.commonName}>Score Distributions</span>
        </div>
      </div>
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
  );
}

export default ScoreDistributionsComponent;
