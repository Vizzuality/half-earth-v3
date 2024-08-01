import React, { useContext } from 'react';
import cx from 'classnames';
import styles from './species-info-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';

function SpeciesInfoComponent() {
  const { lightMode } = useContext(LightModeContext);
  return (
    <div className={cx(lightMode ? styles.light : '', styles.species)}>
      <div className={styles.title}>
        <img src="https://place-hold.it/130x130" alt="species" />
        <div className={styles.info}>
          <span className={styles.commonName}>Hamlyns Monkey</span>
          <span className={styles.taxa}>Cercopithecus hamlyni</span>
          <img src="https://place-hold.it/60x60" alt="taxa" />
        </div>
      </div>
      <p className={styles.description}>
        The Hamlyns monkey (Cercopithecus hamlyni), also known as the owl-faced
        monkey, is a species of Old World monkey that inhabits the bamboo and
        primary rainforests of the Congo. This species is exceedingly rare and
        known only from a few specimens; little is known about it.
      </p>
    </div>
  );
}

export default SpeciesInfoComponent;
