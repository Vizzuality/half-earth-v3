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
    </div>
  );
};

export default CountryChallengesModalAdditional;