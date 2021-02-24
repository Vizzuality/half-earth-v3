import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import Tabs from 'components/tabs';
import CategoryBox from 'components/category-box';
import Tabs from 'components/tabs';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import styles from './biodiversity-sidebar-card-styles.module.scss'
import { LAYER_VARIANTS } from 'constants/landscape-view-constants';
import capitalize from 'lodash/capitalize';

const biodiversity = LAYERS_CATEGORIES.BIODIVERSITY;

const BiodiversitySidebarCardComponent = ({activeLayers, countedActiveLayers, map, view}) => {
  const [isOpen, setOpen] = useState(false)
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const handleBoxClick = () => setOpen(!isOpen);
  const renderLayers = ({ variant }) =>
    biodiversityCategories.map((cat) => (
      <BiodiversityLayers
        key={cat.name}
        title={cat.name}
        description={cat.description}
        subcategories={cat.subcategories}
        options={cat.taxa}
        activeLayers={activeLayers}
        map={map}
        view={view}
        layerType={variant}
        selectedLayerType={Object.values(LAYER_VARIANTS)[selectedTabIndex]}
      />
    ));
  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title="mapping"
        category={biodiversity}
        counter={countedActiveLayers[biodiversity]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
        <Tabs
          tabs={
            Object.values(LAYER_VARIANTS).map(variant => ({
              title: capitalize(variant),
              slug: variant
            }))
          }
          onClick={() => console.info('Remove me I am just here for demo')}
        />
        {biodiversityCategories.map((cat) => (
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
  );
}

export default BiodiversitySidebarCardComponent;