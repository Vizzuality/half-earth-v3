import React, { useContext, useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import {
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  DRC_REGION_FEATURE_ID,
  NBS_OP_INTERVENTIONS_FEATURE_ID,
  INDIGENOUS_LANDS_FEATURE_ID,
  IUCNStatusTypes,
} from 'utils/dashboard-utils';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';
import FilterContainer from 'components/filters';
import SpeciesListContainer from 'components/species-list';

import EsriFeatureService from 'services/esri-feature-service';

import {
  LAYER_OPTIONS,
  NAVIGATION,
  REGION_OPTIONS,
  LAYER_TITLE_TYPES,
  DATA_POINT_TYPE,
} from 'constants/dashboard-constants.js';

import styles from '../dashboard-sidebar-styles.module.scss';

import filterStyles from './species-filter-styles.module.scss';

function SpeciesFilterComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);

  const {
    selectedRegionOption,
    setSelectedRegionOption,
    setSelectedIndex,
    setSelectedTaxa,
    speciesListLoading,
    selectedRegion,
    setRegionName,
    exploreAllSpecies,
    setSelectedRegion,
    regionName,
    setMapLegendLayers,
    setRegionLayers,
    regionLayers,
    view,
    map,
    countryISO,
  } = props;

  const filterStart = [
    {
      name: 'dataset',
      title: t('Expected Sources'),
      filters: [
        {
          name: t('Refined Range Map'),
          active: false,
          test: (species) => species.source.indexOf('range') > -1,
          count: 0,
          type: 'and',
          result: false,
        },
      ],
    },
    {
      name: 'dataset',
      title: t('Recorded Sources'),
      filters: [
        {
          name: t('Occurrence'),
          active: false,
          test: (species) => {
            if (selectedRegionOption === REGION_OPTIONS.RAPID_INVENTORY_32) {
              return species.source.indexOf('Rapid') > -1;
            }
            return (
              species.source.indexOf('GBIF') > -1 ||
              species.source.indexOf('eBird') > -1
            );
          },
          count: 0,
          result: false,
          type: 'and',
        },
        // {
        //   name: 'Local Inventory',
        //   active: false,
        //   test: (species) =>
        //     species.datasetList.map((d) => d.product_type).indexOf('localinv') >
        //     -1,
        //   result: false,
        //   count: 0,
        //   type: 'and',
        // },
      ],
    },
    {
      name: 'threat',
      title: t('IUCN Status'),
      filters: [
        {
          name: t('Critically Endangered'),
          active: false,
          test: (species) =>
            species.threat_status?.toUpperCase() ===
            IUCNStatusTypes.CR.toUpperCase(),
          count: 0,
          result: false,
          type: 'or',
        },
        {
          name: t('Endangered'),
          result: false,
          active: false,
          test: (species) =>
            species.threat_status?.toUpperCase() ===
            IUCNStatusTypes.EN.toUpperCase(),
          count: 0,
          type: 'or',
        },
        {
          name: t('Vulnerable'),
          active: false,
          test: (species) =>
            species.threat_status?.toUpperCase() ===
            IUCNStatusTypes.VU.toUpperCase(),
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Near Threatened'),
          active: false,
          test: (species) =>
            species.threat_status?.toUpperCase() ===
            IUCNStatusTypes.NT.toUpperCase(),
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Least Concern'),
          active: false,
          test: (species) =>
            species.threat_status?.toUpperCase() ===
            IUCNStatusTypes.LC.toUpperCase(),
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Data Deficient'),
          active: false,
          test: (species) =>
            species.threat_status?.toUpperCase() ===
            IUCNStatusTypes.DD.toUpperCase(),
          count: 0,
          type: 'or',
          result: false,
        },
        {
          name: t('Not Evaluated'),
          active: false,
          result: false,
          test: (species) =>
            species.threat_status?.toUpperCase() ===
              IUCNStatusTypes.NE.toUpperCase() ||
            species.threat_status?.toUpperCase() ===
              IUCNStatusTypes.UN.toUpperCase(),
          count: 0,
          type: 'or',
        },
      ],
    },
  ];

  const [filters, setFilters] = useState(filterStart);
  const [regionLabel, setRegionLabel] = useState();

  const layersToFind = [
    LAYER_OPTIONS.PROTECTED_AREAS,
    LAYER_OPTIONS.PROVINCES,
    LAYER_OPTIONS.FORESTS,
    LAYER_OPTIONS.DISSOLVED_NBS,
  ];

  const handleBack = () => {
    setSelectedTaxa(null);
    setSelectedRegion(null);
    setRegionName('');
    setSelectedRegionOption(null);
    setSelectedIndex(NAVIGATION.REGION);
  };

  const getLayerIcon = (layer, item) => {
    view.whenLayerView(layer).then(() => {
      const { renderer } = layer; // Get the renderer

      if (renderer) {
        const { symbol, uniqueValueGroups } = renderer;

        if (symbol) {
          const { url, outline } = symbol;

          if (url) {
            item.imageUrl = url;
          }

          if (outline) {
            item.outline = outline;
          }
        } else if (uniqueValueGroups) {
          item.classes = uniqueValueGroups[0].classes;
        }
      }

      setMapLegendLayers((ml) => [...ml, item]);
    });
  };

  const updateActiveFilter = (filter) => {
    const newFilters = filters.map((filterGroup) => {
      const newFilterGroup = { ...filterGroup };
      newFilterGroup.filters = filterGroup.filters.map((f) => {
        if (f.name === filter.name) {
          f.active = !f.active;
        }
        return f;
      });
      return newFilterGroup;
    });
    setFilters(newFilters);
  };

  const displayLayer = async (option) => {
    if (option !== REGION_OPTIONS.DRAW) {
      const foundLayer = Object.keys(regionLayers).find((rl) =>
        layersToFind.includes(rl)
      );

      if (!foundLayer) {
        let featureLayer;
        if (option === REGION_OPTIONS.PROTECTED_AREAS) {
          featureLayer = await EsriFeatureService.addProtectedAreaLayer(
            null,
            countryISO
          );

          setRegionLayers(() => ({
            [LAYER_OPTIONS.PROTECTED_AREAS]: featureLayer,
          }));
          map.add(featureLayer);

          const protectedAreaLayer = {
            label: t(LAYER_TITLE_TYPES.PROTECTED_AREAS),
            id: LAYER_OPTIONS.PROTECTED_AREAS,
            showChildren: false,
            type: DATA_POINT_TYPE.PUBLIC,
          };

          getLayerIcon(featureLayer, protectedAreaLayer);
        } else if (option === REGION_OPTIONS.PROVINCES) {
          featureLayer = await EsriFeatureService.getFeatureLayer(
            PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
            countryISO
          );

          setRegionLayers(() => ({
            [LAYER_OPTIONS.PROVINCES]: featureLayer,
          }));
          map.add(featureLayer);

          featureLayer = await EsriFeatureService.getFeatureLayer(
            INDIGENOUS_LANDS_FEATURE_ID,
            countryISO
          );

          setRegionLayers(() => ({
            [LAYER_OPTIONS.INDIGENOUS_LANDS]: featureLayer,
          }));
          map.add(featureLayer);
        } else if (option === REGION_OPTIONS.FORESTS) {
          featureLayer = await EsriFeatureService.getFeatureLayer(
            DRC_REGION_FEATURE_ID,
            null,
            LAYER_OPTIONS.FORESTS
          );

          setRegionLayers(() => ({
            [LAYER_OPTIONS.FORESTS]: featureLayer,
          }));
          map.add(featureLayer);
        } else if (option === REGION_OPTIONS.DISSOLVED_NBS) {
          featureLayer = await EsriFeatureService.getFeatureLayer(
            NBS_OP_INTERVENTIONS_FEATURE_ID,
            null,
            LAYER_OPTIONS.DISSOLVED_NBS
          );

          setRegionLayers(() => ({
            [LAYER_OPTIONS.DISSOLVED_NBS]: featureLayer,
          }));
          map.add(featureLayer);
        }
      }
    }
  };

  useEffect(() => {
    if (!selectedRegion) return;

    // layerView.highlight(hits.graphic);

    switch (selectedRegionOption) {
      case REGION_OPTIONS.PROTECTED_AREAS:
        setRegionLabel(t('Protected Areas'));
        break;
      case REGION_OPTIONS.PROVINCES:
        setRegionLabel(t('Provinces'));
        break;
      case REGION_OPTIONS.FORESTS:
        setRegionLabel(t('Forest Titles'));
        break;
      case REGION_OPTIONS.DISSOLVED_NBS:
        setRegionLabel(t('NBS-OP Interventions'));
        break;
      case REGION_OPTIONS.ACC_REGION:
        setRegionLabel(t('Acarai-Corentyne Corridor'));
        break;
      case REGION_OPTIONS.DRAW:
        setRegionLabel(t('Custom Area'));
        break;
      default:
        break;
    }
  }, [selectedRegionOption, selectedRegion]);

  useEffect(() => {
    displayLayer(selectedRegionOption);
  }, []);

  return (
    <section
      className={cx(
        lightMode ? filterStyles.light : '',
        filterStyles.container
      )}
    >
      <div className={styles.wrapper}>
        {selectedRegionOption && !exploreAllSpecies && (
          <div className={filterStyles.selectedRegion}>
            <div className={filterStyles.regionInfo}>
              <h2>{regionName}</h2>
              <span>{regionLabel}</span>
            </div>
            <Button
              className={styles.back}
              handleClick={handleBack}
              label={t('Clear region selected')}
            />
          </div>
        )}
        <div className={styles.filters}>
          <FilterContainer
            filters={filters}
            setFilters={setFilters}
            isLoading={speciesListLoading}
            updateActiveFilter={updateActiveFilter}
            {...props}
          />
          <SpeciesListContainer isLoading={speciesListLoading} {...props} />
        </div>
      </div>
    </section>
  );
}

export default SpeciesFilterComponent;
