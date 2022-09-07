/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import urlActions from 'actions/url-actions';

import { setCountryTooltip, flyToCentroid } from 'utils/globe-events-utils';

import { useT, useLocale } from '@transifex/react';

import { useSearchWidgetLogic } from 'hooks/esri';

import EsriFeatureService from 'services/esri-feature-service';

import { SEARCH_LOOKUP_TABLE } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import { SEARCH_SOURCES_CONFIG, SEARCH_TYPES } from 'constants/search-location-constants';
import { getCountryNames } from 'constants/translation-constants';

import Component from './component';

const actions = { ...mapTooltipActions, ...urlActions };

const {
  REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL,
} = process.env;

const getSearchedLayerData = (layerSlug, molId) => new Promise((resolve, reject) => {
  EsriFeatureService.getFeatures({
    url: LAYERS_URLS[layerSlug],
    returnGeometry: true,
    whereClause: `MOL_ID = '${molId}'`,
  }).then((features) => {
    resolve(features);
  }).catch((error) => reject(error));
});

function SearchLocationContainer(props) {
  const {
    view, searchSourceLayerSlug, changeGlobe, searchType,
  } = props;

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
    if (searchType === SEARCH_TYPES.full && REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL) {
      // We have to find the information of the layer with the lookup table info
      const { attributes } = result.feature;
      const { LAYERSLUG, MOL_ID } = attributes;
      searchResult = await getSearchedLayerData(LAYERSLUG, MOL_ID);
    }

    const feature = searchType === SEARCH_TYPES.full && REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL
      ? searchResult && searchResult[0]
      : result.feature;

    const tooltipConfig = MAP_TOOLTIP_CONFIG[searchSourceLayerSlug];
    const {
      title, subtitle, id, iso,
    } = tooltipConfig;
    const { geometry, attributes } = feature;

    if (searchType !== SEARCH_TYPES.simple) {
      setBatchTooltipData({
        isVisible: true,
        geometry,
        precalculatedLayer: (searchType === SEARCH_TYPES.full
          && REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL)
          ? result.feature.attributes.LAYERSLUG : undefined,
        content: {
          buttonText: t('analyze area'),
          id: attributes[id],
          title: attributes[title] || attributes.NAME_0,
          subtitle: attributes[subtitle] || attributes.NAME_1,
          objectId: attributes.OBJECTID, // Only for feature places
          percentage_protected: Math.round(attributes.percentage_protected) || 100,
          // 100 is for protected areas
          description:
            attributes.DESIG && `${attributes.DESIG}, ${attributes.STATUS.toLowerCase()} t('in') ${attributes.STATUS_}`,
          nspecies: attributes.nspecies,
          status: attributes.STATUS,
          status_year: attributes.STATUS_,
          IUCN_type: attributes.IUCN_CA,
          designation_type: attributes.DESIG_T,
        },
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
    updateSources, handleOpenSearch, handleSearchInputChange, handleSearchSuggestionClick,
  } = useSearchWidgetLogic(view, () => { }, searchWidgetConfig, searchType === SEARCH_TYPES.simple);

  useEffect(() => {
    const config = SEARCH_SOURCES_CONFIG[searchSourceLayerSlug];
    let {
      url, searchFields, suggestionTemplate, title,
    } = config;

    if (searchType === SEARCH_TYPES.full && REACT_APP_FEATURE_MERGE_NATIONAL_SUBNATIONAL) {
      url = LAYERS_URLS[SEARCH_LOOKUP_TABLE];
      searchFields = ['NAME'];
      suggestionTemplate = '{NAME}';
      title = SEARCH_LOOKUP_TABLE;
    }

    const getSearchSources = (FeatureLayer) => [{
      searchFields,
      suggestionTemplate,
      outFields: ['*'],
      layer: new FeatureLayer({
        url,
        title,
        outFields: ['*'],
      }),
    }];

    setSearchWidgetConfig({
      searchResultsCallback: getSearchResults,
      postSearchCallback: browseSelectedFeature,
      searchSources: getSearchSources,
    });

    updateSources(getSearchSources);
  }, [searchSourceLayerSlug]);

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
