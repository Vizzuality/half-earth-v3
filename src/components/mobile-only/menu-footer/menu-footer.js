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
  const { view, isEntryBoxesOpen, isLegendOpen } = props;
  const { handleOpenSearch } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchLocationAnalyticsEvent
  );

  const handleEntryBoxesOpen = () => props.changeUI({ isEntryBoxesOpen: true });
  const handleEntryBoxesClose = () => props.changeUI({ isEntryBoxesOpen: false });

  const handleLegendOpen = () => props.changeUI({ isLegendOpen: true });
  const handleLegendClose = () => props.changeUI({ isLegendOpen: false });

  const handleSearchClick = () => {
    if (isEntryBoxesOpen) { handleEntryBoxesClose(); }
    if (isLegendOpen) { handleLegendClose(); }
    handleOpenSearch();
  }

  const handleLayersOpen = () => {
    if (isLegendOpen) { handleLegendClose(); }
    handleEntryBoxesOpen();
  }

  const handleLegendClick = () => {
    if (isEntryBoxesOpen) { handleEntryBoxesClose(); }
    handleLegendOpen();
  }

  const handleSettingsClick = () => {
    if (isEntryBoxesOpen) { handleEntryBoxesClose(); }
    if (isLegendOpen) { handleLegendClose(); }
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
