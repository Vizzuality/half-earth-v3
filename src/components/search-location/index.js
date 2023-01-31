/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { useT, useLocale } from '@transifex/react';

import urlActions from 'actions/url-actions';

import { setCountryTooltip, flyToCentroid } from 'utils/globe-events-utils';
import { getTooltipContent } from 'utils/tooltip-utils';

import { useSearchWidgetLogic } from 'hooks/esri';

import EsriFeatureService from 'services/esri-feature-service';

import { SEARCH_LOOKUP_TABLE } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import { SEARCH_TYPES } from 'constants/search-location-constants';
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
  const {
    view,
    searchSourceLayerSlug,
    changeGlobe,
    searchType,
    setSearchLocationModal,
  } = props;

  const [searchResults, setSearchResults] = useState(false);
  const [searchWidgetConfig, setSearchWidgetConfig] = useState({});
  const [isSearchResultVisible, setIsSearchResultsVisible] = useState(false);

  const t = useT();
  const locale = useLocale();

  const countryNames = useMemo(getCountryNames, [locale]);

  const browseSelectedFeature = async ({ result }) => {
    const { setBatchTooltipData } = props;
    const {
      attributes: { LAYERSLUG, MOL_ID },
    } = result.feature;
    const searchResult = await getSearchedLayerData(LAYERSLUG, MOL_ID);

    const feature = searchResult && searchResult[0];

    const tooltipConfig = MAP_TOOLTIP_CONFIG[searchSourceLayerSlug];
    const { title, subtitle, id, iso } = tooltipConfig;
    const { geometry, attributes } = feature;

    // National Report Card search
    if (iso) {
      setCountryTooltip({
        countryIso: attributes[iso],
        countryName: countryNames[attributes[title]] || attributes[title],
        changeGlobe,
      });
    } else if (searchType !== SEARCH_TYPES.simple) {
      setBatchTooltipData({
        isVisible: true,
        geometry,
        precalculatedLayerSlug: result.feature.attributes.LAYERSLUG,
        content: getTooltipContent(t, attributes, id, title, subtitle),
      });
    }

    flyToCentroid(view, geometry, 5, { maxDuration: 100000 }).catch(() => {
      // If it fails just go without animation
      flyToCentroid(view, geometry, 5, { animate: false });
    });
  };

  const getSearchResults = (e) => {
    const { results, searchTerm } = e;
    setSearchResults(results[0].results);
    if (!isSearchResultVisible && searchTerm && searchTerm !== '') {
      setIsSearchResultsVisible(true);
    } else {
      setIsSearchResultsVisible(false);
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
    const url = LAYERS_URLS[SEARCH_LOOKUP_TABLE];
    const searchFields = ['NAME'];
    const suggestionTemplate = '{NAME}|{LAYERSLUG}'; // Add a | to split the data as we can't get it otherwise
    const title = SEARCH_LOOKUP_TABLE;

    const getSearchSources = (FeatureLayer) => [
      {
        searchFields,
        suggestionTemplate,
        outFields: ['*'],
        ...(searchType !== SEARCH_TYPES.simple
          ? {
              filter: {
                where: `LANGUAGES LIKE '%${locale || 'en'}%'${
                  searchType === SEARCH_TYPES.country
                    ? `AND LAYERSLUG = 'gadm-0-admin-areas-feature-layer'`
                    : ''
                }`,
              },
            }
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
    if (setSearchLocationModal) {
      setSearchLocationModal(false);
    }
  };
  const handleCloseOptionList = () => setIsSearchResultsVisible(false);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      searchResults={searchResults}
      handleOpenSearch={handleOpenSearch}
      handleCloseOptionList={handleCloseOptionList}
      onOptionSelection={onOptionSelection}
      handleInputChange={handleSearchInputChange}
      isSearchResultVisible={isSearchResultVisible}
      {...props}
    />
  );
}

export default connect(null, actions)(SearchLocationContainer);
