import React from 'react';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import LayerToggle from 'components/layer-toggle';

import styles from './local-priority-card-styles.module.scss';

import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COUNTRY_PRIORITY_LAYER,
} from 'constants/layers-slugs';
import {
  PROTECTION_SLUG,
  ADDITIONAL_PROTECTION_SLUG,
} from 'constants/analyze-areas-constants';

export const NRC_TOGGLES = {
  [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
    name: 'Protected areas',
    value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
    metadataTitle: 'Protected areas',
  },
  [COUNTRY_PRIORITY_LAYER]: {
    name: 'Additional protection',
    value: COUNTRY_PRIORITY_LAYER,
    id: COUNTRY_PRIORITY_LAYER,
    title: COUNTRY_PRIORITY_LAYER,
    slug: COUNTRY_PRIORITY_LAYER,
  },
};

const LocalPriorityCardComponent = (props) => {
  const {
    hasPriority,
    protectionNeeded,
    priorityMetadata,
    currentProtection,
    protectionMetadata,
    priorityAreasSentence,
    map,
    activeLayers,
    handleLayerToggle,
  } = props;

  return (
    <div className={styles.cardContainer}>
      <SidebarCardWrapper>
        <SidebarCardContent
          title={`The current protection: ${currentProtection}%`}
          description="The green areas on the map represent regions that are currently recognized as being managed for the long-term conservation of nature"
          legendType={'basic'}
          metaDataSources={protectionMetadata && protectionMetadata.source}
        />
        <LayerToggle
          map={map}
          type="checkbox"
          option={NRC_TOGGLES[PROTECTED_AREAS_VECTOR_TILE_LAYER]}
          variant="lighter"
          title={PROTECTED_AREAS_VECTOR_TILE_LAYER}
          key={PROTECTED_AREAS_VECTOR_TILE_LAYER}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          toggleCategory={PROTECTION_SLUG}
        />
        <SidebarCardContent
          title={`Additional protection needed: ${protectionNeeded}%`}
          description={priorityAreasSentence}
          legendType={hasPriority && 'gradient'}
          highValueLabel={'high priority'}
          lowValueLabel={'low priority'}
          metaDataSources={priorityMetadata && priorityMetadata.source}
        />
        <LayerToggle
          map={map}
          type="checkbox"
          option={NRC_TOGGLES[COUNTRY_PRIORITY_LAYER]}
          variant="lighter"
          title={COUNTRY_PRIORITY_LAYER}
          key={COUNTRY_PRIORITY_LAYER}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          toggleCategory={ADDITIONAL_PROTECTION_SLUG}
        />
      </SidebarCardWrapper>
    </div>
  );
};

export default LocalPriorityCardComponent;
