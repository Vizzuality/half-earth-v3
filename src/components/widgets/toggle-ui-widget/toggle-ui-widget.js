
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { toggleFullScreenAnalyticsEvent } from 'actions/google-analytics-actions';

import ToggleUiComponent from './toggle-ui-widget-component';

const actions = {...urlActions, toggleFullScreenAnalyticsEvent};

const ToggleUiWidget = ({ isFullscreenActive, changeUI, view, toggleFullScreenAnalyticsEvent, hidden }) => {
  const toggleFullscreen  = () => {
    changeUI({ isFullscreenActive: !isFullscreenActive })
    toggleFullScreenAnalyticsEvent({ isFullscreenActive: !isFullscreenActive });
  }

  useEffect(() => {
    const node = document.createElement("div");
    if (!hidden) {
      view.ui.add(node, "top-right");
      ReactDOM.render(<ToggleUiComponent toggleFullscreen={toggleFullscreen} isFullscreenActive={isFullscreenActive} />, node);
    }
    return function cleanup() {
      view.ui.remove(node);
    };
  }, [view, isFullscreenActive, hidden])

  return null;
}

export default connect(null, actions)(ToggleUiWidget);
