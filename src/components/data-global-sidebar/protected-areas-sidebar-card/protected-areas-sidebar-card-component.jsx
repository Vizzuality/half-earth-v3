import React, { useState } from 'react';
import cx from 'classnames';
import { WDPALayers } from 'constants/protected-areas';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import styles from './protected-areas-sidebar-card-styles.module.scss'
import ExistingProtectionThumbnail from 'images/existing-protection.png';

import checkboxTheme from 'styles/themes/checkboxes-theme.module.scss';
const protectedAreas = LAYERS_CATEGORIES.PROTECTION;

const ProtectedAreasSidebarCardComponent = ({
  map,
  selectedLayers,
  handleLayerToggle,
  countedActiveLayers,
}) => {
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
        {WDPALayers.map(layer => (
          <LayerToggle
            map={map}
            type='checkbox'
            theme={checkboxTheme.protectedAreas}
            optionsSelected={selectedLayers}
            option={layer}
            title='my title'
            handleInfoClick={() => console.log('info clicked')}
            onClick={handleLayerToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default ProtectedAreasSidebarCardComponent;