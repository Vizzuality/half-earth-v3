import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import Tabs from 'components/tabs';
import CategoryBox from 'components/category-box';
import BiodiversityLayers from 'components/biodiversity-layers';
import { biodiversityCategories } from 'constants/mol-layers-configs';

import { BIODIVERSITY_TABS, BIODIVERSITY_TABS_SLUGS } from 'constants/ui-params';
import styles from './biodiversity-sidebar-card-styles.module.scss';

const BiodiversitySidebarCardComponent = ({
  activeLayers,
  countedActiveLayers,
  map,
  view,
  handleTabSelection,
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
        className={cx(styles.layersTogglesContainer, {
          [styles.open]: isOpen,
          [styles.biodiversityTab]:
            biodiversityLayerVariant === BIODIVERSITY_TABS_SLUGS.PRIORITY
        })}
      >
        <Tabs
          tabs={BIODIVERSITY_TABS}
          onClick={handleTabSelection}
          defaultTabSlug={biodiversityLayerVariant}
        />
        {biodiversityLayerVariant &&
          biodiversityCategories[biodiversityLayerVariant].map((cat) => (
            <BiodiversityLayers
              key={cat.name}
              title={cat.name}
              description={cat.description}
              subcategories={cat.subcategories}
              options={cat.taxa}
              activeLayers={activeLayers}
              map={map}
              view={view}
              variant={biodiversityLayerVariant}
            />
          ))}
      </div>
    </div>
  );
};

export default BiodiversitySidebarCardComponent;