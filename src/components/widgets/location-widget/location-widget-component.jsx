import React, { useState } from 'react';
import { ReactComponent as LocationIcon } from 'icons/location.svg';
import { ReactComponent as HideUiIcon } from 'icons/hideUI.svg';

import styles from './location-widget.module.scss';

const LocationWidgetComponent = ({ locationWidget }) => {
  const [isAnimated, setAnimated] = useState(false);
  
  const locate = () => {
    if(!isAnimated) {
      setAnimated(true)
      locationWidget.locate()
        .then(() => setAnimated(false))
        .catch(() => setAnimated(false));
    } else {
      locationWidget.cancelLocate()
      setAnimated(false);
    }
  };

  return (
    <button className={styles.locationButton} onClick={locate}>
      {isAnimated ? <LocationIcon style={{ stroke: 'red' }} /> : <LocationIcon />}
    </button>
  );
};

export default LocationWidgetComponent;
