import React from 'react';
import { ReactComponent as LocationIcon } from 'icons/location.svg';

import styles from './location-widget.module.scss';

const LocationWidgetComponent = ({ locationWidget }) => (
  <button className={styles.locationButton} onClick={() => locationWidget.locate()}>
    <LocationIcon />
  </button>
);

export default LocationWidgetComponent;
