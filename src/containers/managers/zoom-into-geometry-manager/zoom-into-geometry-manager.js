import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { flyToCentroid } from 'utils/globe-events-utils';

function ZoomIntoGeometryManager({ view, localGeometry }) {
  useEffect(() => {
    if (view && localGeometry) {
      const { extent } = localGeometry;
      view.extent = extent;
      flyToCentroid(view, localGeometry);
    }
  }, [localGeometry]);

  return null;
}

ZoomIntoGeometryManager.propTypes = {
  // eslint-disable-next-line react/require-default-props
  view: PropTypes.shape({}),
  // eslint-disable-next-line react/require-default-props
  localGeometry: PropTypes.shape({}),
};

export default ZoomIntoGeometryManager;
