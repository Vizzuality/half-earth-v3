import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import Button from 'components/button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchLocation from 'components/search-location';
import EsriFeatureService from 'services/esri-feature-service';
import { DASHBOARD } from 'router';
import GroupLayer from '@arcgis/core/layers/GroupLayer.js';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './regions-analysis-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
import { useT } from '@transifex/react';
import {
  LAYER_OPTIONS,
  NAVIGATION,
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  REGION_OPTIONS
} from 'utils/dashboard-utils';

function RegionsAnalysisComponent(props) {
  const t = useT();
  const {
    view,
    selectedOption,
    map,
    regionLayers,
    browsePage,
    setRegionLayers,
    setSelectedIndex,
    selectedRegion,
    setSelectedRegion,
    scientificName,
    selectedIndex,
    selectedRegionOption,
    setSelectedRegionOption,
    countryISO,
  } = props;
  const { lightMode } = useContext(LightModeContext);

  useEffect(() => {
    removeRegionLayers();
    if (selectedRegionOption && selectedRegion) {
      setSelectedIndex(NAVIGATION.EXPLORE_SPECIES)
    } else {
      setSelectedRegionOption(null);
    }
  }, []);


  const optionSelected = (event) => {
    setSelectedRegion(null);
    removeRegionLayers();

    const option = event.currentTarget.value;
    displayLayer(option);
    setSelectedRegionOption(option);
  }

  const displayLayer = (option) => {
    let featureLayer;
    if (option === REGION_OPTIONS.PROTECTED_AREAS) {
      featureLayer = EsriFeatureService.addProtectedAreaLayer(null, countryISO);

      setRegionLayers((regionLayers) => ({
        [LAYER_OPTIONS.PROTECTED_AREAS]: featureLayer
      }));
      map.add(featureLayer);
      view.goTo({
        zoom: 6,
      });
    } else if (option === REGION_OPTIONS.PROVINCES) {
      featureLayer = EsriFeatureService.getFeatureLayer(PROVINCE_FEATURE_GLOBAL_OUTLINE_ID, countryISO);

      setRegionLayers((regionLayers) => ({
        [LAYER_OPTIONS.PROVINCES]: featureLayer,
      }));
      map.add(featureLayer);
    }

    browsePage({
      type: DASHBOARD,
      payload: { iso: countryISO.toLowerCase() },
      query: {
        scientificName: scientificName,
        selectedIndex: selectedIndex,
        regionLayers,
        selectedRegionOption: option
      },
    });
  }

  const removeRegionLayers = () => {
    const protectedAreaLayer = map.layers.items.find(layer => layer.id === LAYER_OPTIONS.PROTECTED_AREAS);
    const protectedAreaLayerVector = map.layers.items.find(layer => layer.id === LAYER_OPTIONS.PROTECTED_AREAS_VECTOR);
    const provinceLayer = map.layers.items.find(layer => layer.id === LAYER_OPTIONS.PROVINCES);

    map.remove(protectedAreaLayer);
    map.remove(protectedAreaLayerVector);
    map.remove(provinceLayer);
  }

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Regions Analysis')}</span>
      <hr className={hrTheme.dark} />
      <p>
        {t('Select a region type below to display on the map and explore species lists for each region.')}
      </p>
      <div className={styles.choices}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={optionSelected}
          value={selectedRegionOption}
        >
          <FormControlLabel value={REGION_OPTIONS.PROTECTED_AREAS} control={<Radio />} label={t('Protected Areas')} />
          {/* <FormControlLabel value="proposedProtectedAreas" control={<Radio />} label={t('Proposed Protected Areas')} /> */}
          <FormControlLabel value={REGION_OPTIONS.PROVINCES} control={<Radio />} label={t('Provinces')} />
          {/* <FormControlLabel value="priorityAreas" control={<Radio />} label={t('Priority Areas')} /> */}
          {/* <FormControlLabel value="communityForests" control={<Radio />} label={t('Community Forests')} /> */}
        </RadioGroup>
      </div>
      {/* <div className={styles.search}>
        <SearchLocation
          stacked
          searchType={SEARCH_TYPES.full}
          view={view}
          theme="dark"
          width="full"
          parentWidth="380px"
          searchSourceLayerSlug={selectedOption?.slug}
        />
        <Button
          type="rectangular"
          className={styles.saveButton}
          label={t('Download Data')}
        />
      </div> */}
    </section>
  );
}

export default RegionsAnalysisComponent;
