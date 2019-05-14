// Docs for Zoom ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Zoom.html
import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ZoomWidgetComponent from './zoom-widget-component';

const ZoomWidget = ({ view }) => {
  const [zoomWidget, setZoomWidget] = useState(null);

  useEffect(() => {
    loadModules(["esri/widgets/Zoom/ZoomViewModel"]).then(([ZoomView]) => {
      const zoomWidget = new ZoomView({
        view: view
      });
      setZoomWidget(zoomWidget);
      const node = document.createElement("div");
      view.ui.add(node, "top-right");
      ReactDOM.render(<ZoomWidgetComponent zoomWidget={zoomWidget} />, node);

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(zoomWidget);
    };
  }, [view])

  return null;
}

export default ZoomWidget;