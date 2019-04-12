// Docs for Locate ui widget
// https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Locate.html

import { loadModules } from '@esri/react-arcgis';

const LocationWidgetComponent = ({ view }) => {
  loadModules(["esri/widgets/Locate"]).then(([Locate]) => {
    var locateWidget = new Locate({
      view: view
    });
    view.ui.add(locateWidget, "top-right");
  }).catch((err) => console.error(err));
  return null;
}

export default LocationWidgetComponent;