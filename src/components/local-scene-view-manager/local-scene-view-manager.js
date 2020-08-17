import { useEffect } from 'react';

const LocalSceneViewManager = ({
  view,
  localGeometry,
  sceneSettings
}) => {
  const { zoom, center } = sceneSettings;
  
  useEffect(() => {
    if (view && localGeometry) {
      const { extent } = localGeometry;
      view.extent = extent;
      view.clippingArea = extent;
      if (!zoom && !center) {
        view.goTo({ target: extent, tilt: 40 });
      } else {
        view.goTo({ target: center, zoom, tilt: 40 })
      }
    }
  }, [localGeometry]);

  return null;
}

export default LocalSceneViewManager;