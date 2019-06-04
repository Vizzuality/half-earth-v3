
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';
import ToggleUiComponent from './toggle-ui-widget-component';

const ToggleUiWidget = ({ isFullscreenActive, changeUI, view }) => {
  const toggleFullscreen  = () => {
    isFullscreenActive ? changeUI({
      isFullscreenActive: !isFullscreenActive
    }) : changeUI({
      isFullscreenActive: true
    })
  }

  useEffect(() => {
    const node = document.createElement("div");
    view.ui.add(node, "top-right");
    ReactDOM.render(<ToggleUiComponent toggleFullscreen={toggleFullscreen} isFullscreenActive={isFullscreenActive} />, node);

    return function cleanup() {
      view.ui.remove(node);
    };
  }, [view, isFullscreenActive])

  return null;
}

export default connect(null, actions)(ToggleUiWidget);
