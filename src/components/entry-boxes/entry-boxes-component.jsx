import React from 'react';
import { useTrail, animated } from 'react-spring';
import styles from 'styles/ui.module.scss';

import CategoryBox from 'components/category-box';

const categories = [
  { name: 'Biodiversity', id: 1 },
  { name: 'Existing protection', id: 2 },
  { name: 'Human pressures', id: 3 }
];

const EntryBoxesComponent = ({ isSidebarOpen, openSidebar, setActiveCategory, isLandscapeMode, isFullscreenActive, countedActiveLayers, route }) => {
  const config = { mass: 5, tension: 2000, friction: 200 }

  const interfaceLoaded = route.path === '/dataGlobe';

  const trail = useTrail(categories.length, {
    config,
    from: { opacity: 0, marginLeft: -200 },
    opacity: (isSidebarOpen || isLandscapeMode || isFullscreenActive) ? 0 : 1,
    marginLeft: (isSidebarOpen || isLandscapeMode || isFullscreenActive) ? -200 : 0,
    delay: 200
  })

  const handleCategoryEnter = (category) => {
    setActiveCategory(category.name);
    openSidebar();
  }

  return (
    <div data-cy="entry-boxes" className={styles.uiTopLeft}>
      {interfaceLoaded && trail.map((styles, index) => (
        <animated.div
          key={categories[index].id}
          style={styles}>
            <div onClick={() => handleCategoryEnter(categories[index])}>
              <CategoryBox
                title='mapping'
                isSidebarOpen={isSidebarOpen}
                category={categories[index].name}
                counter={countedActiveLayers[categories[index].name]}
              />
            </div>
        </animated.div>
      ))}
    </div>
  )
}

export default EntryBoxesComponent;