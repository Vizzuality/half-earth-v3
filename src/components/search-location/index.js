import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import { SEARCH_SOURCES_CONFIG } from 'constants/search-location-constants';
import countryTooltipActions from 'redux_modules/country-tooltip';

import { useSearchWidgetLogic } from 'hooks/esri';
const actions = {...countryTooltipActions };
const SearchLocationContainer = (props) => {
  const { view, searchSourceLayerSlug } = props;
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
    const { feature } = result;
    const { attributes } = feature;
    const { setBatchTooltipData } = props;
    setBatchTooltipData({
      isVisible: true,
      content: {
        countryISO: attributes.GID_0,
        countryName: attributes.NAME_0,
      }
    });
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
  }, [])

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