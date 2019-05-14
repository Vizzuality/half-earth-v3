
import React, { useState } from 'react';
import { ReactComponent as HideUiIcon } from 'icons/hideUI.svg';
import { ReactComponent as ShowUiIcon } from 'icons/location.svg'; //TO DO - change to proper icon

import styles from './toggle-ui-widget.module.scss';

const ToggleUiWidgetComponent = () => {
  const [isHidden, setHidden] = useState(false);

  return (
    <button  className={styles.locationButton} onClick={() => setHidden(!isHidden)}>
      {isHidden ? <HideUiIcon /> : <ShowUiIcon />}
    </button>
  );
}

export default ToggleUiWidgetComponent;
