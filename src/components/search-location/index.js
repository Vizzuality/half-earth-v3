import React, { useState, useEffect, useCallback } from 'react';
import { useT, useLocale } from '@transifex/react';
import { getCountryNames } from 'constants/translation-constants';

import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import urlActions from 'actions/url-actions';

import { setCountryTooltip, flyToCentroid } from 'utils/globe-events-utils';

import { useSearchWidgetLogic } from 'hooks/esri';

import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import { SEARCH_SOURCES_CONFIG } from 'constants/search-location-constants';

import Component from './component.jsx';

const actions = { ...mapTooltipActions, ...urlActions };

const SearchLocationContainer = (props) => {
  const { view, searchSourceLayerSlug, changeGlobe } = props;
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
  }, [searchResults])


  const browseSelectedFeature = ({ result }) => {
    const { setBatchTooltipData } = props;
    const tooltipConfig = MAP_TOOLTIP_CONFIG[searchSourceLayerSlug];

    const { title, subtitle, id, iso } = tooltipConfig;
    const { geometry, attributes } = result.feature;
    setBatchTooltipData({
      isVisible: true,
      geometry,
      content: {
        buttonText: t('analyze area'),
        id: attributes[id],
        title: attributes[title] || attributes['NAME_0'],
        subtitle: attributes[subtitle] || attributes['NAME_1'],
      }
    });

    flyToCentroid(view, geometry, 4)

    // National Report Card search
    if (iso) {
      setCountryTooltip({ countryIso: attributes[iso], countryName: countryNames[attributes[title]] || attributes[title], changeGlobe });
    }
  }

  const getSearchResults = (e) => {
    const { results } = e;
    setSearchResults(results[0].results);
    if (!isSearchResultVisible) {
      setIsSearchResultsVisible(true);
    }
  }

  useEffect(() => {
    const config = SEARCH_SOURCES_CONFIG[searchSourceLayerSlug];
    const { url, title, outFields, searchFields, suggestionTemplate } = config;
    setSearchWidgetConfig({
      searchResultsCallback: getSearchResults,
      postSearchCallback: browseSelectedFeature,
      searchSources: (FeatureLayer) => {
        return [{
          outFields,
          searchFields,
          suggestionTemplate,
          layer: new FeatureLayer({ url, title, outFields }),
        }]
      }
    })
  }, [searchSourceLayerSlug])

  const { updateSources, handleOpenSearch, handleSearchInputChange, handleSearchSuggestionClick } = useSearchWidgetLogic(view, () => { }, searchWidgetConfig);

  useEffect(() => {
    const config = SEARCH_SOURCES_CONFIG[searchSourceLayerSlug];
    const { url, title, outFields, searchFields, suggestionTemplate } = config;
    updateSources((FeatureLayer) => {
      return [{
        outFields,
        searchFields,
        suggestionTemplate,
        layer: new FeatureLayer({ url, title, outFields }),
      }]
    })
  }, [searchSourceLayerSlug])

  const onOptionSelection = (selectedOption) => {
    handleSearchSuggestionClick(selectedOption)
    setIsSearchResultsVisible(false);
  }

  return (
    <Component
      searchResults={searchResults}
      handleOpenSearch={handleOpenSearch}
      onOptionSelection={onOptionSelection}
      handleInputChange={handleSearchInputChange}
      isSearchResultVisible={isSearchResultVisible}
      {...props}
    />
  )
}

export default connect(null, actions)(SearchLocationContainer);
