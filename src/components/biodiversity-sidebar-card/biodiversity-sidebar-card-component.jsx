import React from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import CategoryBox from 'components/category-box';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import styles from './biodiversity-sidebar-card-styles.module.scss'

const BiodiversitySidebarCardComponent = ({activeLayers, activeCategory, map}) => {
  const isCategorySelected = LAYERS_CATEGORIES.BIODIVERSITY === activeCategory;
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title='mapping'
        category={LAYERS_CATEGORIES.BIODIVERSITY}
        counter={0}
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