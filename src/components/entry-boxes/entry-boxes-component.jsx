import React from 'react';
import { useTrail, animated } from 'react-spring';
import styles from 'styles/ui.module';

import CategoryBox from 'components/category-box';

const categories = [
  { name: 'Biodiversity', id: 1 },
  { name: 'Existing protection', id: 2 },
  { name: 'Human pressures', id: 3 }
];

const EntryBoxesComponent = ({ view, isCategoriesBoxesVisible, activeCategory, closeEntryBoxes, openSidebar, setActiveCategory, setCategoryBoxesAnimationEnded }) => {
  const config = { mass: 5, tension: 2000, friction: 200 }

  const interfaceLoaded = view.ready;
  const isCategorySelected = activeCategory;

  const trail = useTrail(categories.length, {
    config,
    opacity: isCategoriesBoxesVisible ? 1 : 0,
    marginLeft: isCategoriesBoxesVisible ? 0 : -200,
    from: { opacity: 0, marginLeft: -200 },
    delay: 100,
    onRest: () => isCategorySelected && setCategoryBoxesAnimationEnded() // needed for sidebar to open only after entry boxes animations ended (they animate on initial load as well)
  })

  const handleCategoryEnter = (category) => {
    setActiveCategory(category.name);
    closeEntryBoxes();
    openSidebar();
  }

  return (
    <div className={styles.uiTopLeft}>
      {interfaceLoaded && trail.map((props, index) => (
        <animated.div
          key={categories[index].id}
          style={props}>
            <div onClick={() => handleCategoryEnter(categories[index])}>
              <CategoryBox
                title='mapping'
                isCategoriesBoxesVisible={isCategoriesBoxesVisible}
                category={categories[index].name} 
              />
            </div>
        </animated.div>
      ))}
    </div>
  )
}

export default EntryBoxesComponent;