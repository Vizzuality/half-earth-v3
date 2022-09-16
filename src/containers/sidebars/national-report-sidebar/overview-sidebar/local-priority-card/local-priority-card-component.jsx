import React, { useCallback } from 'react';

import { useT, useLocale } from '@transifex/react';

import cx from 'classnames';

import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

import LayerToggle from 'components/layer-toggle';

import {
  PROTECTION_SLUG,
  ADDITIONAL_PROTECTION_SLUG,
  FUTURE_PLACES_SLUG,
} from 'constants/analyze-areas-constants';
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
import { getCountryNames } from 'constants/translation-constants';

import styles from './local-priority-card-styles.module.scss';

function LocalPriorityCardComponent(props) {
  const {
    hasPriority,
    protectionNeeded,
    marineProtectionNeeded,
    priorityMetadata,
    futurePlacesMetadata,
    currentProtection,
    currentMarineProtection,
    protectionMetadata,
    priorityAreasSentence,
    map,
    activeLayers,
    handleLayerToggle,
    countryName,
    countryData,
  } = props;
  const t = useT();
  const locale = useLocale();

  const countryNames = useCallback(getCountryNames, [locale]);

  const { Marine } = countryData;

  const coastal = Marine === 'True';

  const NRC_TOGGLES = {
    [PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
      name: `${t('Protected areas : ')}${currentProtection}%`,
      value: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      id: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      title: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      metadataTitle: t('Protected areas'),
    },
    [TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER]: {
      name: `${t('Land protected areas : ')}${currentProtection}%`,
      value: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
      id: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
      title: TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER,
      slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      metadataTitle: t('Land protected areas'),
    },
    [MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER]: {
      name: `${t('Marine protected areas: ')}${currentMarineProtection}%`,
      value: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
      id: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
      title: MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER,
      slug: PROTECTED_AREAS_VECTOR_TILE_LAYER,
      metadataTitle: t('Marine protected areas'),
    },
    [COUNTRY_PRIORITY_LAYER]: {
      name: `${t('Additional protection: ')}${protectionNeeded}%`,
      value: COUNTRY_PRIORITY_LAYER,
      id: COUNTRY_PRIORITY_LAYER,
      title: COUNTRY_PRIORITY_LAYER,
      slug: COUNTRY_PRIORITY_LAYER,
    },
    [LAND_COUNTRY_PRIORITY_LAYER]: {
      name: `${t('Land protection needed: ')}${protectionNeeded}%`,
      value: LAND_COUNTRY_PRIORITY_LAYER,
      id: LAND_COUNTRY_PRIORITY_LAYER,
      title: LAND_COUNTRY_PRIORITY_LAYER,
      slug: COUNTRY_PRIORITY_LAYER,
    },
    [MARINE_COUNTRY_PRIORITY_LAYER]: {
      name: `${t('Marine protection needed: ')}${marineProtectionNeeded}%`,
      value: MARINE_COUNTRY_PRIORITY_LAYER,
      id: MARINE_COUNTRY_PRIORITY_LAYER,
      title: MARINE_COUNTRY_PRIORITY_LAYER,
      slug: COUNTRY_PRIORITY_LAYER,
    },
    [HALF_EARTH_FUTURE_TILE_LAYER]: {
      name: t('Places for a Half-Earth future'),
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
          title={t('Current protection status')}
          description={t(
            'The green areas on the map represent regions that are recognized as currently being managed for long-term nature conservation'
          )}
          metaDataSources={protectionMetadata && protectionMetadata.source}
        />
        <>
          <LayerToggle
            className={styles.layerToggle}
            map={map}
            type="checkbox"
            option={NRC_TOGGLES[TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER]}
            variant="dark"
            key={TERRESTRIAL_PROTECTED_AREAS_TILE_LAYER}
            activeLayers={activeLayers}
            onChange={handleLayerToggle}
            themeCategorySlug={PROTECTION_SLUG}
          />
          {coastal && (
            <LayerToggle
              className={styles.layerToggle}
              map={map}
              type="checkbox"
              option={NRC_TOGGLES[MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER]}
              variant="dark"
              key={MARINE_PROTECTED_AREAS_VECTOR_TILE_LAYER}
              activeLayers={activeLayers}
              onChange={handleLayerToggle}
              themeCategorySlug={PROTECTION_SLUG}
            />
          )}
        </>
      </SidebarCardWrapper>
      <SidebarCardWrapper
        className={styles.wrapper}
        sectionClassName={cx(styles.section, styles.layerToggleSection)}
      >
        <SidebarCardContent
          title={t('How much additional protection is needed?')}
          description={priorityAreasSentence}
          legendType={hasPriority && 'gradient'}
          legendGradientSlug={COUNTRY_PRIORITY_LAYER}
          metaDataSources={priorityMetadata && priorityMetadata.source}
        />
        <LayerToggle
          className={styles.layerToggle}
          map={map}
          type="checkbox"
          option={NRC_TOGGLES[LAND_COUNTRY_PRIORITY_LAYER]}
          variant="dark"
          key={LAND_COUNTRY_PRIORITY_LAYER}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          themeCategorySlug={ADDITIONAL_PROTECTION_SLUG}
        />
        {coastal && (
          <LayerToggle
            className={styles.layerToggle}
            map={map}
            type="checkbox"
            option={NRC_TOGGLES[MARINE_COUNTRY_PRIORITY_LAYER]}
            variant="dark"
            key={MARINE_COUNTRY_PRIORITY_LAYER}
            activeLayers={activeLayers}
            onChange={handleLayerToggle}
            themeCategorySlug={ADDITIONAL_PROTECTION_SLUG}
          />
        )}
      </SidebarCardWrapper>
      <SidebarCardWrapper
        sectionClassName={cx(styles.section, styles.layerToggleSection)}
      >
        <SidebarCardContent
          title={`${t('Where to protect next in ')}${
            countryNames[countryName] || countryName
          }?`}
          description={t(
            'These unprotected places have been identified as those where conservation efforts should be directed to efficiently achieve the most rapid gains in biodiversity habitat and species protection. '
          )}
          metaDataSources={futurePlacesMetadata && futurePlacesMetadata.source}
        />
        <LayerToggle
          className={styles.layerToggle}
          map={map}
          type="checkbox"
          option={NRC_TOGGLES[HALF_EARTH_FUTURE_TILE_LAYER]}
          variant="dark"
          key={HALF_EARTH_FUTURE_TILE_LAYER}
          activeLayers={activeLayers}
          onChange={handleLayerToggle}
          themeCategorySlug={FUTURE_PLACES_SLUG}
        />
      </SidebarCardWrapper>
    </div>
  );
}

export default LocalPriorityCardComponent;
