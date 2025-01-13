import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import TaxaImageComponent from 'components/taxa-image';

import { TAXA_IMAGE_URL } from 'constants/dashboard-constants';

import styles from './species-info-styles.module.scss';

function SpeciesInfoComponent(props) {
  const { speciesInfo } = props;
  const [speciesImage, setSpeciesImage] = useState();
  const [wikiLink, setWikiLink] = useState();

  const { lightMode } = useContext(LightModeContext);
  useEffect(() => {
    if (speciesInfo) {
      const spImage =
        speciesInfo?.image.url ??
        `${TAXA_IMAGE_URL}${speciesInfo?.taxa}_icon.svg`;

      setSpeciesImage(spImage);

      setWikiLink(
        `https://en.wikipedia.org/wiki/${speciesInfo.scientificname.replace(
          ' ',
          '_'
        )}`
      );
    }
  }, [speciesInfo]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.species)}>
      <div className={styles.title}>
        <img src={speciesImage} alt="species" />
        <div className={styles.info}>
          <span className={styles.commonName}>{speciesInfo?.commonname}</span>
          <span className={styles.taxa}>{speciesInfo?.scientificname}</span>
          <TaxaImageComponent taxa={speciesInfo?.taxa} />
        </div>
      </div>
      <p className={styles.description}>{speciesInfo?.info?.[0].content}</p>
      <div className={styles.source}>
        <span>Source:</span>
        <a href={wikiLink} target="_blank" rel="noreferrer">
          Wikipedia
        </a>
      </div>
    </div>
  );
}

export default SpeciesInfoComponent;
