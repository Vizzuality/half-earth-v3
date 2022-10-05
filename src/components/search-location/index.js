/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { useT, useLocale } from '@transifex/react';

import urlActions from 'actions/url-actions';

import { setCountryTooltip, flyToCentroid } from 'utils/globe-events-utils';
import { getTooltipContent } from 'utils/tooltip-utils';

import { useSearchWidgetLogic } from 'hooks/esri';

import EsriFeatureService from 'services/esri-feature-service';

import {
  SEARCH_LOOKUP_TABLE,
  WDPA_OECM_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import {
  SEARCH_SOURCES_CONFIG,
  SEARCH_TYPES,
} from 'constants/search-location-constants';
import { getCountryNames } from 'constants/translation-constants';

import Component from './component';

const actions = { ...mapTooltipActions, ...urlActions };

const getSearchedLayerData = (layerSlug, molId) =>
  new Promise((resolve, reject) => {
    const url = Array.isArray(LAYERS_URLS[layerSlug])
      ? LAYERS_URLS[layerSlug][0]
      : LAYERS_URLS[layerSlug];
    EsriFeatureService.getFeatures({
      url,
      returnGeometry: true,
      whereClause: `MOL_ID = '${molId}'`,
    })
      .then((features) => {
        resolve(features);
      })
      .catch((error) => reject(error));
  });

function SearchLocationContainer(props) {
  const { view, searchSourceLayerSlug, changeGlobe, searchType } = props;

  const [searchResults, setSearchResults] = useState(false);
  const [searchWidgetConfig, setSearchWidgetConfig] = useState({});
  const [isSearchResultVisible, setIsSearchResultsVisible] = useState(false);

  const t = useT();
  const locale = useLocale();

  const countryNames = useCallback(getCountryNames, [locale]);

  useEffect(() => {
    if (searchResults && searchResults.length !== 0) {
      setIsSearchResultsVisible(true);
    } else {
      setIsSearchResultsVisible(false);
    }
  }, [searchResults]);

  const browseSelectedFeature = async ({ result }) => {
    const { setBatchTooltipData } = props;
    let searchResult;
    if (searchType === SEARCH_TYPES.full) {
      // We have to find the information of the layer with the lookup table info
      const { attributes } = result.feature;
      const { LAYERSLUG, MOL_ID } = attributes;
      searchResult = await getSearchedLayerData(LAYERSLUG, MOL_ID);
    }

    const feature =
      searchType === SEARCH_TYPES.full
        ? searchResult && searchResult[0]
        : result.feature;

    const tooltipConfig = MAP_TOOLTIP_CONFIG[searchSourceLayerSlug];
    const { title, subtitle, id, iso } = tooltipConfig;
    const { geometry, attributes } = feature;

    // TODO: Check this when we merge the administrative options
    const getPrecalculatedLayer = () => {
      if (attributes.DESIG_T) {
        return WDPA_OECM_FEATURE_LAYER;
      }
      return attributes.GID_1
        ? GADM_1_ADMIN_AREAS_FEATURE_LAYER
        : GADM_0_ADMIN_AREAS_FEATURE_LAYER;
    };

    if (searchType !== SEARCH_TYPES.simple) {
      setBatchTooltipData({
        isVisible: true,
        geometry,
        precalculatedLayerSlug:
          result.feature.attributes.LAYERSLUG || getPrecalculatedLayer(),
        content: getTooltipContent(t, attributes, id, title, subtitle),
      });
    }

    flyToCentroid(view, geometry, 4);

    // National Report Card search
    if (iso) {
      setCountryTooltip({
        countryIso: attributes[iso],
        countryName: countryNames[attributes[title]] || attributes[title],
        changeGlobe,
      });
    }
  };

  const getSearchResults = (e) => {
    const { results } = e;
    setSearchResults(results[0].results);
    if (!isSearchResultVisible) {
      setIsSearchResultsVisible(true);
    }
  };

  const {
    updateSources,
    handleOpenSearch,
    handleSearchInputChange,
    handleSearchSuggestionClick,
  } = useSearchWidgetLogic(
    view,
    () => {},
    searchWidgetConfig,
    searchType === SEARCH_TYPES.simple
  );

  useEffect(() => {
    const config = SEARCH_SOURCES_CONFIG[searchSourceLayerSlug];
    let { url, searchFields, suggestionTemplate, title } = config;

    if (searchType === SEARCH_TYPES.full) {
      url = LAYERS_URLS[SEARCH_LOOKUP_TABLE];
      searchFields = ['NAME'];
      suggestionTemplate = '{NAME}';
      title = SEARCH_LOOKUP_TABLE;
    }
    const getSearchSources = (FeatureLayer) => [
      {
        searchFields,
        suggestionTemplate,
        outFields: ['*'],
        ...(searchType === SEARCH_TYPES.full
          ? { filter: { where: `LANGUAGES LIKE '%${locale || 'en'}%'` } }
          : {}),
        layer: new FeatureLayer({
          url,
          title,
          outFields: ['*'],
        }),
      },
    ];

    setSearchWidgetConfig({
      searchResultsCallback: getSearchResults,
      postSearchCallback: browseSelectedFeature,
      searchSources: getSearchSources,
    });

    updateSources(getSearchSources);
  }, [searchSourceLayerSlug, locale]);

  const onOptionSelection = (selectedOption) => {
    handleSearchSuggestionClick(selectedOption);
    setIsSearchResultsVisible(false);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      searchResults={searchResults}
      handleOpenSearch={handleOpenSearch}
      onOptionSelection={onOptionSelection}
      handleInputChange={handleSearchInputChange}
      isSearchResultVisible={isSearchResultVisible}
      {...props}
    />
  );
}

export default connect(null, actions)(SearchLocationContainer);
