import React, { useState } from 'react';
import cx from 'classnames';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import Tabs from 'components/tabs';
import CategoryBox from 'components/category-box';
import SidebarCardWrapper from 'components/sidebar-card-wrapper'
import SidebarCardContent from 'components/sidebar-card-content';
import BiodiversityLayers from 'components/biodiversity-layers';
import Legend from 'components/sidebar-legend';
import { biodiversityCategories } from 'constants/mol-layers-configs';
import { BIODIVERSITY_TABS } from 'constants/ui-params';
import { BIODIVERSITY_SLUG } from 'constants/legend-configs';
import styles from './biodiversity-sidebar-card-styles.module.scss';

import BiodiversityThumbnail from "images/biodiversity.png";

const BiodiversitySidebarCardComponent = ({
  activeLayers,
  countedActiveLayers,
  view,
  handleTabSelection,
  biodiversityLayerVariant,
  cardMetadata
}) => {
  const { title, description, source } = cardMetadata || {};
  const [isOpen, setOpen] = useState(false);
  const handleBoxClick = () => setOpen(!isOpen);
  return (
    <div className={cx(
      styles.sidebarCardContainer,
      { [styles.open]: isOpen }
    )}>
      <CategoryBox
        category={LAYERS_CATEGORIES.BIODIVERSITY}
        image={BiodiversityThumbnail}
        counter={countedActiveLayers[LAYERS_CATEGORIES.BIODIVERSITY]}
        handleBoxClick={handleBoxClick}
        isOpen={isOpen}
      />
      <div
        className={cx(
          styles.layersTogglesContainer,
          styles[`${biodiversityLayerVariant}Tab`],
          { [styles.open]: isOpen }
        )}
      >
        <Legend legendItem={BIODIVERSITY_SLUG} className={styles.legendContainer}/>
        <Tabs
          tabs={BIODIVERSITY_TABS}
          onClick={handleTabSelection}
          defaultTabSlug={biodiversityLayerVariant}
        />
        <div className={styles.cardContainer}>
          <SidebarCardWrapper collapsable >
            <SidebarCardContent
              title={title}
              description={description}
              metaDataSources={source}
            />
          </SidebarCardWrapper>
        </div>
        {biodiversityLayerVariant &&
          biodiversityCategories[biodiversityLayerVariant].map((cat) => (
            <BiodiversityLayers
              key={cat.name}
              title={cat.name}
              description={cat.description}
              subcategories={cat.subcategories}
              options={cat.taxa}
              activeLayers={activeLayers}
              view={view}
              variant={biodiversityLayerVariant}
            />
          ))}
      </div>
    </div>
  );
};

export default BiodiversitySidebarCardComponent;