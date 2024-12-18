import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';

import { TAXA_IMAGE_URL } from 'constants/dashboard-constants.js';

import CongoImage from 'images/dashboard/Congolacerta_vauereselli_hendrick_hinkel.jpg';
import HypImage from 'images/dashboard/Hyperolius_tuberculatus_brian_gratwicke.jpg';
import LepImage from 'images/dashboard/Leptopelis_christyi_gauvain_saucy.jpeg';

import { LightModeContext } from '../../../../context/light-mode';

import styles from './species-info-styles.module.scss';

function SpeciesInfoComponent(props) {
  const { speciesInfo } = props;
  const [taxaImage, setTaxaImage] = useState();
  const [speciesImage, setSpeciesImage] = useState();

  const { lightMode } = useContext(LightModeContext);
  useEffect(() => {
    if (speciesInfo) {
      const spImage =
        speciesInfo?.image.url ?? `${TAXA_IMAGE_URL}${speciesInfo?.taxa}.png`;

      if (speciesInfo?.taxa && speciesInfo?.taxa !== 'animals') {
        setTaxaImage(`${TAXA_IMAGE_URL}${speciesInfo?.taxa}.png`);
      }

      if (speciesInfo.scientificname === 'Leptopelis christyi') {
        setSpeciesImage(LepImage);
      } else if (speciesInfo.scientificname === 'Congolacerta vauereselli') {
        setSpeciesImage(CongoImage);
      } else if (speciesInfo.scientificname === 'Hyperolius tuberculatus') {
        setSpeciesImage(HypImage);
      } else {
        setSpeciesImage(spImage);
      }
    }
  }, [speciesInfo]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.species)}>
      <div className={styles.title}>
        <img src={speciesImage} alt="species" />
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
