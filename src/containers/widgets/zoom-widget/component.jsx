/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

import { ReactComponent as ZoomInIcon } from 'icons/zoomIn.svg';
import { ReactComponent as ZoomOutIcon } from 'icons/zoomOut.svg';

import styles from './styles.module.scss';

function ZoomWidgetComponent({ zoomWidget }) {
  return (
    <div className={styles.zoomComponent}>
      <button
        type="button"
        className={styles.zoomButton}
        onClick={() => zoomWidget.zoomIn()}
      >
        <ZoomInIcon />
      </button>
      <span className={styles.spacer} />
      <button
        type="button"
        className={styles.zoomButton}
        onClick={() => zoomWidget.zoomOut()}
      >
        <ZoomOutIcon />
      </button>
    </div>
  );
}

export default ZoomWidgetComponent;
