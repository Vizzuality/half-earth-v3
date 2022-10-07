import React, { useMemo } from 'react';

import { useLocale } from '@transifex/react';

import cx from 'classnames';

import getTaxaCategories from 'constants/taxa-selector-categories';

import animationStyles from 'styles/common-animations.module.scss';

import styles from './featured-taxa-styles.module.scss';

function FeaturedTaxaSelectorComponent({
  selectedTaxa,
  isFullscreenActive,
  isMapsList,
  selectedFeaturedMap,
  selectedFeaturedPlace,
  handleTaxaButtonClick,
}) {
  const locale = useLocale();
  const taxaCategories = useMemo(() => getTaxaCategories(), [locale]);

  const isOnScreen =
    selectedFeaturedMap === 'priorPlaces' &&
    !isMapsList &&
    !selectedFeaturedPlace &&
    !isFullscreenActive;
  return (
    <div className={styles.wrapper}>
      <div
        className={cx(
          styles.container,
          animationStyles.transformOpacityWithDelay,
          {
            [animationStyles.bottomUp]: !isOnScreen,
          }
        )}
      >
        {taxaCategories.map((t) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            role="button"
            tabIndex="0"
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
}

export default FeaturedTaxaSelectorComponent;
