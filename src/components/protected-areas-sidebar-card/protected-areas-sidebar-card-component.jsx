import React from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import ProtectedAreasLayers from 'components/protected-areas-layers';
import styles from './protected-areas-sidebar-card-styles.module.scss'

const protectedAreas = LAYERS_CATEGORIES.PROTECTION;

const BiodiversitySidebarCardComponent = ({activeLayers, activeCategory, handleGlobeUpdating, countedActiveLayers,map}) => {
  const isCategorySelected = activeCategory === protectedAreas;
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={protectedAreas}
        counter={countedActiveLayers[protectedAreas]}
        activeCategory={activeCategory}
      />
      <div className={cx(styles.layersTogglesContainer, { [styles.open]: isCategorySelected})}>
        <ProtectedAreasLayers
          map={map}
          handleGlobeUpdating={handleGlobeUpdating}
          activeLayers={activeLayers}
          activeCategory={activeCategory}
        />
      </div>
    </div>
  )
}

export default BiodiversitySidebarCardComponent;