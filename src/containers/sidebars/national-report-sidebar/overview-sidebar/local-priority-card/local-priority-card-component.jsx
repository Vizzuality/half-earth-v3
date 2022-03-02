import React from 'react';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import LayerToggle from 'components/layer-toggle';

import styles from './local-priority-card-styles.module.scss';

import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COUNTRY_PRIORITY_LAYER,
  HALF_EARTH_FUTURE_FEATURE_LAYER,
} from 'constants/layers-slugs';
import {
  PROTECTION_SLUG,
  ADDITIONAL_PROTECTION_SLUG,
  FUTURE_PLACES_SLUG,
} from 'constants/analyze-areas-constants';

const LocalPriorityCardComponent = (props) => {
  const {
    hasPriority,
    protectionNeeded,
    priorityMetadata,
    futurePlacesMetadata,
    currentProtection,
    protectionMetadata,
    priorityAreasSentence,
    map,
    activeLayers,
    handleLayerToggle,
    countryName,
  } = props;

  const NRC_TOGGLES = {
    [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
      name: `Protected areas : ${currentProtection}%`,
      value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      metadataTitle: 'Protected areas',
    },
    [COUNTRY_PRIORITY_LAYER]: {
      name: `Additional protection: ${protectionNeeded}%`,
      value: COUNTRY_PRIORITY_LAYER,
      id: COUNTRY_PRIORITY_LAYER,
      title: COUNTRY_PRIORITY_LAYER,
      slug: COUNTRY_PRIORITY_LAYER,
    },
    [HALF_EARTH_FUTURE_FEATURE_LAYER]: {
      name: `Places of Half-Earth future`,
      value: HALF_EARTH_FUTURE_FEATURE_LAYER,
      id: HALF_EARTH_FUTURE_FEATURE_LAYER,
      title: HALF_EARTH_FUTURE_FEATURE_LAYER,
      slug: HALF_EARTH_FUTURE_FEATURE_LAYER,
    },
  };

  return (
    <div className={styles.cardContainer}>
      <SidebarCardWrapper
        className={styles.wrapper}
        sectionClassName={styles.section}
      >
        <SidebarCardContent
          title="What is already protected?"
          description="The green areas on the map represent regions that are currently recognized as being managed for the long-term conservation of nature"
          metaDataSources={protectionMetadata && protectionMetadata.source}
        />

        <LayerToggle
          map={map}
          type="checkbox"
          option={NRC_TOGGLES[PROTECTED_AREAS_VECTOR_TILE_LAYER]}
          variant="dark"
          key={PROTECTED_AREAS_VECTOR_TILE_LAYER}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          themeCategorySlug={PROTECTION_SLUG}
        />
      </SidebarCardWrapper>
      <SidebarCardWrapper
        className={styles.wrapper}
        sectionClassName={styles.section}
      >
        <SidebarCardContent
          title="How much additional protection is needed?"
          description={priorityAreasSentence}
          legendType={hasPriority && 'gradient'}
          legendGradientSlug={COUNTRY_PRIORITY_LAYER}
          metaDataSources={priorityMetadata && priorityMetadata.source}
        />
        <LayerToggle
          map={map}
          type="checkbox"
          option={NRC_TOGGLES[COUNTRY_PRIORITY_LAYER]}
          variant="dark"
          key={COUNTRY_PRIORITY_LAYER}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          themeCategorySlug={ADDITIONAL_PROTECTION_SLUG}
        />
      </SidebarCardWrapper>
      <SidebarCardWrapper sectionClassName={styles.section}>
        <SidebarCardContent
          title={`Where to protect next in ${countryName}?`}
          description="These locations indentify the unprotected places that will lead to the most rapid conservation gains for biodiversity habitat via contributions to species representation targets."
          metaDataSources={futurePlacesMetadata && futurePlacesMetadata.source}
        />
        <LayerToggle
          map={map}
          type="checkbox"
          option={NRC_TOGGLES[HALF_EARTH_FUTURE_FEATURE_LAYER]}
          variant="dark"
          key={HALF_EARTH_FUTURE_FEATURE_LAYER}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          themeCategorySlug={FUTURE_PLACES_SLUG}
        />
      </SidebarCardWrapper>
    </div>
  );
};

export default LocalPriorityCardComponent;
