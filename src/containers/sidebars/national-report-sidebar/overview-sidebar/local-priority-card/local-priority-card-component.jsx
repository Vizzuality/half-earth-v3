import React from 'react';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import LayerToggle from 'components/layer-toggle';

import styles from './local-priority-card-styles.module.scss';

import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COUNTRY_PRIORITY_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
  MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
  LAND_COUNTRY_PRIORITY_LAYER,
  MARINE_COUNTRY_PRIORITY_LAYER,
  HALF_EARTH_FUTURE_METADATA_SLUG,
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
  const { REACT_APP_FEATURE_MARINE } = process.env;

  const NRC_TOGGLES = {
    [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
      name: `Protected areas : ${currentProtection}%`,
      value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      metadataTitle: 'Protected areas',
    },
    [TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER]: {
      name: `Land protected areas : ${currentProtection}%`,
      value: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
      id: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
      title: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
      slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      metadataTitle: 'Land protected areas',
    },
    [MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
      name: `Marine protected areas : ${currentProtection}%`,
      value: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
      id: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
      title: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
      slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      metadataTitle: 'Marine protected areas',
    },
    [COUNTRY_PRIORITY_LAYER]: {
      name: `Additional protection: ${protectionNeeded}%`,
      value: COUNTRY_PRIORITY_LAYER,
      id: COUNTRY_PRIORITY_LAYER,
      title: COUNTRY_PRIORITY_LAYER,
      slug: COUNTRY_PRIORITY_LAYER,
    },
    [LAND_COUNTRY_PRIORITY_LAYER]: {
      name: `Land protection needed: ${protectionNeeded}%`,
      value: LAND_COUNTRY_PRIORITY_LAYER,
      id: LAND_COUNTRY_PRIORITY_LAYER,
      title: LAND_COUNTRY_PRIORITY_LAYER,
      slug: COUNTRY_PRIORITY_LAYER,
    },
    [MARINE_COUNTRY_PRIORITY_LAYER]: {
      name: `Marine protection needed: ${protectionNeeded}%`,
      value: MARINE_COUNTRY_PRIORITY_LAYER,
      id: MARINE_COUNTRY_PRIORITY_LAYER,
      title: MARINE_COUNTRY_PRIORITY_LAYER,
      slug: COUNTRY_PRIORITY_LAYER,
    },
    [HALF_EARTH_FUTURE_TILE_LAYER]: {
      name: `Places for a Half-Earth Future`,
      value: HALF_EARTH_FUTURE_TILE_LAYER,
      id: HALF_EARTH_FUTURE_TILE_LAYER,
      title: HALF_EARTH_FUTURE_TILE_LAYER,
      slug: HALF_EARTH_FUTURE_METADATA_SLUG,
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

        {REACT_APP_FEATURE_MARINE ? (
          <>
            <LayerToggle
              map={map}
              type="checkbox"
              option={NRC_TOGGLES[TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER]}
              variant="dark"
              key={TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={PROTECTION_SLUG}
            />
            <LayerToggle
              map={map}
              type="checkbox"
              option={NRC_TOGGLES[MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER]}
              variant="dark"
              key={MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={PROTECTION_SLUG}
            />
          </>
        ) : (
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
        )}
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
        {REACT_APP_FEATURE_MARINE ? (
          <>
            <LayerToggle
              map={map}
              type="checkbox"
              option={NRC_TOGGLES[LAND_COUNTRY_PRIORITY_LAYER]}
              variant="dark"
              key={LAND_COUNTRY_PRIORITY_LAYER}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={ADDITIONAL_PROTECTION_SLUG}
            />
            <LayerToggle
              map={map}
              type="checkbox"
              option={NRC_TOGGLES[MARINE_COUNTRY_PRIORITY_LAYER]}
              variant="dark"
              key={MARINE_COUNTRY_PRIORITY_LAYER}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={ADDITIONAL_PROTECTION_SLUG}
            />
          </>
        ) : (
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
        )}
      </SidebarCardWrapper>
      <SidebarCardWrapper sectionClassName={styles.section}>
        <SidebarCardContent
          title={`Where to protect next in ${countryName}?`}
          description="These locations indentify the unprotected places that will lead to the most rapid conservation gains for biodiversity habitat via contributions to species representation targets."
          metaDataSources={futurePlacesMetadata && futurePlacesMetadata.source}
        />
        <div className={styles.toggleContainer}>
          <LayerToggle
            map={map}
            type="checkbox"
            option={NRC_TOGGLES[HALF_EARTH_FUTURE_TILE_LAYER]}
            variant="dark"
            key={HALF_EARTH_FUTURE_TILE_LAYER}
            activeLayers={activeLayers}
            onChange={handleLayerToggle}
            themeCategorySlug={FUTURE_PLACES_SLUG}
          />
        </div>
      </SidebarCardWrapper>
    </div>
  );
};

export default LocalPriorityCardComponent;
