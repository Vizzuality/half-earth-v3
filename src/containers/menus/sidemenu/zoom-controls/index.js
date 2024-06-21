import React, { useState, useEffect } from 'react';

import ZoomVM from '@arcgis/core/widgets/Zoom/ZoomViewModel.js';

import ZoomControlsComponent from './component';

function ZoomControls(props) {
  const { view } = props;
  const [zoomWidget, setZoomWidget] = useState(null);

  // Load custom zoom widget
  useEffect(() => {
    const zoomWidgetCreator = new ZoomVM({
      view,
    });
    setZoomWidget(zoomWidgetCreator);

    return function cleanup() {
      view.ui.remove(zoomWidget);
    };
  }, [view]);

  return <ZoomControlsComponent zoomWidget={zoomWidget} />;
}

export default ZoomControls;
