import React, { useContext, useEffect, useState } from 'react';

import { useLocale, useT } from '@transifex/react';

import { IUCNStatusTypes } from 'utils/dashboard-utils.js';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';
import TaxaImageComponent from 'components/taxa-image';

import styles from './species-info-styles.module.scss';

function SpeciesInfoComponent(props) {
  const t = useT();
  const locale = useLocale();
  const { speciesInfo } = props;
  const [speciesImage, setSpeciesImage] = useState();
  const [wikiLink, setWikiLink] = useState();
  const [expanded, setExpanded] = useState(false);
  const [showMoreOption, setShowMoreOption] = useState(false);

  const { lightMode } = useContext(LightModeContext);

  const getIUCNLabel = (status) => {
    return t(IUCNStatusTypes[status]);
  };

  const getLanguageContent = (info) => {
    const found = info.find(
      (values) => values.lang.toUpperCase() === locale.toUpperCase()
    );

    if (found) {
      return found.content;
    }
    return info[0].content;
  };

  useEffect(() => {
    if (speciesInfo) {
      let spImage =
        speciesInfo?.image.url ??
        `dashboard/default_photo_${speciesInfo?.taxa}.png`;

      if (speciesInfo?.scientificname === 'Cercopithecus wolfi') {
        spImage =
          'https://inaturalist-open-data.s3.amazonaws.com/photos/103894451/large.jpg';
      } else if (speciesInfo?.scientificname === 'Chiromantis rufescens') {
        spImage =
          'https://inaturalist-open-data.s3.amazonaws.com/photos/81338343/large.jpeg';
      } else if (speciesInfo?.scientificname === 'Psittacus erithacus') {
        spImage =
          'https://inaturalist-open-data.s3.amazonaws.com/photos/47367883/medium.jpg';
      } else if (speciesInfo?.scientificname === 'Bitis nasicornis') {
        spImage =
          'https://inaturalist-open-data.s3.amazonaws.com/photos/395167898/original.jpeg';
      }

      setSpeciesImage(spImage);

      setWikiLink(
        `https://${locale}.wikipedia.org/wiki/${speciesInfo.scientificname.replace(
          ' ',
          '_'
        )}`
      );

      if (
        speciesInfo?.info &&
        getLanguageContent(speciesInfo?.info).length > 600
      ) {
        setShowMoreOption(true);
      } else {
        setShowMoreOption(false);
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
          <TaxaImageComponent taxa={speciesInfo?.taxa} />
          {speciesInfo?.redlist && (
            <span className={cx(styles.status, styles[speciesInfo?.redlist])}>
              {getIUCNLabel(speciesInfo?.redlist)}
            </span>
          )}
        </div>
      </div>
      <p className={cx(styles.description, expanded ? styles.expanded : '')}>
        {speciesInfo?.info && getLanguageContent(speciesInfo?.info)}
      </p>
      <div className={styles.actions}>
        {showMoreOption && (
          <Button
            type="rectangular"
            className={styles.showMore}
            label={expanded ? t('Show less') : t('Show more')}
            handleClick={() => setExpanded(!expanded)}
          />
        )}
        <div className={styles.source}>
          <span>{t('Source')}:</span>
          <a href={wikiLink} target="_blank" rel="noreferrer">
            {t('Wikipedia')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default SpeciesInfoComponent;
