import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';

import { LightModeContext } from '../../../../context/light-mode';

import styles from './species-info-styles.module.scss';

function SpeciesInfoComponent(props) {
  const { speciesInfo } = props;
  const [taxaImage, setTaxaImage] = useState();

  const { lightMode } = useContext(LightModeContext);
  useEffect(() => {
    if (speciesInfo) {
      if (speciesInfo?.taxa && speciesInfo?.taxa !== 'animals') {
        setTaxaImage(
          `https://mol.org/static/img/groups/taxa_${speciesInfo?.taxa}.png`
        );
      }
    }
  }, [speciesInfo]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.species)}>
      <div className={styles.title}>
        <img
          src={
            speciesInfo?.image.url ??
            `https://mol.org/static/img/groups/taxa_${speciesInfo?.taxa}.png`
          }
          alt="species"
        />
        <div className={styles.info}>
          <span className={styles.commonName}>{speciesInfo?.commonname}</span>
          <span className={styles.taxa}>{speciesInfo?.scientificname}</span>
          {speciesInfo?.image.url && taxaImage && (
            <img src={taxaImage} alt="taxa" />
          )}
        </div>
      </div>
      <p className={styles.description}>{speciesInfo?.info?.[0].content}</p>
    </div>
  );
}

export default SpeciesInfoComponent;
