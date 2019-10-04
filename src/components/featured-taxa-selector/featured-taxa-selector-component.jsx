import React from 'react';
import cx from 'classnames';
import taxaCategories from 'constants/taxa-selector-categories';
import animationStyles from 'styles/common-animations.module.scss';

import styles from './featured-taxa-styles.module.scss';

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
        {taxaCategories.map(t => (
          <div key={t.slug} className={styles.taxaButton} onClick={() => handleTaxaButtonClick(t.slug)}>
            <div 
              className={cx(
                styles.taxaIconContainer,
                {[styles.selectedTaxa] : selectedTaxa === t.slug}
              )}
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