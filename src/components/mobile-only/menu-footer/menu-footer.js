import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useT } from '@transifex/react';
import urlActions from 'actions/url-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { useSearchWidgetLogic } from 'hooks/esri';
import { searchTermsAnalyticsEvent } from 'actions/google-analytics-actions';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import { flyToCentroid } from 'utils/globe-events-utils';

// icons
import { ReactComponent as SearchIcon } from 'icons/searchMobile.svg';
// import { ReactComponent as AddLayerIcon } from 'icons/addLayer.svg';
// import { ReactComponent as SelectMapIcon } from 'icons/selectMap.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
// import { ReactComponent as LegendIcon } from 'icons/legend.svg';

import { SEARCH_SOURCES_CONFIG } from 'constants/search-location-constants';
import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';

import Component from './menu-footer-component';

function MenuFooterContainer(props) {
  const {
    view, isSidebarOpen, isLandscapeMode, activeOption,
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
      content: {
        buttonText: t('analyze area'),
        id: attributes[id],
        title: attributes[title] || attributes.NAME_0,
        subtitle: attributes[subtitle] || attributes.NAME_1,
      },
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
    handleOpenSearch, handleCloseSearch, handleSearchInputChange, handleSearchSuggestionClick, searchWidget,
  } = useSearchWidgetLogic(
    view,
    searchTermsAnalyticsEvent,
    searchWidgetConfig,
  );

  const handleSidebarClose = () => { if (isSidebarOpen) props.changeUI({ isSidebarOpen: false }); };
  const resetActiveOption = () => props.changeUI({ activeOption: '' });
  const setActiveOption = (option) => props.changeUI({ activeOption: option });

  // const FEATURED_MAPS_LIST_SIDEBAR = 'featuredMapsList';

  // const resetFeaturedMap = () => { if (selectedFeaturedMap) props.changeUI({ selectedFeaturedMap: '' }); }

  // const toggleFeaturedMapsList = () => {
  //   const activeSidebar =  selectedSidebar && activeOption === FOOTER_OPTIONS.ADD_LAYER;
  //   props.changeUI({ selectedSidebar: activeSidebar ? '' : FEATURED_MAPS_LIST_SIDEBAR});
  // }

  useEffect(() => {
    if (activeOption !== FOOTER_OPTIONS.ADD_LAYER && isSidebarOpen) handleSidebarClose();
    if (activeOption !== FOOTER_OPTIONS.SEARCH && searchWidget) handleCloseSearch();
  }, [activeOption]);

  const handleSearchToggle = () => {
    if (!searchWidget) { handleOpenSearch(); } else { handleCloseSearch(); }
  };

  const onOptionSelection = (option) => {
    handleSearchSuggestionClick(option);
    setIsSearchResultsVisible(false);
  };

  useEffect(() => {
    if (isLandscapeMode) {
      resetActiveOption();
      handleSidebarClose();
      handleCloseSearch();
    }
  }, [isLandscapeMode]);

  const handler = (option) => {
    if (activeOption === option) resetActiveOption();
    else setActiveOption(option);
  };

  // TODO: Add layer and legend options again
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
