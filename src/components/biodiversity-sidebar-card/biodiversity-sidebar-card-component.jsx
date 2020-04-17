import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import styles from './biodiversity-sidebar-card-styles.module.scss'

const biodiversity = LAYERS_CATEGORIES.BIODIVERSITY;

const BiodiversitySidebarCardComponent = ({activeLayers, countedActiveLayers, map, view}) => {
  const [isOpen, setOpen] = useState(false)
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={biodiversity}
        counter={countedActiveLayers[biodiversity]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen})}>
        {biodiversityCategories.map(cat => (
          <BiodiversityLayers
            key={cat.name}
            title={cat.name}
            description={cat.description}
            subcategories={cat.subcategories}
            options={cat.taxa}
            activeLayers={activeLayers}
            map={map}
            view={view}
          />
        ))}
      </div>
    </div>
  )
}

export default BiodiversitySidebarCardComponent;