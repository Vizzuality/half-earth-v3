import React, { useEffect, useRef } from 'react';
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';
import { ReactComponent as GoToIcon } from 'icons/go_to.svg';
import cx from 'classnames';
import animationStyles from 'styles/common-animations.module.scss';
import { isMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import ShareModalButton from 'components/share-modal';
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
  view
}) => {

  const isOnMobile = isMobile();
  const isOnScreen = selectedFeaturedPlace && !isLandscapeMode && !isFullscreenActive;
  const visibleOnMobile = isOnMobile && activeOption === FOOTER_OPTIONS.ADD_LAYER && selectedFeaturedPlace;
  
  const contentWrapper = useRef();
  useEffect(() => {
    contentWrapper.current.scrollTop = 0;
  }, [featuredPlace])

  return (
    <div className={cx(styles.container, { [animationStyles.bottomHidden]: !visibleOnMobile && isOnMobile })}>
      <div className={cx(styles.content, animationStyles.transformOpacityWithDelay, { [animationStyles.bottomUp]: !isOnScreen && !isOnMobile })}>
        <nav className={styles.navigation}>
          <div
            className={styles.backToMap}
            onClick={handleAllMapsClick}
          >
            <ChevronIcon className={styles.arrowIcon}/>
            {isOnMobile && <h3 className={styles.text}>Back</h3>}
            {featuredMap && !isOnMobile && <h3 className={styles.text}>{featuredMap.title}</h3>}
          </div>
          <div className={styles.placesNavigator}>
            <div
              className={styles.arrowWrapper}
              onClick={e => handlePrevPlaceClick(selectedFeaturedPlace)}
            >
              <ChevronIcon className={styles.leftArrow}/>
            </div>
            <div className={styles.separator} />
            <div
              className={styles.arrowWrapper}
              onClick={e => handleNextPlaceClick(selectedFeaturedPlace)}
            >
              <ChevronIcon className={styles.rightArrow} />
            </div>
          </div>
        </nav>
        {isOnMobile && <div className={styles.spacerContainer}>
          <div className={styles.spacer} />
        </div>}
        <section className={styles.cardGrid}>
          {featuredPlace &&
            <>
              {isOnMobile && <h2 className={styles.title}>{featuredPlace.title}</h2>}
              <div className={styles.pictureContainer}>
                <ShareModalButton theme={{ shareButton: styles.shareButton}} view={view} />
                {featuredPlace.image && 
                  <img
                    src={featuredPlace.image}
                    className={styles.picture}
                    alt={featuredPlace.title}
                    onClick={handleLandscapeTrigger}
                  />
                }
              </div>
              {!isOnMobile && 
                <button
                  className={styles.landscapeTriggerButton}
                  onClick={handleLandscapeTrigger}
                >
                  <GoToIcon className={styles.icon} />
                  <span className={styles.landscapeTriggerText}>explore this area</span>
                </button>
              }
              <div className={styles.contentContainer} ref={contentWrapper}>
                {!isOnMobile && <h2 className={styles.title}>{featuredPlace.title}</h2>}
                <div>
                  <p className={styles.text}>
                    {featuredPlace.description}
                  </p>
                  {featuredMap && featuredMap.sourceText && <span className={styles.sourceText}>(Source: <i>{featuredMap.sourceText}</i>)</span>}
                </div>
              </div>
            </>
          }
        </section>
        {isOnMobile && (
          <div className={styles.exploreAreaButtonContainer}>
            <button onClick={handleLandscapeTrigger} className={styles.exploreAreaButton}>Explore this area</button>
          </div>
        )}
        </div>
    </div>
  )
}

export default FeaturedPlaceCardComponent;