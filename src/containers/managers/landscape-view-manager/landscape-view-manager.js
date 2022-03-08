import React from 'react';
import { connect } from 'react-redux';
import Component from './landscape-view-manager-component';

import * as urlActions from 'actions/url-actions';
import * as analyticsActions from 'actions/google-analytics-actions';

const actions = { ...urlActions, ...analyticsActions }

const LandscapeViewManagerContainer = props => {

  const handleZoomChange = (params) => {
    const { landscapeView } = params;
    landscapeView && props.enterLandscapeModeAnalyticsEvent();
    return props.changeGlobe(params);
  };

  return (
    <Component
      onZoomChange={handleZoomChange}
      {...props}
    />
  )
}

export default connect(null, actions)(LandscapeViewManagerContainer);
