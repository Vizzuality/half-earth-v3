// Docs for Locate ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html
import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect } from 'react';

const LocationWidgetComponent = ({ view }) => {
  const [locationWidget, setLocationWidget] = useState(null);

  useEffect(() => {
    loadModules(["esri/widgets/Locate"]).then(([Locate]) => {
      const locationWidget = new Locate({
        view: view
      });
      setLocationWidget(locationWidget);
      view.ui.add(locationWidget, "top-right");

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(locationWidget);
    };
  }, [])

  return null;
}

export default LocationWidgetComponent;