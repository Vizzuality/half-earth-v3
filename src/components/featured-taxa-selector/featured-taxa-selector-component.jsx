import React, { useMemo } from 'react';
import cx from 'classnames';
import getTaxaCategories from 'constants/taxa-selector-categories';
import animationStyles from 'styles/common-animations.module.scss';
import { useLocale } from '@transifex/react';
import { useMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';

import styles from './featured-taxa-styles.module.scss';

const FeaturedTaxaSelectorComponent = ({
  selectedTaxa,
  isFullscreenActive,
  isLandscapeMode,
  isMapsList,
  selectedFeaturedMap,
  selectedFeaturedPlace,
  handleTaxaButtonClick,
  activeOption,
}) => {
  const isOnMobile = useMobile();
  const locale = useLocale();
  const taxaCategories = useMemo(() => getTaxaCategories(), [locale]);

  const isActive = activeOption === FOOTER_OPTIONS.ADD_LAYER;
  const isOnScreen =
    selectedFeaturedMap === 'priorPlaces' &&
    !isMapsList &&
    !selectedFeaturedPlace &&
    !isLandscapeMode &&
    !isFullscreenActive;
  const isOnMobileScreen = isActive && isOnScreen;
  return (
    <div className={styles.wrapper}>
      <div
        className={cx(
          styles.container,
          animationStyles.transformOpacityWithDelay,
          {
            [animationStyles.bottomUp]: isOnMobile
              ? !isOnMobileScreen
              : !isOnScreen,
          }
        )}
      >
        {taxaCategories.map((t) => (
          <div
            key={t.slug}
            className={styles.taxaButton}
            onClick={() => handleTaxaButtonClick(t.slug)}
          >
            <div
              className={cx(styles.taxaIconContainer, {
                [styles.selectedTaxa]: selectedTaxa === t.slug,
              })}
            >
              <t.icon />
            </div>
            <p className={styles.taxaName}>{t.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTaxaSelectorComponent;
