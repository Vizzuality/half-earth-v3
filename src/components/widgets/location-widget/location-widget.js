import { loadModules } from 'esri-loader';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import LocationWidgetComponent from './location-widget-component';
import * as urlActions from 'actions/url-actions';
import { clickFindMyPositionAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { ...urlActions, clickFindMyPositionAnalyticsEvent };

const LocationWidget = props => {
  const { view, clickFindMyPositionAnalyticsEvent, hidden } = props;
  const [locationWidget, setLocationWidget] = useState(null);

  useEffect(() => {
    const node = document.createElement("div");
    loadModules(["esri/widgets/Locate/LocateViewModel"]).then(([LocateView]) => {
      const locationWidget = new LocateView({
        view: view,
        graphic: ''
      });
      locationWidget.on("locate", () => clickFindMyPositionAnalyticsEvent());
      setLocationWidget(locationWidget);
      if (!hidden) {
        view.ui.add(node, "top-right");
        ReactDOM.render(<LocationWidgetComponent locationWidget={locationWidget} />, node);
      }

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(locationWidget);
      ReactDOM.render(null, node);
    };
  }, [view, hidden])

  return null;
}

export default connect(null, actions)(LocationWidget);
