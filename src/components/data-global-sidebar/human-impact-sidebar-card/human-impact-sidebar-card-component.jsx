import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import LayerToggle from 'components/layer-toggle';
import { humanPressuresLandUse, humanPressuresMarine } from 'constants/human-pressures';
import styles from './human-impact-sidebar-card-styles.module.scss'
import HumanPressuresThumbnail from "images/human-pressures.png";

import checkboxTheme from 'styles/themes/checkboxes-theme.module.scss';
const humanImpact = LAYERS_CATEGORIES.LAND_PRESSURES;

const HumanImpactSidebarCardComponent = ({
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
        category={humanImpact}
        image={HumanPressuresThumbnail}
        counter={countedActiveLayers[humanImpact]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
      {humanPressuresLandUse.map(layer => (
        <LayerToggle
          map={map}
          type='checkbox'
          theme={checkboxTheme.landPressures}
          optionsSelected={selectedLayers}
          option={layer}
          title='my title'
          handleInfoClick={() => console.log('info clicked')}
          onClick={handleLayerToggle}
        />
      ))}
      {humanPressuresMarine.map(layer => (
        <LayerToggle
          map={map}
          type='checkbox'
          theme={checkboxTheme.marinePressures}
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

export default HumanImpactSidebarCardComponent;