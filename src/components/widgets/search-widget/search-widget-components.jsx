import React from 'react';
import styles from './search-widget-styles.module.scss';
import { ReactComponent as PinIcon } from 'icons/pin.svg';

const SearchWidgetComponent = props => {
  return (
    <button
      className={styles.searchButton}
      onClick={props.onClick}
    >
      <span className={styles.iconWrapper}>
        <PinIcon />
      </span>
      FIND PLACES
    </button>
  );
};

export default SearchWidgetComponent;