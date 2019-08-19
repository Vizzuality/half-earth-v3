import React from 'react';
import { useSpring, animated } from 'react-spring';
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';
import styles from './featured-place-card-styles.module';

const FeaturedPlaceCardComponent = ({
  selectedFeaturedPlace,
  isLandscapeMode,
  isFullscreenActive,
  featuredMap,
  featuredPlace,
  handleAllMapsClick,
  handleNextPlaceClick,
  handlePrevPlaceClick
}) => {

  const isOnScreen = selectedFeaturedPlace && !isLandscapeMode && !isFullscreenActive;
  const animationConfig = { mass: 5, tension: 2000, friction: 200 }
  const slide = useSpring({
    config: animationConfig,
    from: { bottom: -400, opacity: 0 },
    bottom: isOnScreen ? 0 : -400,
    opacity: isOnScreen ? 1 : 0,
    delay: isOnScreen ? 400 : 0,
  })

  return (
    <div className={styles.container}>
      <animated.div className={styles.content} style={slide}>
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
              <div className={styles.pictureContainer}>
                <img src={featuredPlace.image} className={styles.picture} alt={featuredPlace.title}/>
              </div>
              <h2 className={styles.title}>{featuredPlace.title}</h2>
              <p className={styles.text}>{featuredPlace.description}</p>
            </>
          }
        </section>
      </animated.div>
    </div>
  )
}

export default FeaturedPlaceCardComponent;