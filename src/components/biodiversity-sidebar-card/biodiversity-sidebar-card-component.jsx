import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import Tabs from 'components/tabs';
import CategoryBox from 'components/category-box';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import { LAYER_VARIANTS } from 'constants/landscape-view-constants';
import capitalize from 'lodash/capitalize';
import styles from './biodiversity-sidebar-card-styles.module.scss';

const BiodiversitySidebarCardComponent = ({
  activeLayers,
  countedActiveLayers,
  map,
  view,
  changeUI,
  biodiversityLayerVariant
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);

  return (
    <div className={styles.sidebarCardContainer}>
      <CategoryBox
        title="mapping"
        category={LAYERS_CATEGORIES.BIODIVERSITY}
        counter={countedActiveLayers[LAYERS_CATEGORIES.BIODIVERSITY]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(styles.layersTogglesContainer, { [styles.open]: isOpen })}
      >
        <Tabs
          tabs={Object.values(LAYER_VARIANTS).map((variant) => ({
            title: capitalize(variant),
            slug: variant
          }))}
          onClick={(slug) => {
            changeUI({ biodiversityLayerVariant: slug });
          }}
          defaultTabSlug={biodiversityLayerVariant}
        />
        {biodiversityLayerVariant && biodiversityCategories[
          biodiversityLayerVariant
        ].map((cat) => (
          <BiodiversityLayers
            key={cat.name}
            title={cat.name}
            description={cat.description}
            subcategories={cat.subcategories}
            options={cat.taxa}
            activeLayers={activeLayers}
            map={map}
            view={view}
            layerType={biodiversityLayerVariant}
          />
        ))}
      </div>
    </div>
  );
};

export default BiodiversitySidebarCardComponent;