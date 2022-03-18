/* eslint-disable react/react-in-jsx-scope */
import React from 'react';

import { ReactComponent as ZoomInIcon } from 'icons/zoomIn.svg';
import { ReactComponent as ZoomOutIcon } from 'icons/zoomOut.svg';

import styles from './zoom-widget.module.scss';

const ZoomWidgetComponent = ({ zoomWidget }) => (
  <div className={styles.zoomComponent}>
    <button className={styles.zoomButton} onClick={() => zoomWidget.zoomIn()}>
      <ZoomInIcon />
    </button>
    <span className={styles.spacer} />
    <button className={styles.zoomButton} onClick={() => zoomWidget.zoomOut()}>
      <ZoomOutIcon />
    </button>
  </div>
);

export default ZoomWidgetComponent;
