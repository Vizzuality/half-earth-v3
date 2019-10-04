import { loadModules } from 'esri-loader';
import { useState, useEffect } from 'react';

const NavigationToggleWidgetComponent = ({ view }) => {
  const [navigationToggleWidget, setNavigationToggleWidget] = useState(null);

  useEffect(() => {
    loadModules(["esri/widgets/NavigationToggle"]).then(([NavigationToggle]) => {
      const navigationToggleWidget = new NavigationToggle({
        view: view
      });
      setNavigationToggleWidget(navigationToggleWidget);
      view.ui.add(navigationToggleWidget, "top-left");

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(navigationToggleWidget);
    };
  }, [view])

  return null;
}

export default NavigationToggleWidgetComponent;