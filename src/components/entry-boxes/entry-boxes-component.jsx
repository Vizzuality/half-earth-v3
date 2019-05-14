import React from 'react';
import { useTrail, animated } from 'react-spring';

import CategoryBox from 'components/category-box';

const categories = [
  { name: 'Biodiversity', id: 1 },
  { name: 'Existing protection', id: 2 },
  { name: 'Human pressures', id: 3 }
];

const EntryBoxesComponent = ({ view, isCategoriesBoxesVisible, closeEntryBoxes, openSidebar, setActiveCategory }) => {
  const config = { mass: 5, tension: 2000, friction: 200 }

  const trail = useTrail(categories.length, {
    config,
    opacity: isCategoriesBoxesVisible ? 1 : 0,
    marginLeft: isCategoriesBoxesVisible ? 0 : -200,
    from: { opacity: 0, marginLeft: -200 },
    delay: 200
  })

  const interfaceLoaded = view.ready;

  const handleCategoryEnter = (category) => {
    closeEntryBoxes();
    openSidebar();
    setActiveCategory(category.name);
  }

  return (
    <div className='uiTopLeft'>
      {interfaceLoaded && trail.map((props, index) => (
        <animated.div
          key={categories[index]}
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