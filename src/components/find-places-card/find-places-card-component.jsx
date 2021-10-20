import React from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import styles from './find-places-card-styles.module.scss';

const FindPlacesCardComponent = ({
  showCloseButton,
  handleOpenSearch,
  handleCloseSearch,
}) => (
  <div
    className={styles.container}
    onClick={handleOpenSearch}
  >
    <span className={styles.searchCardTitle}>Find places</span>
    <span className={styles.searchSubtitle}>explore areas</span>
    { showCloseButton && (
      ReactDOM.createPortal(
        <button
          className={styles.closeButton}
          onClick={handleCloseSearch}
        >
          <CloseIcon />
        </button>,
        document.getElementById('root')
      )
    )
  }
  </div>
)
export default FindPlacesCardComponent;