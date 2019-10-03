import React, { useEffect, useRef } from 'react';
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';
import { ReactComponent as GoToIcon } from 'icons/go_to.svg';
import cx from 'classnames';
import animationStyles from 'styles/common-animations.module.scss';
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
  handleLandscapeTrigger
}) => {

  const isOnScreen = selectedFeaturedPlace && !isLandscapeMode && !isFullscreenActive;
  
  const contentWrapper = useRef();
  useEffect(() => {
    contentWrapper.current.scrollTop = 0;
  }, [featuredPlace])

  return (
    <div className={styles.container}>
      <div className={cx(styles.content, animationStyles.transformOpacityWithDelay, { [animationStyles.bottomUp]: !isOnScreen })}>
        <nav className={styles.navigation}>
          <div
            className={styles.backToMap}
            onClick={handleAllMapsClick}
          >
            <ChevronIcon className={styles.arrowIcon}/>
            {featuredMap && <h3 className={styles.text}>{featuredMap.title}</h3>}
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
        <section className={styles.card}>
          {featuredPlace &&
            <>
              <div className={styles.landscapeTriggerContainer}>
                <img
                  src={featuredPlace.image}
                  className={styles.picture}
                  alt={featuredPlace.title}
                  onClick={handleLandscapeTrigger}
                />
                <button
                  className={styles.landscapeTriggerButton}
                  onClick={handleLandscapeTrigger}
                >
                  <GoToIcon className={styles.icon} />
                  <span className={styles.landscapeTriggerText}>explore this area</span>
                </button>
              </div>
              <div className={styles.contentContainer}>
                <div className={styles.contentWrapper} ref={contentWrapper}>
                  <h2 className={styles.title}>{featuredPlace.title}</h2>
                  <div>
                    <p className={styles.text}>
                      {featuredPlace.description}
                    </p>
                    {featuredMap && featuredMap.sourceText && <span className={styles.sourceText}>(Source: <i>{featuredMap.sourceText}</i>)</span>}
                  </div>
                </div>
              </div>
            </>
          }
        </section>
      </div>
    </div>
  )
}

export default FeaturedPlaceCardComponent;