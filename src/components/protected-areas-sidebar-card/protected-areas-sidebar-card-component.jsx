import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import ProtectedAreasLayers from 'components/protected-areas-layers';
import styles from './protected-areas-sidebar-card-styles.module.scss'
import ExistingProtectionThumbnail from 'images/existing-protection.webp';

const protectedAreas = LAYERS_CATEGORIES.PROTECTION;

const ProtectedAreasSidebarCardComponent = ({activeLayers, handleGlobeUpdating, countedActiveLayers,map}) => {
  const [isOpen, setOpen] = useState(false)
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title="mapping"
        image={ExistingProtectionThumbnail}
        category={protectedAreas}
        counter={countedActiveLayers[protectedAreas]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
        <ProtectedAreasLayers
          map={map}
          handleGlobeUpdating={handleGlobeUpdating}
          activeLayers={activeLayers}
          activeCategory={LAYERS_CATEGORIES.PROTECTION}
        />
      </div>
    </div>
  );
}

export default ProtectedAreasSidebarCardComponent;