import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import { useSearchWidgetLogic } from 'hooks/esri';
import { openPlacesSearchAnalyticsEvent, searchTermsAnalyticsEvent } from 'actions/google-analytics-actions';
import { FOOTER_OPTIONS } from 'constants/mobile-only';

// icons
import { ReactComponent as SearchIcon } from 'icons/searchMobile.svg';
import { ReactComponent as AddLayerIcon } from 'icons/addLayer.svg';
import { ReactComponent as SelectMapIcon } from 'icons/selectMap.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
import { ReactComponent as LegendIcon } from 'icons/legend.svg';

import Component from './menu-footer-component';

const MenuFooterContainer = props => {
  const { view, isSidebarOpen, isLandscapeMode, activeOption, selectedSidebar, selectedFeaturedMap, featured = false } = props;
  const { handleOpenSearch, handleCloseSearch, searchWidget } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchTermsAnalyticsEvent
  );

  const FEATURED_MAPS_LIST_SIDEBAR = 'featuredMapsList';

  const handleSidebarClose = () => { if (isSidebarOpen) props.changeUI({ isSidebarOpen: false }); }
  const resetActiveOption = () => props.changeUI({ activeOption: '' });
  const resetFeaturedMap = () => { if (selectedFeaturedMap) props.changeUI({ selectedFeaturedMap: '' }); }
  const setActiveOption = (option) => props.changeUI({ activeOption: option })
  
  const toggleFeaturedMapsList = () => {
    const activeSidebar =  selectedSidebar && activeOption === FOOTER_OPTIONS.ADD_LAYER;
    props.changeUI({ selectedSidebar: activeSidebar ? '' : FEATURED_MAPS_LIST_SIDEBAR});
  }

  useEffect(() => {
    if (activeOption !== FOOTER_OPTIONS.ADD_LAYER && isSidebarOpen) handleSidebarClose();
    if (activeOption !== FOOTER_OPTIONS.SEARCH && searchWidget) handleCloseSearch();
  }, [activeOption])

  const handleSearchToggle = () => {
    if (!searchWidget) { handleOpenSearch() }
    else { handleCloseSearch() }
  }

  useEffect(() => {
    if (isLandscapeMode) { 
      resetActiveOption();
      handleSidebarClose();
      handleCloseSearch();
    }
  }, [isLandscapeMode])

  const handler = (option) => {
    if (activeOption === option) resetActiveOption();
    else setActiveOption(option);
  }

  const options = [
    {
      icon: SearchIcon,
      name: 'Find places',
      key: FOOTER_OPTIONS.SEARCH,
      onClickHandler: () => { handler(FOOTER_OPTIONS.SEARCH); handleSearchToggle(); }
    },
    {
      icon: featured ? SelectMapIcon : AddLayerIcon,
      name: featured ? 'SELECT MAP' : 'ADD LAYER',
      key: FOOTER_OPTIONS.ADD_LAYER,
      onClickHandler: () => {
        if (featured) { resetFeaturedMap(); toggleFeaturedMapsList(); }
        handler(FOOTER_OPTIONS.ADD_LAYER)
      }
    },
    {
      icon: LegendIcon,
      name: 'Legend',
      key: FOOTER_OPTIONS.LEGEND,
      onClickHandler: () => handler(FOOTER_OPTIONS.LEGEND)
    },
    {
      icon: SettingsIcon,
      name: 'More',
      key: FOOTER_OPTIONS.SETTINGS,
      onClickHandler: () => handler(FOOTER_OPTIONS.SETTINGS)
    }
  ]

  return <Component options={options} {...props} />; 
}

export default connect(null, actions)(MenuFooterContainer);
