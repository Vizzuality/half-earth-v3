import React, { useEffect, useRef, useState } from 'react';
import { useT } from '@transifex/react';
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';
import cx from 'classnames';
import animationStyles from 'styles/common-animations.module.scss';
import { useMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import ShareModalButton from 'components/share-button';
import ShareModal from 'components/share-modal';
import styles from './featured-place-card-styles.module';

const FeaturedPlaceCardComponent = ({
  selectedFeaturedPlace,
  isLandscapeMode,
  isFullscreenActive,
  featuredMap,
  featuredPlace,
  handleNextPlaceClick,
  handlePrevPlaceClick,
  activeOption,
  hotspotsNumbers,
}) => {
  const t = useT();

  const isOnMobile = useMobile();
  const isOnScreen =
    selectedFeaturedPlace && !isLandscapeMode && !isFullscreenActive;
  const visibleOnMobile =
    isOnMobile &&
    activeOption === FOOTER_OPTIONS.ADD_LAYER &&
    selectedFeaturedPlace;
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const contentWrapper = useRef();
  useEffect(() => {
    contentWrapper.current.scrollTop = 0;
  }, [featuredPlace]);

  return (
    <div
      className={cx(styles.container, {
        [animationStyles.bottomHidden]: !visibleOnMobile && isOnMobile,
      })}
    >
      <div
        className={cx(
          styles.content,
          animationStyles.transformOpacityWithDelay,
          { [animationStyles.bottomUp]: !isOnScreen && !isOnMobile }
        )}
      >
        <section className={styles.cardGrid}>
          <div className={styles.breadcrumb}>
            {hotspotsNumbers &&
              `${hotspotsNumbers.position} / ${hotspotsNumbers.size} Hotspots`}
          </div>
          <nav className={styles.navigation}>
            <div className={styles.placesNavigator}>
              <div
                className={styles.arrowWrapper}
                onClick={() => handlePrevPlaceClick(selectedFeaturedPlace)}
              >
                <ChevronIcon className={styles.leftArrow} />
              </div>
              <div className={styles.separator} />
              <div
                className={styles.arrowWrapper}
                onClick={() => handleNextPlaceClick(selectedFeaturedPlace)}
              >
                <ChevronIcon className={styles.rightArrow} />
              </div>
            </div>
          </nav>
          {featuredPlace && (
            <>
              {isOnMobile && (
                <h2 className={styles.title}>{featuredPlace.title}</h2>
              )}
              <div className={styles.pictureContainer}>
                <ShareModalButton
                  theme={{ shareButton: styles.shareButton }}
                  setShareModalOpen={setShareModalOpen}
                />
                <ShareModal
                  isOpen={isShareModalOpen}
                  setShareModalOpen={setShareModalOpen}
                />
                {featuredPlace.imageUrl && (
                  <img
                    src={featuredPlace.imageUrl}
                    className={styles.picture}
                    alt={featuredPlace.title}
                  />
                )}
              </div>
              <div className={styles.contentContainer} ref={contentWrapper}>
                {!isOnMobile && (
                  <h2 className={styles.title}>
                    {hotspotsNumbers && `${hotspotsNumbers.position}. `}
                    {featuredPlace.title}
                  </h2>
                )}
                <div>
                  <p className={styles.text}>{featuredPlace.description}</p>
                  {featuredMap && featuredMap.sourceText && (
                    <span className={styles.sourceText}>
                      ({t('Source:')} <i>{featuredMap.sourceText}</i>)
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default FeaturedPlaceCardComponent;
