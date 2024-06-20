/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import ZoomInIcon from 'icons/zoomIn.svg?react';
import ZoomOutIcon from 'icons/zoomOut.svg?react';

function ZoomControls({ zoomWidget }) {
  return (
    <div className={styles.zoomComponent}>
      <button
        className={styles.zoomButton}
        type="button"
        aria-label="Zoom in"
        onClick={() => zoomWidget && zoomWidget.zoomIn()}
      >
        <ZoomInIcon />
      </button>
      <span className={styles.spacer} />
      <button
        className={styles.zoomButton}
        type="button"
        aria-label="Zoom out"
        onClick={() => zoomWidget && zoomWidget.zoomOut()}
      >
        <ZoomOutIcon />
      </button>
    </div>
  );
}

ZoomControls.propTypes = {
  zoomWidget: PropTypes.shape(),
};

ZoomControls.defaultProps = {
  zoomWidget: {
    zoomIn: () => {},
    zoomOut: () => {},
  },
};

export default ZoomControls;
