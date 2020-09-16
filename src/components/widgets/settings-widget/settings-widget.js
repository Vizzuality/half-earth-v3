import React from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { toggleFullScreenAnalyticsEvent } from 'actions/google-analytics-actions';

import SettingsComponent from './settings-widget-component';

const actions = { ...urlActions, toggleFullScreenAnalyticsEvent };

const SettingsWidget = ({
  isFullscreenActive,
  changeUI,
  toggleFullScreenAnalyticsEvent
}) => {
  const openSettings = () => {
    changeUI({ openSettings: !isFullscreenActive });
    toggleFullScreenAnalyticsEvent({ isFullscreenActive: !isFullscreenActive });
  };

  return (
    <SettingsComponent
      openSettings={openSettings}
      isFullscreenActive={isFullscreenActive}
    />
  );
};

export default connect(null, actions)(SettingsWidget);
