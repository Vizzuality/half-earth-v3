// Docs for Locate ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import LocationWidgetComponent from './location-widget-component';

const LocationWidget = ({ view }) => {
  const [locationWidget, setLocationWidget] = useState(null);

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

  return null;
}

export default LocationWidget;