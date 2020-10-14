import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import HumanImpactLayers from 'components/human-impact-layers';
import styles from './human-impact-sidebar-card-styles.module.scss'

const humanImpact = LAYERS_CATEGORIES.LAND_PRESSURES;

const HumanImpactSidebarCardComponent = ({activeLayers, handleGlobeUpdating, countedActiveLayers, view}) => {

  const [isOpen, setOpen] = useState(false)
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={humanImpact}
        counter={countedActiveLayers[humanImpact]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen})}>
          <HumanImpactLayers
            view={view}
            activeLayers={activeLayers}
            handleGlobeUpdating={handleGlobeUpdating}
          />
      </div>
    </div>
  )
}

export default HumanImpactSidebarCardComponent;