import React from 'react';
import { PRIORITY_PLACES_POLYGONS } from 'constants/layers-slugs';
import layersConfig from 'constants/layers-config';

import styles from './featured-taxa-styles.module.scss';

const taxa = layersConfig[PRIORITY_PLACES_POLYGONS].categories;

const FeaturedTaxaSelectorComponent = () => (
  <div className={styles.container}>
    {taxa.map(t => (
      <div className={styles.taxaButton}>
        <div className={styles.taxaIconContainer} style={{backgroundColor: `${t.color}`}}>
          <t.icon />
        </div>
        <p className={styles.taxaName}>{t.title}</p>
      </div>
    ))}
  </div>
)

export default FeaturedTaxaSelectorComponent;