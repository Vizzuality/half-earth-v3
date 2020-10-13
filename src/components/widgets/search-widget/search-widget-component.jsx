import React from 'react';
import styles from './search-widget-styles.module.scss';
// import { ReactComponent as PinIcon } from 'icons/places.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

const SearchWidgetComponent = props => {
  const { handleOpenSearch, handleCloseSearch, showCloseButton, hidden } = props;
  return (
    <div style={{ display: hidden ? 'none' : 'block' }}>
      <button
        className={styles.searchButton}
        onClick={handleOpenSearch}
      >
        {/* <span className={styles.iconWrapper}>
          <PinIcon />
        </span> */}
        <span className={styles.searchCardTitle}>find places</span>
        <span className={styles.searchSubtitle}>analyze countries,</span>
        <span className={styles.searchSubtitle}>explore areas</span>
      </button>
      { showCloseButton &&
        <button
          className={styles.closeButton}
          onClick={handleCloseSearch}
        >
          <CloseIcon />
        </button>
      }
    </div>
  );
};

export default SearchWidgetComponent;