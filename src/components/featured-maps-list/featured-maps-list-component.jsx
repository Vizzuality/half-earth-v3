import React, { useState } from 'react';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';
import styles from './featured-maps-list-styles.module';

const FeaturedMapsListComponent = ({ 
  className,
  featuredMapsList,
  selectedSidebar,
  isLandscapeMode,
  isFullscreenActive,
  handleFeaturedMapClick,
  handleFeatureMapHover
}) => {
  const isOpen = selectedSidebar === 'featuredMapsList';
  const slide = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isOpen && !isLandscapeMode && !isFullscreenActive ? 0 : -400,
    delay: isOpen && !isLandscapeMode && !isFullscreenActive ? 400 : 0
  })

  const defaultCardOpen = featuredMapsList[0];
  const [cardSelected, setCardSelected] = useState(false);
  const [cardOpen, setCardOpen] = useState(defaultCardOpen);

  const mouseOver = (card) => { setCardOpen(card); handleFeatureMapHover(card.slug) };
  const mouseOut = () => {
    if(!cardSelected) {
      setCardOpen(defaultCardOpen);
      handleFeatureMapHover(defaultCardOpen.slug);
    }
  };

  const handleClick = (card) => {
    setCardSelected(true);
    handleFeaturedMapClick(card.slug);
  };

  return (
    <animated.div className={cx(className, styles.cardsContainer)} style={slide}>
      <div className={styles.scrollable}>
        {featuredMapsList.map(featuredMap => (
          <div className={cx(styles.card, { [styles.border]: cardOpen.slug === featuredMap.slug })}
            onClick={() =>  handleClick(featuredMap)}
            onMouseOver={() => mouseOver(featuredMap)}
            onMouseOut={mouseOut}
          >
            <section
              className={styles.titleSection}
              style={ {backgroundImage: `url(${featuredMap.image})`}}
            >
              <h2 className={styles.title}>{featuredMap.title}</h2>
            </section>
            {cardOpen.slug === featuredMap.slug && <section className={styles.descriptionSection}>
              <p className={styles.description}>{featuredMap.description}</p>
            </section>}
          </div>
        ))}
      </div>
    </animated.div>
  )
}

export default FeaturedMapsListComponent;