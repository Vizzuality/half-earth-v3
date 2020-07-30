import { useEffect } from 'react';

const LocalSceneViewManager = ({
  view,
  extent
}) => {
  useEffect(() => {
    if (view && extent) {
      view.extent = extent;
      view.clippingArea = extent;
      view.goTo({ target: extent, tilt: 40 });
    }
  }, [view, extent]);

  return null;
}

export default LocalSceneViewManager;