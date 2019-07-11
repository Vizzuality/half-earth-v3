// Docs for Locate ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { useWatchUtils } from 'hooks/esri';

import LocationWidgetComponent from './location-widget-component';
import * as urlActions from 'actions/url-actions';
import { clickFindMyPositionAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...urlActions, clickFindMyPositionAnalyticsEvent };

const LocationWidget = props => {
  const { view, changeGlobe, clickFindMyPositionAnalyticsEvent } = props;
  const [locationWidget, setLocationWidget] = useState(null);
  const watchUtils = useWatchUtils();
  const handleLocationChange = (center) => changeGlobe({ center });

  useEffect(() => {
    loadModules(["esri/widgets/Locate/LocateViewModel"]).then(([LocateView]) => {
      const locationWidget = new LocateView({
        view: view
      });
      locationWidget.on("locate", () => clickFindMyPositionAnalyticsEvent());
      setLocationWidget(locationWidget);
      const node = document.createElement("div");
      view.ui.add(node, "top-right");
      ReactDOM.render(<LocationWidgetComponent locationWidget={locationWidget} />, node);

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(locationWidget);
    };
  }, [view])

  // Update location in URL
  useEffect(() => {
    const watchHandle = watchUtils && locationWidget && watchUtils.whenTrue(view, "stationary", function() {
      const { longitude, latitude } = view.center;
      handleLocationChange([longitude, latitude]);
    });
    return function cleanUp() {
      watchHandle && watchHandle.remove()
    }
  }, [watchUtils, locationWidget]);

  return null;
}

export default connect(null, actions)(LocationWidget);
