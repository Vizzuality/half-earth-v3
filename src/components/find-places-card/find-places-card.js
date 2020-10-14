import React from 'react';
import { connect } from 'react-redux';
import { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';
import Component from './find-places-card-component';
import { useSearchWidgetLogic } from 'hooks/esri';

const actions = { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent, ...urlActions };

const FindPlacesContainer = (props) => {
  const { view, openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent, searchWidgetConfig } = props;

  const { handleOpenSearch, handleCloseSearch, searchWidget } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchLocationAnalyticsEvent,
    searchWidgetConfig
  );

  return (
    <Component
      showCloseButton={!!searchWidget}
      handleOpenSearch={handleOpenSearch}
      handleCloseSearch={handleCloseSearch}
      {...props}
    />
  );
}

export default connect(null, actions)(FindPlacesContainer);
