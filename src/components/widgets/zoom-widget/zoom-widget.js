// Docs for Zoom ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Zoom.html
import { loadModules } from 'esri-loader';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { useWatchUtils } from 'hooks/esri';
import ZoomWidgetComponent from './zoom-widget-component';
import * as actions from 'actions/url-actions';

const ZoomWidget = props => {
  const { view, changeGlobe, hidden, disableStateUpdate } = props;
  const [zoomWidget, setZoomWidget] = useState(null);
  const watchUtils = useWatchUtils();
  const handleZoomChange = (zoom) => changeGlobe({ zoom });

  // Load custom zoom widget
  useEffect(() => {
    const node = document.createElement("div");
    loadModules(["esri/widgets/Zoom/ZoomViewModel"]).then(([ZoomView]) => {
      const zoomWidget = new ZoomView({
        view: view
      });
      setZoomWidget(zoomWidget);
      if (!hidden) {
        view.ui.add(node, "top-right");
        ReactDOM.render(<ZoomWidgetComponent zoomWidget={zoomWidget} />, node);
      }
    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(zoomWidget);
      ReactDOM.render(null, node);
    };
  }, [view, hidden])

  // Update zoom in URL
  useEffect(() => {
    const watchHandle = watchUtils && zoomWidget && !disableStateUpdate && watchUtils.whenTrue(zoomWidget.view, "stationary", function() {
      handleZoomChange(zoomWidget.view.zoom);
    });
    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [watchUtils, zoomWidget]);

  return null;
}

export default connect(null, actions)(ZoomWidget);