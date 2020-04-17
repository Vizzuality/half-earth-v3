import React from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import HumanImpactLayers from 'components/human-impact-layers';
import styles from './human-impact-sidebar-card-styles.module.scss'

const humanImpact = LAYERS_CATEGORIES.LAND_PRESSURES;

const BiodiversitySidebarCardComponent = ({activeLayers, activeCategory, handleGlobeUpdating, countedActiveLayers, setRasters, rasters, map, view}) => {
  const isCategorySelected = activeCategory === humanImpact;
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={humanImpact}
        counter={countedActiveLayers[humanImpact]}
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