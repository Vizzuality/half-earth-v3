import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { useT } from '@transifex/react';

import { searchTermsAnalyticsEvent } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import { flyToCentroid } from 'utils/globe-events-utils';
import { getTooltipContent } from 'utils/tooltip-utils';

// icons

import { useSearchWidgetLogic } from 'hooks/esri';

import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import { SEARCH_SOURCES_CONFIG } from 'constants/search-location-constants';

import { ReactComponent as SearchIcon } from 'icons/searchMobile.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';

import Component from './menu-footer-component';

function MenuFooterContainer(props) {
  const {
    view, isSidebarOpen, activeOption,
    // selectedSidebar, selectedFeaturedMap, featured = false
  } = props;
  const t = useT();

  const [isSearchResultVisible, setIsSearchResultsVisible] = useState(false);
  const [searchResults, setSearchResults] = useState();

  const browseSelectedFeature = ({ result }) => {
    const { setBatchTooltipData } = props;
    const tooltipConfig = MAP_TOOLTIP_CONFIG[GADM_0_ADMIN_AREAS_FEATURE_LAYER];

    const { title, subtitle, id } = tooltipConfig;
    const { geometry, attributes } = result.feature;
    setBatchTooltipData({
      isVisible: true,
      geometry,
      content: getTooltipContent(t, attributes, id, title, subtitle),
    });
    flyToCentroid(view, geometry, 4);
  };

  const getSearchResults = (e) => {
    const { results } = e;
    setSearchResults(results[0].results);
    if (results[0].results.length === 0) {
      setIsSearchResultsVisible(false);
    } else if (!isSearchResultVisible) {
      setIsSearchResultsVisible(true);
    }
  };

  // TODO: Select which area slug we want to search for. Maybe with a dropdown?

  const config = SEARCH_SOURCES_CONFIG[GADM_0_ADMIN_AREAS_FEATURE_LAYER];
  const {
    url, title, outFields, searchFields, suggestionTemplate,
  } = config;
  const searchWidgetConfig = {
    searchResultsCallback: getSearchResults,
    postSearchCallback: browseSelectedFeature,
    searchSources: (FeatureLayer) => {
      return [{
        outFields,
        searchFields,
        suggestionTemplate,
        layer: new FeatureLayer({ url, title, outFields }),
      }];
    },
  };

  const {
    handleOpenSearch,
    handleCloseSearch,
    handleSearchInputChange,
    handleSearchSuggestionClick,
    searchWidget,
  } = useSearchWidgetLogic(
    view,
    searchTermsAnalyticsEvent,
    searchWidgetConfig,
  );
  const { changeUI } = props;
  const handleSidebarClose = () => { if (isSidebarOpen) changeUI({ isSidebarOpen: false }); };
  const resetActiveOption = () => changeUI({ activeOption: '' });
  const setActiveOption = (option) => changeUI({ activeOption: option });

  useEffect(() => {
    if (isSidebarOpen) handleSidebarClose();
    if (activeOption !== FOOTER_OPTIONS.SEARCH && searchWidget) handleCloseSearch();
  }, [activeOption]);

  const handleSearchToggle = () => {
    if (!searchWidget) { handleOpenSearch(); } else { handleCloseSearch(); }
  };

  const onOptionSelection = (option) => {
    handleSearchSuggestionClick(option);
    setIsSearchResultsVisible(false);
  };

  const handler = (option) => {
    if (activeOption === option) resetActiveOption();
    else setActiveOption(option);
  };

  const options = [
    {
      icon: SearchIcon,
      name: 'Find places',
      key: FOOTER_OPTIONS.SEARCH,
      onClickHandler: () => { handler(FOOTER_OPTIONS.SEARCH); handleSearchToggle(); },
    },
    {
      icon: SettingsIcon,
      name: 'More',
      key: FOOTER_OPTIONS.SETTINGS,
      onClickHandler: () => handler(FOOTER_OPTIONS.SETTINGS),
    },
  ];

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      options={options}
      handleSearchInputChange={handleSearchInputChange}
      isSearchResultVisible={isSearchResultVisible}
      searchResults={searchResults}
      onOptionSelection={onOptionSelection}
      {...props}
    />
  );
}

export default connect(null, { ...urlActions, ...mapTooltipActions })(MenuFooterContainer);
