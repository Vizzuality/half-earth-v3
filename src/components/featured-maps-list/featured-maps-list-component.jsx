import React, { useState } from 'react';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import styles from './featured-maps-list-styles.module';

const FeaturedMapsListComponent = ({ 
  className,
  featuredMapsList,
  selectedSidebar,
  isLandscapeMode,
  isFullscreenActive,
  handleFeaturedMapClick,
  handleFeatureMapHover,
  handle,
  view
}) => {
  const isOpen = selectedSidebar === 'featuredMapsList';
  const slide = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isOpen && !isLandscapeMode && !isFullscreenActive ? 0 : -400,
    delay: isOpen && !isLandscapeMode && !isFullscreenActive ? 400 : 0
  })

  const [cardOpen, setCardOpen] = useState(null);

  const resetCardOpen = () => setCardOpen(null);
  const mouseOver = (card) => { setCardOpen(card); handleFeatureMapHover(card.slug) };

  const handleClick = (card) => {
    resetCardOpen();
    handleFeaturedMapClick(card.slug);
    if (handle) {
      handle.remove();
    }
  };

  return (
    <animated.div className={cx(className, styles.cardsContainer)} style={slide}>
      {featuredMapsList && <button
        className={styles.button}
        onClick={() => handleClick(featuredMapsList[0])}
      >
        <ArrowExpandIcon className={styles.icon} />
        <span className={styles.backButton}>BACK</span>
      </button>}
      <div className={styles.scrollable}>
        {featuredMapsList && featuredMapsList.map(featuredMap => (
          <div className={cx(styles.card, { [styles.border]: cardOpen && cardOpen.slug === featuredMap.slug })}
            onClick={() =>  handleClick(featuredMap)}
            onMouseOver={() => mouseOver(featuredMap)}
          >
            <section
              className={styles.titleSection}
              style={ {backgroundImage: `url(${featuredMap.image})`}}
            >
              <h2 className={styles.title}>{featuredMap.title}</h2>
            </section>
            {cardOpen && cardOpen.slug === featuredMap.slug && <section className={styles.descriptionSection}>
              <p className={styles.description}>{featuredMap.description}</p>
            </section>}
          </div>
        ))}
      </div>
    </animated.div>
  )
}

export default FeaturedMapsListComponent;