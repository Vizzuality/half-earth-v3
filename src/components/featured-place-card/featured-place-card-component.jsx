import React from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './featured-place-card-styles.module';

const FeaturedPlaceCardComponent = ({
  selectedFeaturedPlace,
  isLandscapeMode,
  isFullscreenActive,
  featuredPlace
}) => {
  const isOnScreen = selectedFeaturedPlace && !isLandscapeMode && !isFullscreenActive;
  const animationConfig = { mass: 5, tension: 2000, friction: 200 }
  const slide = useSpring({
    config: animationConfig,
    from: { bottom: -400 },
    bottom: isOnScreen ? 0 : -400,
    delay: 400
  })
  return (
    <div className={styles.container}>
      <animated.div className={styles.content} style={slide}>
        <section className={styles.backToMap}>back button</section>
          <section className={styles.card}>
            {featuredPlace &&
              <>
                <div className={styles.pictureContainer}>
                  <img src={featuredPlace.picture} className={styles.picture} alt={featuredPlace.title}/>
                </div>
                <h2>{featuredPlace.title}</h2>
                <p className={styles.text}>{featuredPlace.description}</p>
              </>
            }
          </section>
      </animated.div>
    </div>
  )
}

export default FeaturedPlaceCardComponent;