import React from 'react';
import { useSpring, animated } from 'react-spring';
import cx from 'classnames';
import ShareModalButton from 'components/share-modal';
import styles from './featured-map-card-styles.module.scss'
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';

const FeaturesMapCardComponent = ({ view, className, isSidebarOpen, isLandscapeMode, isFullscreenActive }) => {
  const slide = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isSidebarOpen && !isLandscapeMode && !isFullscreenActive ? 0 : -400,
    delay: isSidebarOpen && !isLandscapeMode && !isFullscreenActive ? 400 : 0
  })
  return (
    <animated.div className={cx(className, styles.cardContainer)} style={slide}>
      <section
        className={styles.titleSection}
        style={ {backgroundImage: `url('https://www.explore-atacama.com/fotos/guias/full/llama-2-1346707018.jpg')`}}
      >
        <ShareModalButton theme={{ shareButton: styles.shareButton}} view={view} />
        <h2 className={styles.title}>E.O. Wilson’s best places in the Biosphere</h2>
      </section>
      <section className={styles.descriptionSection}>
        <p className={styles.description}>Extracted from the Half-Earth book, these are the personal choices of E. O. Wilson. These places stand out because of their richness, uniqueness or need of research and protection. </p>
        <button className={styles.allMapsButton}>
          <span className={styles.buttonText}>All maps</span>
          <ChevronIcon className={styles.arrowIcon}/>
        </button>
      </section>
    </animated.div>
  )
}

export default FeaturesMapCardComponent;