import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import ProtectedAreasLayers from 'components/protected-areas-layers';
import styles from './protected-areas-sidebar-card-styles.module.scss'

const protectedAreas = LAYERS_CATEGORIES.PROTECTION;

const BiodiversitySidebarCardComponent = ({activeLayers, activeCategory, handleGlobeUpdating, countedActiveLayers,map}) => {
  const [isOpen, setOpen] = useState(false)
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={protectedAreas}
        counter={countedActiveLayers[protectedAreas]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen})}>
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