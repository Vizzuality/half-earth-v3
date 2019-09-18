import React from 'react';
import cx from 'classnames';
import { PRIORITY_PLACES_POLYGONS } from 'constants/layers-slugs';
import layersConfig from 'constants/layers-config';
import animationStyles from 'styles/common-animations.module.scss';

import styles from './featured-taxa-styles.module.scss';

const taxa = layersConfig[PRIORITY_PLACES_POLYGONS].categories;

const FeaturedTaxaSelectorComponent = ({
  selectedTaxa,
  isFullscreenActive,
  isLandscapeMode,
  isMapsList,
  selectedFeaturedMap,
  selectedFeaturedPlace,
  handleTaxaButtonClick
}) => {
  const isOnScreen = selectedFeaturedMap === 'priorPlaces' && !isMapsList && !selectedFeaturedPlace && !isLandscapeMode && !isFullscreenActive;
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.container, animationStyles.transformOpacityWithDelay, { [animationStyles.bottomUp]: !isOnScreen })}>
        {taxa.map(t => (
          <div key={t.slug} className={styles.taxaButton} onClick={() => handleTaxaButtonClick(t.slug)}>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedTaxaSelectorComponent;