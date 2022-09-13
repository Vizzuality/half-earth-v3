/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.scss';

import { ReactComponent as ZoomInIcon } from 'icons/zoomIn.svg';
import { ReactComponent as ZoomOutIcon } from 'icons/zoomOut.svg';

function ZoomControls({ zoomWidget }) {
  return (
    <div className={styles.zoomComponent}>
      <button
        className={styles.zoomButton}
        type="button"
        onClick={() => zoomWidget.zoomIn()}
      >
        <ZoomInIcon />
      </button>
      <span className={styles.spacer} />
      <button
        className={styles.zoomButton}
        type="button"
        onClick={() => zoomWidget.zoomOut()}
      >
        <ZoomOutIcon />
      </button>
    </div>
  );
}

ZoomControls.propTypes = {
  zoomWidget: PropTypes.shape().isRequired,
};

export default ZoomControls;
