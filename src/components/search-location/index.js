import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import { SEARCH_SOURCES_CONFIG } from 'constants/search-location-constants';
import urlActions from 'actions/url-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import { setCountryTooltip } from 'utils/globe-events-utils';

import { useSearchWidgetLogic } from 'hooks/esri';
const actions = { ...mapTooltipActions, ...urlActions };

const SearchLocationContainer = (props) => {
  const { view, searchSourceLayerSlug, changeGlobe } = props;
  const [searchResults, setSearchResults] = useState(false);
  const [searchWidgetConfig, setSearchWidgetConfig] = useState({});
  const [isSearchResultVisible, setIsSearchResultsVisible] = useState(false);

  useEffect(() => {
    if (searchResults && searchResults.length !== 0) {
      setIsSearchResultsVisible(true);
    } else {
      setIsSearchResultsVisible(false);
    }
  },[searchResults])


  const browseSelectedFeature = ({result}) => {
    const { setBatchTooltipData } = props;
    const tooltipConfig = MAP_TOOLTIP_CONFIG[searchSourceLayerSlug];

    const { title, subtitle, buttonText, id, iso } = tooltipConfig;
    const { geometry, attributes } = result.feature;
    setBatchTooltipData({
      isVisible: true,
      geometry,
      content: {
        buttonText,
        id: attributes[id],
        title: attributes[title] || attributes['NAME_0'],
        subtitle: attributes[subtitle] || attributes['NAME_1'],
      }
    });

    // National Report Card search
    if (iso) {
      setCountryTooltip({ countryIso: attributes[iso], countryName: attributes[title], changeGlobe });
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

  const { updateSources, handleOpenSearch, handleSearchInputChange, handleSearchSuggestionClick } = useSearchWidgetLogic(view, () => {}, searchWidgetConfig);

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
