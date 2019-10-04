import React, { useState } from 'react';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';

import { isMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';

import animationStyles from 'styles/common-animations.module.scss';
import styles from './featured-maps-list-styles.module';

const FeaturedMapsListComponent = ({ 
  featuredMapsList,
  selectedSidebar,
  selectedFeaturedMap,
  selectedFeaturedPlace,
  isLandscapeMode,
  isFullscreenActive,
  handleFeaturedMapClick,
  handleFeatureMapHover,
  handle,
  view,
  activeOption
}) => {
  const isOpen = selectedSidebar === 'featuredMapsList';
  
  const isOnMobile = isMobile();
  const isActive = activeOption === FOOTER_OPTIONS.ADD_LAYER;

  const visibleOnMobile = isOnMobile && isActive && isOpen && !selectedFeaturedPlace;

  const isMapsListVisible = (isOpen && !isLandscapeMode && !isFullscreenActive && !isOnMobile) || visibleOnMobile;

  const [cardOpen, setCardOpen] = useState(null);

  const isCardSelected = (featuredMap) => {
    return cardOpen && cardOpen.slug === featuredMap.slug;
  }

  const isHiddenOnMobile = (featuredMap) => {
    return isOnMobile && selectedFeaturedMap && !isCardSelected(featuredMap);
  }

  const resetCardOpen = () => setCardOpen(null);
  const mouseOver = (card) => { 
    setCardOpen(card); 
    handleFeatureMapHover(card.slug) 
  };

  const selectCard = (card) => {
    resetCardOpen();
    handleFeaturedMapClick(card.slug);
    if (handle) {
      handle.remove();
    }
  }

  const handleClick = (card) => {
    if (!isOnMobile) { selectCard(card); } 
    else { mouseOver(card); }
  };

  return (
    <div className={cx(styles.cardsContainer, { [animationStyles.leftHidden]: !isMapsListVisible && !isOnMobile, [animationStyles.bottomHidden]: !isMapsListVisible && isOnMobile, [styles.delayOnIn]: isMapsListVisible })}>
      {featuredMapsList && <button
        className={styles.button}
        onClick={() => handleClick(featuredMapsList[0])}
      >
        <ArrowExpandIcon className={styles.icon} />
        <span className={styles.backButton}>BACK</span>
      </button>}
      <div className={styles.scrollable}>
        {featuredMapsList && featuredMapsList.map(featuredMap => (
          <div key={featuredMap.slug} className={cx(styles.card, { [styles.border]: isCardSelected(featuredMap), [styles.hidden]: isHiddenOnMobile(featuredMap) })}
            onClick={() =>  handleClick(featuredMap)}
            onMouseOver={() => mouseOver(featuredMap)}
          >
            <section
              className={styles.titleSection}
              style={ {backgroundImage: `url(${featuredMap.image})`}}
            >
              <h2 className={styles.title}>{featuredMap.title}</h2>
            </section>
            {selectedFeaturedMap && cardOpen && cardOpen.slug === featuredMap.slug && <section className={styles.descriptionSection}>
              <p className={styles.description}>{featuredMap.description}</p>
              {isOnMobile && (
                <div className={styles.selectMapButtonContainer}>
                  <button className={styles.selectMapButton} onClick={() => selectCard(featuredMap)}>
                    Show these places on the map
                  </button>
                </div>
              )}
            </section>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedMapsListComponent;