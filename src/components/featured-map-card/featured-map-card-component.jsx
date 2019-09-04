import React, { useEffect } from 'react';
import cx from 'classnames';
import ShareModalButton from 'components/share-modal';
import styles from './featured-map-card-styles.module.scss'
import animationStyles from 'styles/common-animations.module.scss';
import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';

const FeaturesMapCardComponent = ({ 
  view,
  className,
  selectedSidebar,
  isLandscapeMode,
  isFullscreenActive,
  featuredMap,
  handleAllMapsClick,
  selectedFeaturedPlace,
  spinGlobe,
  handle
}) => {
  const isOpen = selectedSidebar === 'featuredMapCard';
  const isOnScreen = isOpen && !isLandscapeMode && !isFullscreenActive && !selectedFeaturedPlace;

  const handleClick = () => {
    handleAllMapsClick();
    view.goTo({ zoom: 1 }).then(() => { spinGlobe(view) });
  }

  // if we first arrive to all maps screen
  useEffect(() => {
    if(!handle && !isOpen) { spinGlobe(view) }
  }, []);

  const isFeatureMapCardVisible = isOnScreen;

  return (
    <div className={cx(className, styles.cardContainer, animationStyles.transform, { [animationStyles.visible]: isFeatureMapCardVisible, [animationStyles.hidden]: !isFeatureMapCardVisible })}>
      <section
        className={styles.titleSection}
        style={ {backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)), url(${featuredMap.image})`}}
      >
        <ShareModalButton theme={{ shareButton: styles.shareButton}} view={view} />
        <h2 className={styles.title}>{featuredMap.title}</h2>
      </section>
      <section className={styles.descriptionSection}>
        <p className={styles.description}>{featuredMap.description}</p>
        <button
          className={styles.allMapsButton}
          onClick={handleClick}
        >
          <span className={styles.buttonText}>All maps</span>
          <ChevronIcon className={styles.arrowIcon}/>
        </button>
      </section>
    </div>
  )
}

export default FeaturesMapCardComponent;