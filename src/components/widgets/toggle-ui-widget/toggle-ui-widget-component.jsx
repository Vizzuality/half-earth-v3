
import React from 'react';
import { ReactComponent as HideUiIcon } from 'icons/hideUI.svg';
import { ReactComponent as ShowUiIcon } from 'icons/showUI.svg';

import styles from './toggle-ui-widget.module.scss';

const ToggleUiWidgetComponent = ({ toggleFullscreen, isFullscreenActive }) => {
  return (
    <button className={styles.locationButton} onClick={toggleFullscreen}>
      {isFullscreenActive ? <ShowUiIcon /> : <HideUiIcon />}
    </button>
  );
}

export default ToggleUiWidgetComponent;
