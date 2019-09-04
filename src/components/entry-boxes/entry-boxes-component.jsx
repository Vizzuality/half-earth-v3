import React from 'react';
import styles from 'styles/ui.module.scss';
import animationStyles from 'styles/common-animations.module.scss';
import cx from 'classnames';

import CategoryBox from 'components/category-box';

const categories = [
  { name: 'Biodiversity', id: 1 },
  { name: 'Existing protection', id: 2 },
  { name: 'Human pressures', id: 3 }
];

const EntryBoxesComponent = ({ isSidebarOpen, openSidebar, setActiveCategory, isLandscapeMode, isFullscreenActive, countedActiveLayers, route }) => {
  const interfaceLoaded = route.path === '/dataGlobe';

  const handleCategoryEnter = (category) => {
    setActiveCategory(category.name);
    openSidebar();
  }

  const categoryBoxHidden = isSidebarOpen || isLandscapeMode || isFullscreenActive;

  return (
    <div data-cy="entry-boxes" className={styles.uiTopLeft}>
      {interfaceLoaded && categories.length &&
        categories.map(category => (
          <div className={cx(animationStyles.transform, { [animationStyles.hidden]: categoryBoxHidden, [animationStyles.visible]: !categoryBoxHidden })} onClick={() => handleCategoryEnter(category)}>
            <CategoryBox
              title='mapping'
              isSidebarOpen={isSidebarOpen}
              category={category.name}
              counter={countedActiveLayers[category.name]}
            />
          </div>
        )
      )}
    </div>
      )
}

export default EntryBoxesComponent;