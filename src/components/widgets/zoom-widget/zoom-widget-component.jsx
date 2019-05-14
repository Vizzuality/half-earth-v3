/* eslint-disable react/react-in-jsx-scope */
import { loadModules } from '@esri/react-arcgis';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as ZoomInIcon } from 'icons/zoomIn.svg';
import { ReactComponent as ZoomOutIcon } from 'icons/zoomOut.svg';

import styles from './zoom-widget.module.scss';

const ZoomComponent = ({ zoomWidget }) => (
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

const ZoomWidgetComponent = ({ view }) => {
  const [zoomWidget, setZoomWidget] = useState(null);

  useEffect(() => {
    loadModules(["esri/widgets/Zoom/ZoomViewModel"]).then(([ZoomView]) => {
      const zoomWidget = new ZoomView({
        view: view
      });
      setZoomWidget(zoomWidget);
      const node = document.createElement("div");
      view.ui.add(node, "top-right");
      ReactDOM.render(<ZoomComponent zoomWidget={zoomWidget} />, node);

    }).catch((err) => console.error(err));
    return function cleanup() {
      view.ui.remove(zoomWidget);
    };
  }, [view])

  return null;
}

export default ZoomWidgetComponent;
