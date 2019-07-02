import React from 'react';
import styles from './search-widget-styles.module.scss';
import { ReactComponent as PinIcon } from 'icons/places.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

const SearchWidgetComponent = props => {
  const { handleOpenSearch, handleCloseSearch, showCloseButton} = props;
  return (
    <>
      <button
        className={styles.searchButton}
        onClick={handleOpenSearch}
      >
        <span className={styles.iconWrapper}>
          <PinIcon />
        </span>
        <span  className={styles.searchButtonText}>FIND PLACES</span>
      </button>
      { showCloseButton && 
        <button
          className={styles.closeButton}
          onClick={handleCloseSearch}
        >
          <CloseIcon />
        </button>
      }
    </>
  );
};

export default SearchWidgetComponent;