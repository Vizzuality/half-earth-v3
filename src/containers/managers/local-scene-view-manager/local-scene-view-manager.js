import { useEffect } from 'react';
import PropTypes from 'prop-types';

const LocalSceneViewManager = ({
  view,
  localGeometry,
}) => {
  useEffect(() => {
    if (view && localGeometry) {
      const { extent } = localGeometry;
      view.extent = extent;
      view.goTo(
        { target: extent }
      )
      .catch(error => {
        console.error('error', error);
        view.goTo(
          { target: extent }
        )
      })
    }
  }, [localGeometry]);

  return null;
}

LocalSceneViewManager.propTypes = {
  view: PropTypes.object,
  localGeometry: PropTypes.object,
};

export default LocalSceneViewManager;
