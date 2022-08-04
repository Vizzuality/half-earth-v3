import React, { useMemo } from 'react';
import { useT, useLocale } from '@transifex/react';
import { getCountryNames } from 'constants/translation-constants';

import cx from 'classnames';
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

  const countryNames = useMemo(getCountryNames, [locale]);

  const { Marine } = countryData;

  const coastal = Marine === 'True' ? true : false;

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
      name: t('Places for a Half-Earth Future'),
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
          title={t('What is already protected?')}
          description={t(
            'The green areas on the map represent regions that are currently recognized as being managed for the long-term conservation of nature'
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
            countryNames(countryName) || countryName
          }?`}
          description={t(
            'These locations indentify the unprotected places that will lead to the most rapid conservation gains for biodiversity habitat via contributions to species representation targets.'
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
};

export default LocalPriorityCardComponent;
