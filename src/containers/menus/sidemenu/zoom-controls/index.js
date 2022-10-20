import React, { useState, useEffect } from 'react';

import { loadModules } from 'esri-loader';

import ZoomControlsComponent from './component';

function ZoomControls(props) {
  const { view } = props;
  const [zoomWidget, setZoomWidget] = useState(null);

  // Load custom zoom widget
  useEffect(() => {
    // eslint-disable-next-line no-undef
    loadModules(['esri/widgets/Zoom/ZoomViewModel']).then(([ZoomView]) => {
      const zoomWidgetCreator = new ZoomView({
        view,
      });
      setZoomWidget(zoomWidgetCreator);
    });

    return function cleanup() {
      view.ui.remove(zoomWidget);
    };
  }, [view]);

  return <ZoomControlsComponent zoomWidget={zoomWidget} />;
}

export default ZoomControls;
