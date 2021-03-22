import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';
import { ReactComponent as GoToIcon } from 'icons/go_to.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import cx from 'classnames';
import animationStyles from 'styles/common-animations.module.scss';
import { useMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import Button from 'components/button';
import ShareModalButton from 'components/share-button';
import ShareModal from 'components/share-modal';
import styles from './featured-place-card-styles.module';

const FeaturedPlaceCardComponent = ({
  selectedFeaturedPlace,
  isLandscapeMode,
  isFullscreenActive,
  featuredMap,
  featuredPlace,
  handleAllMapsClick,
  handleNextPlaceClick,
  handlePrevPlaceClick,
  handleLandscapeTrigger,
  activeOption,
  hotspotsNumbers
}) => {
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
          <Button
            type="rounded"
            handleClick={handleAllMapsClick}
            Icon={CloseIcon}
            className={styles.backButton}
            tooltipText="Go back to all maps"
          />
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
                    onClick={handleLandscapeTrigger}
                  />
                )}
              </div>
              {!isOnMobile && (
                <button
                  className={styles.landscapeTriggerButton}
                  onClick={handleLandscapeTrigger}
                >
                  <GoToIcon className={styles.icon} />
                  <span className={styles.landscapeTriggerText}>
                    explore this area
                  </span>
                </button>
              )}
              <div className={styles.contentContainer} ref={contentWrapper}>
                {!isOnMobile && (
                  <h2 className={styles.title}>{featuredPlace.title}</h2>
                )}
                <div>
                  <p className={styles.text}>{featuredPlace.description}</p>
                  {featuredMap && featuredMap.sourceText && (
                    <span className={styles.sourceText}>
                      (Source: <i>{featuredMap.sourceText}</i>)
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
        {isOnMobile && (
          <div className={styles.exploreAreaButtonContainer}>
            <button
              onClick={handleLandscapeTrigger}
              className={styles.exploreAreaButton}
            >
              Explore this area
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPlaceCardComponent;