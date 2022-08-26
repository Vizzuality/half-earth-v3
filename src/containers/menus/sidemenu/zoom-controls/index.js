import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import { loadModules } from 'esri-loader';

import ZoomControlsComponent from './component';

function ZoomControls(props) {
  const { view, hidden } = props;
  const [zoomWidget, setZoomWidget] = useState(null);

  // Load custom zoom widget
  useEffect(() => {
    const node = document.createElement('div');
    loadModules(['esri/widgets/Zoom/ZoomViewModel']).then(([ZoomView]) => {
      const zoomWidget = new ZoomView({
        view,
      });
      setZoomWidget(zoomWidget);
      if (!hidden) {
        view.ui.add(node, 'top-right');
        // eslint-disable-next-line react/jsx-filename-extension
        ReactDOM.render(<ZoomControlsComponent zoomWidget={zoomWidget} />, node);
      }
    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(zoomWidget);
      ReactDOM.render(null, node);
    };
  }, [view, hidden]);

  return null;
}

export default connect(null, actions)(ZoomControls);
