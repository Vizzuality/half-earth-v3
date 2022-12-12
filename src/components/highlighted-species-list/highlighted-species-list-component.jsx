import React from 'react';

import { useT } from '@transifex/react';

import speciesPlaceholder from 'images/speciesPlaceholder.svg';

import styles from './highlighted-species-list-styles.module.scss';

function HighlightedSpeciesListComponent({ highlightedSpecies }) {
  const t = useT();

  return (
    <div className={styles.container}>
      {highlightedSpecies &&
        highlightedSpecies.map((species) => (
          <div className={styles.species} key={species.scientificName}>
            <img
              className={styles.image}
              src={species.imageUrl || speciesPlaceholder}
              alt={`${species.name}`}
            />
            <section className={styles.dataSection}>
              <p className={styles.name}>{species.name}</p>
              <p className={styles.scientificName}>{species.scientificName}</p>
              <p className={styles.rangeSentence}>
                {t('Global range protected:')}
              </p>
              <p className={styles.range}>{species.rangeProtected}</p>
            </section>
          </div>
        ))}
    </div>
  );
}

export default HighlightedSpeciesListComponent;
