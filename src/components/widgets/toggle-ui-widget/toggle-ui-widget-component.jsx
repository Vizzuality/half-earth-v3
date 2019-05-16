
import React, { useState } from 'react';
import { ReactComponent as HideUiIcon } from 'icons/hideUI.svg';
import { ReactComponent as ShowUiIcon } from 'icons/showUI.svg';

import styles from './toggle-ui-widget.module.scss';

const ToggleUiWidgetComponent = () => {
  const [isHidden, setHidden] = useState(false);

  return (
    <button  className={styles.locationButton} onClick={() => setHidden(!isHidden)}>
      {isHidden ?  <ShowUiIcon /> : <HideUiIcon />}
    </button>
  );
}

export default ToggleUiWidgetComponent;
