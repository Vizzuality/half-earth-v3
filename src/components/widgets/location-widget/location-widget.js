// Docs for Locate ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import LocationWidgetComponent from './location-widget-component';
import * as actions from './location-widget-actions';

const LocationWidget = props => {
  const { view, setGlobeChange } = props;
  const [locationWidget, setLocationWidget] = useState(null);
  const [watchUtils, setWatchUtils] = useState(null);
  const handleLocationChange = (center) => setGlobeChange({ center });

  useEffect(() => {
    loadModules(["esri/widgets/Locate/LocateViewModel"]).then(([LocateView]) => {
      const locationWidget = new LocateView({
        view: view
      });
      setLocationWidget(locationWidget);
      const node = document.createElement("div");
      view.ui.add(node, "top-right");
      ReactDOM.render(<LocationWidgetComponent locationWidget={locationWidget} />, node);

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(locationWidget);
    };
  }, [view])

  // Load watchUtils module to follow location change
  useEffect(() => {
    loadModules(["esri/core/watchUtils"]).then(([watchUtils]) => {
      setWatchUtils(watchUtils);
    })
  }, []);

  // Update location in URL
  useEffect(() => {
    const watchHandle = watchUtils && locationWidget && watchUtils.whenTrue(locationWidget.view, "stationary", function() {
      const { longitude, latitude } = locationWidget.view.center;
      handleLocationChange([longitude, latitude]);
    });
    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [watchUtils, locationWidget]);

  return null;
}

export default connect(null, actions)(LocationWidget);
