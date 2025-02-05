import React, { useContext, useEffect, useState } from 'react';

import { DASHBOARD } from 'router';

import { useLocale, useT } from '@transifex/react';

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
import SearchInput from 'components/search-input';

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
  const locale = useLocale();
  const {
    map,
    regionLayers,
    browsePage,
    setRegionLayers,
    setSelectedIndex,
    selectedRegion,
    setSelectedRegion,
    selectedIndex,
    selectedRegionOption,
    setSelectedRegionOption,
    countryISO,
  } = props;
  const { lightMode } = useContext(LightModeContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const displayLayer = async (option) => {
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
    } else if (option === REGION_OPTIONS.PROVINCES) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
        countryISO
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROVINCES]: featureLayer,
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
    }
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
    setRegionLayers({});
  };

  const optionSelected = (event) => {
    setSelectedRegion(null);
    removeRegionLayers();

    const option = event.currentTarget.value;
    displayLayer(option);
    setSelectedRegionOption(option);
  };

  const handleSearch = (searchText) => {
    setSearchInput(searchText.currentTarget.value);
  };

  const handleSearchSelect = (searchItem) => {
    // setScientificName(searchItem.scientificname);
    // localStorage.setItem(SPECIES_SELECTED_COOKIE, searchItem.scientificname);
    // setSelectedIndex(NAVIGATION.DATA_LAYER);
  };

  const getSearchResults = async () => {
    const searchURL = `https://dev-api.mol.org/2.x/spatial/regions/search?lang=en&search_term=${searchInput}&region_dataset_id=&limit=100`;

    const searchSpecies = await fetch(searchURL);
    const results = await searchSpecies.json();
    setSearchResults(results);
  };

  useEffect(() => {
    if (!searchInput) return;
    const handler = setTimeout(() => {
      getSearchResults();
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    browsePage({
      type: DASHBOARD,
      payload: { iso: countryISO.toLowerCase() },
      query: {
        selectedIndex,
        regionLayers,
        selectedRegionOption,
      },
    });
  }, [regionLayers]);

  useEffect(() => {
    if (selectedRegionOption && selectedRegion) {
      setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
    } else {
      removeRegionLayers();
      displayLayer(REGION_OPTIONS.PROTECTED_AREAS);
      setSelectedRegionOption(REGION_OPTIONS.PROTECTED_AREAS);
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
      {/* <div className={styles.explore}>
        <SearchInput
          className={cx(
            styles.search,
            searchInput && searchResults.length > 0 ? styles.showResults : ''
          )}
          placeholder={t('Search for a species by name')}
          onChange={handleSearch}
          value={searchInput}
        />
        {searchInput && searchResults.length > 0 && (
          <ul className={styles.searchResults}>
            {searchResults.map((item, index) => (
              <li key={index}>
                <button type="button" onClick={() => handleSearchSelect(item)}>
                  <b>{item.scientificname}</b> - <span>{item.vernacular}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div> */}
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
