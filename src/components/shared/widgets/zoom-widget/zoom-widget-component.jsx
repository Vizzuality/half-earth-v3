import { loadModules } from '@esri/react-arcgis';
import { useState, useEffect } from 'react';

const ZoomWidgetComponent = ({ view }) => {
  const [zoomWidget, setZoomWidget] = useState(null);

  useEffect(() => {
    loadModules(["esri/widgets/Zoom"]).then(([Zoom]) => {
      const zoomWidget = new Zoom({
        view: view
      });
      setZoomWidget(zoomWidget);
      view.ui.add(zoomWidget, "top-left");

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(zoomWidget);
    };
  }, [])

  return null;
}

export default ZoomWidgetComponent;