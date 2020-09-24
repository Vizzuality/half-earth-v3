import React from 'react';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';
import styles from './country-challenges-modal-additional-styles.module.scss';

const CountryChallengesModalAdditional = () => {
  const renderContinent = (title) => (
    <div key={`legend-${title}`} className={cx(styles.continent)}>
      <span className={cx(styles.legendDot, styles[kebabCase(title)])} />
      <span className={cx(styles.legendContinent, styles[title])}>{title}</span>
    </div>
  );

  const CONTINENTS = [
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North america',
    'Oceania',
    'South america'
  ];

  return (
    <div className={styles.modalAdditionalContent}>
      <div className={styles.countriesLegend}>
        {CONTINENTS.map((continent) => renderContinent(continent))}
      </div>
      <div className={styles.sizesLegend}>
        The bubble's size is proportional to the country's area
        <div className={styles.sizesLegendBubbles}>
          <div className={styles.bubbles}>
            <div className={styles.bubbleContainer}>
              <div className={styles.bubbleCenter}>
                <span className={cx(styles.bubble, styles.bigBubble)} />
              </div>
              <div>LARGER COUNTRIES</div>
            </div>
            <div className={styles.bubbleContainer}>
              <div className={styles.bubbleCenter}>
                <span className={cx(styles.bubble, styles.smallBubble)} />
              </div>
              <div>SMALLER COUNTRIES</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryChallengesModalAdditional;