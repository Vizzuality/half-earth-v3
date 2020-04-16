import React from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import HumanImpactLayers from 'components/human-impact-layers';
import styles from './human-impact-sidebar-card-styles.module.scss'

const BiodiversitySidebarCardComponent = ({activeLayers, activeCategory, handleGlobeUpdating, setRasters, rasters, map, view}) => {
  const isCategorySelected = LAYERS_CATEGORIES.LAND_PRESSURES === activeCategory;
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={LAYERS_CATEGORIES.LAND_PRESSURES}
        counter={0}
        activeCategory={activeCategory}
      />
      <div className={cx(styles.layersTogglesContainer, { [styles.open]: isCategorySelected})}>
          <HumanImpactLayers
            activeLayers={activeLayers}
            rasters={rasters}
            handleGlobeUpdating={handleGlobeUpdating}
            setRasters={setRasters}
            map={map}
            view={view}
          />
      </div>
    </div>
  )
}

export default BiodiversitySidebarCardComponent;