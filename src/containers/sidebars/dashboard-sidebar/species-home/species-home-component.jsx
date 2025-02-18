import React, { useContext, useEffect, useState } from 'react';

import { useLocale, useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import Button from 'components/button';
import SearchInput from 'components/search-input';

import EsriFeatureService from 'services/esri-feature-service';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './species-home-styles.module.scss';

function SpeciesHomeComponent(props) {
  const t = useT();
  const locale = useLocale();
  const {
    setSelectedIndex,
    setScientificName,
    prioritySpeciesList,
    setSelectedRegionOption,
    setSelectedTaxa,
    setSelectedRegion,
    setExploreAllSpecies,
  } = props;

  const { lightMode } = useContext(LightModeContext);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchURL =
    'https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/COD_species_list_for_search/FeatureServer';
  // 'https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/spatial/regions/spatial_species_search';

  let controller = null;

  const handleSearch = (searchText) => {
    setSearchInput(searchText.currentTarget.value);
  };

  const handleSearchSelect = (searchItem) => {
    setScientificName(searchItem.scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, searchItem.scientificname);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
  };

  const handleExploreAllSpecies = () => {
    setSelectedRegion(null);
    setSelectedRegionOption(null);
    setSelectedTaxa(null);
    setExploreAllSpecies(true);
    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
  };

  const getSearchResults = async () => {
    controller = new AbortController();
    const { signal } = controller;

    const commonName =
      locale === 'fr' ? 'commonname_french' : 'commonname_english';

    const searchSpecies = await EsriFeatureService.getFeatures({
      url: searchURL,
      whereClause: `scientificname like '%${searchInput}%' or ${commonName} like '%${searchInput}%'`,
      returnGeometry: false,
      signal,
    });

    // const searchSpecies = await fetch(`${searchURL}?${params}`, { signal });
    const results = searchSpecies.map((feature) => feature.attributes);
    setSearchResults(results);
  };

  const selectSpecies = (scientificname) => {
    setExploreAllSpecies(false);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

  useEffect(() => {
    if (!searchInput) return;

    if (controller) {
      controller.abort();
    }
    getSearchResults();

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [searchInput]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.content}>
        <span className={styles.sectionTitle}>
          {t('Biodiversity Dashboard')}
        </span>
        <hr className={hrTheme.dark} />
        <p>
          {t(
            'Explore species spatial data, view conservation status, and analyze regions where a species occurs'
          )}
        </p>
        <div className={styles.explore}>
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
              {searchResults.map(
                (item) =>
                  item.scientificname && (
                    <li key={item.scientificname}>
                      <button
                        type="button"
                        onClick={() => handleSearchSelect(item)}
                      >
                        <b>{item.scientificname}</b> -{' '}
                        <span>
                          {locale === 'fr'
                            ? item.commonname_french
                            : item.commonname_english}
                        </span>
                      </button>
                    </li>
                  )
              )}
            </ul>
          )}
          <Button
            type="rectangular"
            label={t('Explore all Species')}
            handleClick={handleExploreAllSpecies}
          />
        </div>
        {prioritySpeciesList.length > 0 && (
          <div className={styles.mostPopular}>
            <span className={styles.sectionTitle}>{t('Popular Species')}</span>
            <div className={styles.species}>
              {prioritySpeciesList.map((species) => (
                <button
                  key={species.species_name}
                  type="button"
                  className={cx(styles.navCard)}
                  onClick={() => selectSpecies(species.species_name)}
                >
                  <img
                    src={species.image_url}
                    alt={species.species_name}
                    width={200}
                    height={200}
                  />
                  <span>{species.local_name || species.common_name_en}</span>
                  <p>{species.species_name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <PartnersContainer /> */}
    </div>
  );
}

export default SpeciesHomeComponent;
