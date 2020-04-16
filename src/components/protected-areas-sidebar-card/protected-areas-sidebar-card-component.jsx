import React from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import ProtectedAreasLayers from 'components/protected-areas-layers';
import styles from './protected-areas-sidebar-card-styles.module.scss'

const BiodiversitySidebarCardComponent = ({activeLayers, activeCategory, handleGlobeUpdating, map}) => {
  const isCategorySelected = LAYERS_CATEGORIES.PROTECTION === activeCategory;
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={LAYERS_CATEGORIES.PROTECTION}
        counter={0}
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