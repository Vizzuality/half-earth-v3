import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { flyToCentroid } from 'utils/globe-events-utils';

const LocalSceneViewManager = ({
  view,
  localGeometry,
}) => {
  useEffect(() => {
    if (view && localGeometry) {
      const { extent } = localGeometry;
      view.extent = extent;
      flyToCentroid(view, localGeometry)
    }
  }, [localGeometry]);

  return null;
}

LocalSceneViewManager.propTypes = {
  view: PropTypes.object,
  localGeometry: PropTypes.object,
};

export default LocalSceneViewManager;
