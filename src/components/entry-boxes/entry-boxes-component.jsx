import React from 'react';
import styles from './entry-boxes-styles.module.scss';
import animationStyles from 'styles/common-animations.module.scss';
import { isMobile } from 'constants/responsive';
import cx from 'classnames';

import CategoryBox from 'components/category-box';

const categories = [
  { name: 'Biodiversity', id: 1 },
  { name: 'Existing protection', id: 2 },
  { name: 'Human pressures', id: 3 }
];

const EntryBoxesComponent = ({ isSidebarOpen, openSidebar, setActiveCategory, isLandscapeMode, isFullscreenActive, countedActiveLayers, route, isEntryBoxesOpen }) => {

  const handleCategoryEnter = (category) => {
    setActiveCategory(category.name);
    openSidebar();
  }

  const isOnMobile = isMobile();

  const categoryBoxHidden = isSidebarOpen || isLandscapeMode || isFullscreenActive || (isOnMobile && !isEntryBoxesOpen);

  return (
    <div data-cy="entry-boxes" className={cx(styles.entryBoxesPosition, { [animationStyles.bottomHidden]: categoryBoxHidden && isOnMobile })}>
      {categories.length &&
        categories.map((category, i) => (
          <div className={cx(animationStyles.transform, { [animationStyles.leftHidden]: categoryBoxHidden && !isOnMobile, [animationStyles.bottomHidden]: categoryBoxHidden && isOnMobile })} onClick={() => handleCategoryEnter(category)}>
            <CategoryBox
              title='mapping'
              isSidebarOpen={isSidebarOpen}
              category={category.name}
              counter={countedActiveLayers[category.name]}
              firstBox={i === 0 && isOnMobile}
            />
            {isOnMobile && i !== categories.length-1 && <div className={styles.spacer} />}
          </div>
        )
      )}
    </div>
      )
}

export default EntryBoxesComponent;