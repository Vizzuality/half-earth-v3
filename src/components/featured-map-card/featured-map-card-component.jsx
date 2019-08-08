import React from 'react';
import { useSpring, animated } from 'react-spring';
import cx from 'classnames';
import ShareModalButton from 'components/share-modal';
import styles from './featured-map-card-styles.module.scss'
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';

const FeaturesMapCardComponent = ({ 
  view,
  className,
  selectedSidebar,
  isLandscapeMode,
  isFullscreenActive,
  featuredMap,
  handleAllMapsClick
}) => {
  const isOpen = selectedSidebar === 'featuredMapCard';
  const slide = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isOpen && !isLandscapeMode && !isFullscreenActive ? 0 : -400,
    delay: isOpen && !isLandscapeMode && !isFullscreenActive ? 400 : 0
  })
  return (
    <animated.div className={cx(className, styles.cardContainer)} style={slide}>
      <section
        className={styles.titleSection}
        style={ {backgroundImage: `url(${featuredMap.image})`}}
      >
        <ShareModalButton theme={{ shareButton: styles.shareButton}} view={view} />
        <h2 className={styles.title}>{featuredMap.title}</h2>
      </section>
      <section className={styles.descriptionSection}>
        <p className={styles.description}>{featuredMap.description}</p>
        <button
          className={styles.allMapsButton}
          onClick={handleAllMapsClick}
        >
          <span className={styles.buttonText}>All maps</span>
          <ChevronIcon className={styles.arrowIcon}/>
        </button>
      </section>
    </animated.div>
  )
}

export default FeaturesMapCardComponent;