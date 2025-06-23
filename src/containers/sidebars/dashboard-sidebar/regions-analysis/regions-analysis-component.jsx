import React, { useContext, useEffect } from 'react';

import { DASHBOARD } from 'router';

import { useT } from '@transifex/react';

import {
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  DRC_REGION_FEATURE_ID,
  RAPID_INVENTORY_32_FEATURE_ID,
  ZONE_3_FEATURE_ID,
  ZONE_5_FEATURE_ID,
  NBS_OP_INTERVENTIONS_FEATURE_ID,
} from 'utils/dashboard-utils';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';
// import SearchInput from 'components/search-input';

import EsriFeatureService from 'services/esri-feature-service';

import {
  LAYER_OPTIONS,
  NAVIGATION,
  REGION_OPTIONS,
  LAYER_TITLE_TYPES,
  DATA_POINT_TYPE,
} from 'constants/dashboard-constants.js';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './regions-analysis-styles.module.scss';

function RegionsAnalysisComponent(props) {
  const t = useT();
  // const locale = useLocale();
  const {
    map,
    regionLayers,
    browsePage,
    setRegionLayers,
    view,
    setSelectedIndex,
    selectedRegion,
    setSelectedRegion,
    selectedIndex,
    selectedRegionOption,
    setMapLegendLayers,
    setSelectedRegionOption,
    countryISO,
  } = props;
  const { lightMode } = useContext(LightModeContext);
  // const [searchInput, setSearchInput] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

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

  const displayLayer = async (option) => {
    let featureLayer;
    setMapLegendLayers((ml) => {
      const filtered = ml.filter((l) => l.id !== LAYER_OPTIONS.PROTECTED_AREAS);
      return filtered;
    });

    if (option === REGION_OPTIONS.PROTECTED_AREAS) {
      featureLayer = await EsriFeatureService.addProtectedAreaLayer(
        null,
        countryISO
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROTECTED_AREAS]: featureLayer,
      }));
      map.add(featureLayer);

      // Add layers to Map Legend
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
    } else if (option === REGION_OPTIONS.ZONE_3) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        ZONE_3_FEATURE_ID,
        null,
        LAYER_OPTIONS.ZONE_3
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.ZONE_3]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.ZONE_5) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        ZONE_5_FEATURE_ID,
        null,
        LAYER_OPTIONS.ZONE_5
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.ZONE_5]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.RAPID_INVENTORY_32) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        RAPID_INVENTORY_32_FEATURE_ID,
        null,
        LAYER_OPTIONS.RAPID_INVENTORY_32
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.RAPID_INVENTORY_32]: featureLayer,
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
    const dissolvedLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.DISSOLVED_NBS
    );
    const zone3Layer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.ZONE_3
    );
    const zone5Layer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.ZONE_5
    );
    const rapidLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.RAPID_INVENTORY_32
    );

    map.remove(protectedAreaLayer);
    map.remove(provinceLayer);
    map.remove(forestLayer);
    map.remove(dissolvedLayer);
    map.remove(zone3Layer);
    map.remove(zone5Layer);
    map.remove(rapidLayer);
    setRegionLayers({});
  };

  const optionSelected = (event) => {
    setSelectedRegion(null);
    removeRegionLayers();

    const option = event.currentTarget.value;
    displayLayer(option);
    setSelectedRegionOption(option);
  };

  // const handleSearch = (searchText) => {
  //   setSearchInput(searchText.currentTarget.value);
  // };

  // const handleSearchSelect = (searchItem) => {
  //   // setScientificName(searchItem.scientificname);
  //   // localStorage.setItem(SPECIES_SELECTED_COOKIE, searchItem.scientificname);
  //   // setSelectedIndex(NAVIGATION.DATA_LAYER);
  // };

  // const getSearchResults = async () => {
  //   const searchURL = `https://dev-api.mol.org/2.x/spatial/regions/search?lang=en&search_term=${searchInput}&region_dataset_id=&limit=100`;

  //   const searchSpecies = await fetch(searchURL);
  //   const results = await searchSpecies.json();
  //   setSearchResults(results);
  // };

  // useEffect(() => {
  //   if (!searchInput) return;
  //   const handler = setTimeout(() => {
  //     getSearchResults();
  //   }, 300);

  //   return () => clearTimeout(handler);
  // }, [searchInput]);

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
      if (countryISO.toUpperCase() === 'EE') {
        setSelectedRegionOption(REGION_OPTIONS.DISSOLVED_NBS);
        displayLayer(REGION_OPTIONS.DISSOLVED_NBS);
      } else {
        setSelectedRegionOption(REGION_OPTIONS.PROTECTED_AREAS);
        displayLayer(REGION_OPTIONS.PROTECTED_AREAS);
      }
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
          {countryISO.toUpperCase() !== 'EE' && (
            <>
              <FormControlLabel
                value={REGION_OPTIONS.PROTECTED_AREAS}
                control={<Radio />}
                label={t('Protected Areas')}
              />

              <FormControlLabel
                value={REGION_OPTIONS.PROVINCES}
                control={<Radio />}
                label={t('Provinces')}
              />
            </>
          )}
          {countryISO === 'COD' && (
            <FormControlLabel
              value={REGION_OPTIONS.FORESTS}
              control={<Radio />}
              label={t('Forest Titles')}
            />
          )}
          {countryISO.toUpperCase() === 'EE' && (
            <FormControlLabel
              value={REGION_OPTIONS.DISSOLVED_NBS}
              control={<Radio />}
              label={t('NBS-OP Interventions')}
            />
          )}
          {countryISO.toUpperCase() === 'GUY-FM' && (
            <>
              <FormControlLabel
                value={REGION_OPTIONS.ZONE_3}
                control={<Radio />}
                label={t('3 Zones')}
              />
              <FormControlLabel
                value={REGION_OPTIONS.ZONE_5}
                control={<Radio />}
                label={t('5 Zones')}
              />
              <FormControlLabel
                value={REGION_OPTIONS.RAPID_INVENTORY_32}
                control={<Radio />}
                label={t('Rapid Inventory 32')}
              />
            </>
          )}
          {/* <FormControlLabel value="proposedProtectedAreas" control={<Radio />} label={t('Proposed Protected Areas')} /> */}
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
