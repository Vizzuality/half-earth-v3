import React, { useState } from 'react';
import { ReactComponent as LocationIcon } from 'icons/location.svg';
import { ReactComponent as SpinnerIcon } from 'icons/spinner.svg';

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
      {isAnimated ? <SpinnerIcon className={styles.spinnerAnimation} /> : <LocationIcon />}
    </button>
  );
};

export default LocationWidgetComponent;
