import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { settingsAnalyticsEvent } from 'actions/google-analytics-actions';

import SettingsComponent from './settings-widget-component';

const actions = { ...urlActions, settingsAnalyticsEvent };

const SettingsWidget = ({
  changeUI,
  settingsAnalyticsEvent,
  view,
  hidden
}) => {
  const openSettings = () => {
    changeUI({ openSettings: null });
    settingsAnalyticsEvent({ notDisplayedLayers: null });
  };
  useEffect(() => {
    const node = document.createElement('div');
    if (!hidden) {
      view.ui.add(node, 'top-right');
      ReactDOM.render(
        <SettingsComponent
          openSettings={openSettings}
        />,
        node
      );
    }
    return function cleanup() {
      view.ui.remove(node);
    };
  }, [view, hidden]);

  return null;
};

export default connect(null, actions)(SettingsWidget);
