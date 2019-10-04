// Docs for Search ui widget
//https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
import React from 'react';
import { connect } from 'react-redux';
import { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent } from 'actions/google-analytics-actions';
import SearchWidgetComponent from './search-widget-component';
import { useSearchWidgetLogic } from 'hooks/esri';

const actions = { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent };

const SearchWidget = ({ view, openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent }) => {
  const { handleOpenSearch, handleCloseSearch, searchWidget } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchLocationAnalyticsEvent
  );

  return (
    <SearchWidgetComponent 
      handleOpenSearch={handleOpenSearch}
      handleCloseSearch={handleCloseSearch}
      showCloseButton={!!searchWidget}
    />
  );
}

export default connect(null, actions)(SearchWidget);
