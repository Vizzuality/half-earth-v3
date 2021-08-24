import { useEffect } from 'react';

const LocalSceneViewManager = ({
  view,
  localGeometry
}) => {
  useEffect(() => {
    if (view && localGeometry) {
      const { extent } = localGeometry;
      view.extent = extent;
      view.goTo({ target: extent, tilt: 30 })
      .catch(error => {
        view.goTo({ target: extent, tilt: 30 })
      })
    }
  }, [localGeometry]);

  return null;
}

export default LocalSceneViewManager;