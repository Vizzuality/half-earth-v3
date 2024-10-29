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
  INITIAL_LAYERS,
  LAYER_OPTIONS,
  NAVIGATION,
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  REGION_OPTIONS
} from '../../../../utils/dashboard-utils';

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
    if (selectedRegionOption && selectedRegion) {
      setSelectedIndex(NAVIGATION.EXPLORE_SPECIES)
    } else if (selectedRegionOption) {
      setSelectedRegionOption(selectedRegionOption);
      displayLayer(selectedRegionOption);
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
    let layers;
    if (option === REGION_OPTIONS.PROTECTED_AREAS) {
      layers = EsriFeatureService.addProtectedAreaLayer(null, countryISO);
      layers.featureLayer.opacity = 0;

      setRegionLayers({
        [LAYER_OPTIONS.PROTECTED_AREAS]: layers.featureLayer,
        [LAYER_OPTIONS.PROTECTED_AREAS_VECTOR]: layers.vectorTileLayer
      });
      map.add(layers.groupLayer);
    } else if (option === REGION_OPTIONS.PROVINCES) {
      layers = EsriFeatureService.getFeatureLayer(PROVINCE_FEATURE_GLOBAL_OUTLINE_ID, countryISO);

      setRegionLayers({
        [LAYER_OPTIONS.PROVINCES]: layers,
      });
      map.add(layers);
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
    map.layers.items.forEach(layer => {
      if (!INITIAL_LAYERS.includes(layer.id)) {
        map.remove(layer);
      }
    });
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
