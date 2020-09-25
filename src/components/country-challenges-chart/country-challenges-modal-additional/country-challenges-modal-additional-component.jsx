import React from 'react';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import { CONTINENTS } from 'constants/country-mode-constants';

import styles from './country-challenges-modal-additional-styles.module.scss';

const CountryChallengesModalAdditional = () => (
  <div className={styles.modalAdditionalContent}>
    <div className={styles.countriesLegend}>
      {CONTINENTS.map((continent) => (
        <div key={`legend-${continent}`} className={cx(styles.continent)}>
          <span className={cx(styles.legendDot, styles[kebabCase(continent)])} />
          <span className={cx(styles.legendContinent, styles[continent])}>{continent}</span>
        </div>
      ))}
    </div>
  </div>
);

export default CountryChallengesModalAdditional;