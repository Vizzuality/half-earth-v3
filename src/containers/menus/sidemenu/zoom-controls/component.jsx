/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

import { ReactComponent as ZoomInIcon } from 'icons/zoomIn.svg';
import { ReactComponent as ZoomOutIcon } from 'icons/zoomOut.svg';

import styles from './styles.module.scss';

function ZoomControlsComponent({ zoomWidget }) {
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

export default ZoomControlsComponent;
