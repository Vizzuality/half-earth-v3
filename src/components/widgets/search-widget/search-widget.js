// Docs for Search ui widget
//https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
import React from 'react';
import { connect } from 'react-redux';
import { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent } from 'actions/google-analytics-actions';
import { changeGlobe } from 'actions/url-actions';
import SearchWidgetComponent from './search-widget-component';
import { useSearchWidgetLogic } from 'hooks/esri';

const actions = { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent, changeGlobe };

const SearchWidget = ({ view, openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent, changeGlobe }) => {

  const postSearchCallback = ({result}) => {
    const { feature: { attributes: { GID_0, NAME_0 }}} = result;
    changeGlobe({countryISO: GID_0, countryName: NAME_0});
  }

  const { handleOpenSearch, handleCloseSearch, searchWidget } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchLocationAnalyticsEvent,
    postSearchCallback
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
