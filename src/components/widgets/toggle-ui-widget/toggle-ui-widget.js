
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ToggleUiComponent from './toggle-ui-widget-component';

const ToggleUiWidget = ({ view }) => {
  useEffect(() => {
    const node = document.createElement("div");
    view.ui.add(node, "top-right");
    ReactDOM.render(<ToggleUiComponent />, node);
  }, [view])

  return null;
}

export default ToggleUiWidget;
