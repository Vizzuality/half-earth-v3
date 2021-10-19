import React from 'react';
import { connect } from 'react-redux';
import { searchTermsAnalyticsEvent } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';
import Component from './find-places-card-component';
import { useSearchWidget } from 'hooks/esri';

const actions = { searchTermsAnalyticsEvent, ...urlActions };

const FindPlacesContainer = (props) => {
  const { view, searchTermsAnalyticsEvent, searchWidgetConfig } = props;

  const { handleOpenSearch, handleCloseSearch, searchWidget } = useSearchWidget(
    view,
    searchTermsAnalyticsEvent,
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
