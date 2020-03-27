import React from 'react';
import styles from './entry-boxes-styles.module.scss';
import animationStyles from 'styles/common-animations.module.scss';
import { isMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import CategoryBox from 'components/category-box';

const categories = [
  { name: LAYERS_CATEGORIES.BIODIVERSITY, id: 1 },
  { name: LAYERS_CATEGORIES.PROTECTION, id: 2 },
  { name: LAYERS_CATEGORIES.LAND_PRESSURES, id: 3 }
];

const EntryBoxesComponent = ({
  isSidebarOpen,
  openSidebar,
  countryISO,
  setActiveCategory,
  isLandscapeMode,
  isFullscreenActive,
  countedActiveLayers,
  route,
  activeOption,
  isLandscapeSidebarCollapsed
}) => {

  const handleCategoryEnter = (category) => {
    setActiveCategory(category.name);
    openSidebar();
  }

  const isOnMobile = isMobile();
  const isActive = activeOption === FOOTER_OPTIONS.ADD_LAYER;

  const categoryBoxVisibleOnMobile = isOnMobile && isActive && !isSidebarOpen;
  const categoryBoxHidden = (isSidebarOpen || isLandscapeMode || isFullscreenActive || (isOnMobile && !isActive)) && !categoryBoxVisibleOnMobile;

  return (
    <div
      data-cy="entry-boxes"
      className={cx(styles.entryBoxesPosition, { [animationStyles.bottomHidden]: categoryBoxHidden && isOnMobile, [styles.countrySelected]: countryISO })}>
        {categories.length &&
          categories.map((category, i) => (
            <div
              key={category.name}
              className={cx({
                [animationStyles.transform]: !isOnMobile,
                [animationStyles.leftHidden]: categoryBoxHidden && !isOnMobile,
                [animationStyles.bottomHidden]: categoryBoxHidden && isOnMobile
              })}
              onClick={() => handleCategoryEnter(category)}>
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