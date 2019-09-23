import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import { useSearchWidgetLogic } from 'hooks/esri';
import { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent } from 'actions/google-analytics-actions';

// icons
import { ReactComponent as SearchIcon } from 'icons/searchMobile.svg';
import { ReactComponent as AddLayerIcon } from 'icons/addLayer.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
import { ReactComponent as LegendIcon } from 'icons/legend.svg';

import Component from './menu-footer-component';

const MenuFooterContainer = props => {
  const { view, isEntryBoxesOpen, isLegendOpen, isSidebarOpen } = props;
  const { handleOpenSearch } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchLocationAnalyticsEvent
  );

  const handleEntryBoxesOpen = () => {if (!isEntryBoxesOpen) props.changeUI({ isEntryBoxesOpen: true }); }
  const handleEntryBoxesClose = () => { if (isEntryBoxesOpen) props.changeUI({ isEntryBoxesOpen: false }); }

  const handleSidebarClose = () => { if (isSidebarOpen) props.changeUI({ isSidebarOpen: false }); }

  const handleLegendOpen = () => { if (!isLegendOpen) props.changeUI({ isLegendOpen: true }); }
  const handleLegendClose = () => { if (isLegendOpen) props.changeUI({ isLegendOpen: false }); }

  const handleSearchClick = () => {
    handleEntryBoxesClose();
    handleSidebarClose();
    handleLegendClose();
    handleOpenSearch();
  }

  const handleLayersOpen = () => {
    handleLegendClose();
    handleEntryBoxesOpen();
  }

  const handleLegendClick = () => {
    handleEntryBoxesClose();
    handleSidebarClose();
    handleLegendOpen();
  }

  const handleSettingsClick = () => {
    handleEntryBoxesClose();
    handleSidebarClose();
    handleLegendClose();
  }

  const options = [
    {
      icon: SearchIcon,
      name: 'Find places',
      onClickHandler: handleSearchClick
    },
    {
      icon: AddLayerIcon,
      name: 'Add layer',
      onClickHandler: handleLayersOpen
    },
    {
      icon: LegendIcon,
      name: 'Legend',
      onClickHandler: handleLegendClick
    },
    {
      icon: SettingsIcon,
      name: 'More',
      onClickHandler: handleSettingsClick
    }
  ]

  return <Component options={options} {...props} />; 
}

export default connect(null, actions)(MenuFooterContainer);
