import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import { useSearchWidgetLogic } from 'hooks/esri';
import { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent } from 'actions/google-analytics-actions';
import { FOOTER_OPTIONS } from 'constants/mobile-only';

// icons
import { ReactComponent as SearchIcon } from 'icons/searchMobile.svg';
import { ReactComponent as AddLayerIcon } from 'icons/addLayer.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
import { ReactComponent as LegendIcon } from 'icons/legend.svg';

import Component from './menu-footer-component';

const MenuFooterContainer = props => {
  const { view, isSidebarOpen, isLandscapeMode, activeOption } = props;
  const { handleOpenSearch, handleCloseSearch, searchWidget } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchLocationAnalyticsEvent
  );

  const handleSidebarClose = () => { if (isSidebarOpen) props.changeUI({ isSidebarOpen: false }); }
  const resetActiveOption = () => props.changeUI({ activeOption: '' });
  const setActiveOption = (option) => props.changeUI({ activeOption: option })

  useEffect(() => {
    if (activeOption !== FOOTER_OPTIONS.ADD_LAYER && isSidebarOpen) handleSidebarClose();
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
      icon: AddLayerIcon,
      name: 'Add layer',
      key: FOOTER_OPTIONS.ADD_LAYER,
      onClickHandler: () => handler(FOOTER_OPTIONS.ADD_LAYER)
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
