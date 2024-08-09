import React, { useContext, useEffect } from 'react';
import cx from 'classnames';
import styles from './species-info-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';

function SpeciesInfoComponent(props) {
  const { speciesInfo } = props;

  const { lightMode } = useContext(LightModeContext);
  useEffect(() => {
    console.log(speciesInfo);


  }, [])

  return (
    <div className={cx(lightMode ? styles.light : '', styles.species)}>
      <div className={styles.title}>
        <img src="https://place-hold.it/130x130" alt="species" />
        <div className={styles.info}>
          <span className={styles.commonName}>{speciesInfo?.commonname}</span>
          <span className={styles.taxa}>{speciesInfo?.scientificname}</span>
          <img src="https://place-hold.it/60x60" alt="taxa" />
        </div>
      </div>
      <p className={styles.description}>
        {speciesInfo?.info?.[0].content}
      </p>
    </div>
  );
}

export default SpeciesInfoComponent;
