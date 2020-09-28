import React from 'react';
import speciesPlaceholder from 'images/speciesPlaceholder.svg';

import styles from './highlighted-species-list-styles.module.scss';

const HighlightedSpeciesListComponent = ({
  highlightedSpecies
}) => (
  <div className={styles.container}>
    {highlightedSpecies && highlightedSpecies.map(species => (
      <div className={styles.species}>
        <img className={styles.image} src={species.imageUrl || speciesPlaceholder} alt={`${species.name}`}/>
        <section className={styles.dataSection}>
          <p className={styles.name}>{species.name}</p>
          <p className={styles.scientificName}>{species.scientificName}</p>
          <p className={styles.rangeSentence}>Global range protected:</p>
          <p className={styles.range}>{species.rangeProtected}</p>
        </section>
      </div>
    ))}
  </div>
)

export default HighlightedSpeciesListComponent;