import React, { useContext, useEffect } from 'react';

import { DASHBOARD } from 'router';

import { useT } from '@transifex/react';

import {
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  DRC_REGION_FEATURE_ID,
} from 'utils/dashboard-utils';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';

import EsriFeatureService from 'services/esri-feature-service';

import {
  LAYER_OPTIONS,
  NAVIGATION,
  REGION_OPTIONS,
} from 'constants/dashboard-constants.js';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './regions-analysis-styles.module.scss';

function RegionsAnalysisComponent(props) {
  const t = useT();
  const {
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

  const displayLayer = (option) => {
    let featureLayer;
    if (option === REGION_OPTIONS.PROTECTED_AREAS) {
      featureLayer = EsriFeatureService.addProtectedAreaLayer(null, countryISO);

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROTECTED_AREAS]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.PROVINCES) {
      featureLayer = EsriFeatureService.getFeatureLayer(
        PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
        countryISO
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROVINCES]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.FORESTS) {
      featureLayer = EsriFeatureService.getFeatureLayer(
        DRC_REGION_FEATURE_ID,
        null,
        LAYER_OPTIONS.FORESTS
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.FORESTS]: featureLayer,
      }));
      map.add(featureLayer);
    }

    browsePage({
      type: DASHBOARD,
      payload: { iso: countryISO.toLowerCase() },
      query: {
        scientificName,
        selectedIndex,
        regionLayers,
        selectedRegionOption: option,
      },
    });
  };

  const removeRegionLayers = () => {
    const protectedAreaLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.PROTECTED_AREAS
    );
    const provinceLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.PROVINCES
    );
    const forestLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.FORESTS
    );

    map.remove(protectedAreaLayer);
    map.remove(provinceLayer);
    map.remove(forestLayer);
  };

  const optionSelected = (event) => {
    setSelectedRegion(null);
    removeRegionLayers();

    const option = event.currentTarget.value;
    displayLayer(option);
    setSelectedRegionOption(option);
  };

  useEffect(() => {
    removeRegionLayers();
    if (selectedRegionOption && selectedRegion) {
      setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
    } else {
      setSelectedRegionOption(REGION_OPTIONS.PROTECTED_AREAS);
      displayLayer(REGION_OPTIONS.PROTECTED_AREAS);
    }
  }, []);

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Regions Analysis')}</span>
      <span className={styles.sectionSubtitle}>
        {t(
          'Explore high quality biodiversity expectations for any area of interest'
        )}
      </span>
      <hr className={hrTheme.dark} />
      <p>{t('Select a region type below to display on the map')}</p>
      <div className={styles.choices}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={optionSelected}
          value={selectedRegionOption}
        >
          <FormControlLabel
            value={REGION_OPTIONS.PROTECTED_AREAS}
            control={<Radio />}
            label={t('Protected Areas')}
          />
          {/* <FormControlLabel value="proposedProtectedAreas" control={<Radio />} label={t('Proposed Protected Areas')} /> */}
          <FormControlLabel
            value={REGION_OPTIONS.PROVINCES}
            control={<Radio />}
            label={t('Provinces')}
          />
          {countryISO === 'COD' && (
            <FormControlLabel
              value={REGION_OPTIONS.FORESTS}
              control={<Radio />}
              label={t('Forest Titles')}
            />
          )}
          {/* <FormControlLabel value="priorityAreas" control={<Radio />} label={t('Priority Areas')} /> */}
          {/* <FormControlLabel value="communityForests" control={<Radio />} label={t('Community Forests')} /> */}
        </RadioGroup>
        <div className={styles.comingSoon}>
          <span>{t('Coming Soon')}</span>
          <span>{t('Upload or draw a custom area on the map')}</span>
          <Button
            className={styles.disabled}
            type="rectangular"
            label={t('Upload a shapefile')}
          />
          <Button
            className={styles.disabled}
            type="rectangular"
            label={t('Draw an area')}
          />
        </div>
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
