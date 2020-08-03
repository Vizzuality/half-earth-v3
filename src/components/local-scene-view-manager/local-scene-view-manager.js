import { useEffect } from 'react';

const LocalSceneViewManager = ({
  view,
  extent,
  sceneSettings
}) => {
  const { zoom, center } = sceneSettings;

  useEffect(() => {
    if (view && extent) {
      view.extent = extent;
      view.clippingArea = extent;
      if (!zoom && !center) {
        view.goTo({ target: extent, tilt: 40 });
      } else {
        view.goTo({ target: center, zoom, tilt: 40 })
      }
    }
  }, [extent]);

  return null;
}

export default LocalSceneViewManager;