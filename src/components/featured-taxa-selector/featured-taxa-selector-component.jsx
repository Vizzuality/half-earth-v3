import React from 'react';
import cx from 'classnames';
import { PRIORITY_PLACES_POLYGONS } from 'constants/layers-slugs';
import layersConfig from 'constants/layers-config';

import styles from './featured-taxa-styles.module.scss';

const taxa = layersConfig[PRIORITY_PLACES_POLYGONS].categories;

const FeaturedTaxaSelectorComponent = ({
  selectedTaxa,
  handleTaxaButtonClick
}) => (
  <div className={styles.container}>
    {taxa.map(t => (
      <button className={styles.taxaButton} onClick={() => handleTaxaButtonClick(t.slug)}>
        <div 
          className={cx(
            styles.taxaIconContainer,
            {[styles.selectedTaxa] : selectedTaxa === t.slug}
          )}
          style={{backgroundColor: `${t.color}`}}
        >
          <t.icon />
        </div>
        <p className={styles.taxaName}>{t.title}</p>
      </button>
    ))}
  </div>
)

export default FeaturedTaxaSelectorComponent;