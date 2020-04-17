import React from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import styles from './biodiversity-sidebar-card-styles.module.scss'

const biodiversity = LAYERS_CATEGORIES.BIODIVERSITY;

const BiodiversitySidebarCardComponent = ({activeLayers, activeCategory, countedActiveLayers, map}) => {
  const isCategorySelected = activeCategory === biodiversity;
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={biodiversity}
        counter={countedActiveLayers[biodiversity]}
        activeCategory={activeCategory}
      />
      <div className={cx(styles.layersTogglesContainer, { [styles.open]: isCategorySelected})}>
        {biodiversityCategories.map(cat => (
          <BiodiversityLayers
            key={cat.name}
            title={cat.name}
            description={cat.description}
            subcategories={cat.subcategories}
            options={cat.taxa}
            activeLayers={activeLayers}
            map={map}
          />
        ))}
      </div>
    </div>
  )
}

export default BiodiversitySidebarCardComponent;