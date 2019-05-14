// Docs for Locate ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as LocationIcon } from 'icons/location.svg';

import styles from './location-widget.module.scss';

const LocationComponent = ({ locationWidget }) => (
  <button className={styles.locationButton} onClick={() => locationWidget.locate()}>
    <LocationIcon />
  </button>
);

const LocationWidgetComponent = ({ view }) => {
  const [locationWidget, setLocationWidget] = useState(null);

  useEffect(() => {
    loadModules(["esri/widgets/Locate/LocateViewModel"]).then(([LocateView]) => {
      const locationWidget = new LocateView({
        view: view
      });
      setLocationWidget(locationWidget);
      const node = document.createElement("div");
      view.ui.add(node, "top-right");
      ReactDOM.render(<LocationComponent locationWidget={locationWidget} />, node);

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(locationWidget);
    };
  }, [view])

  return null;
}

export default LocationWidgetComponent;
