import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import { SEARCH_SOURCES_CONFIG } from 'constants/search-location-constants';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { useSearchWidgetLogic } from 'hooks/esri';
const actions = {...mapTooltipActions };
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
    const { setBatchTooltipData } = props;
    console.log(result)
    const tooltipConfig = MAP_TOOLTIP_CONFIG[searchSourceLayerSlug];
      const { title, subtitle, buttonText, id } = tooltipConfig;
      const { geometry, attributes } = result.feature;
      setBatchTooltipData({
        isVisible: true,
        geometry,
        content: {
          buttonText,
          id: attributes[id],
          title: attributes[title],
          subtitle: attributes[subtitle],
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