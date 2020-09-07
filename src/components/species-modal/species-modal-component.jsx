import React from 'react';
import ReactDOM from 'react-dom';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

import styles from './species-modal-styles.module.scss';

const SpeciesModalComponent = ({ handleModalClose }) => {
  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
      handleModalClose()
    }
  };

  useEventListener('keydown', keyEscapeEventListener);

  const renderSpeciesModal = (
    <div className={styles.speciesModal}>
      <div className={styles.grid}>
      </div>
      <button
        className={styles.closeButton}
        onClick={handleModalClose}
      >
        <CloseIcon />
      </button>

    </div>
  );
  return ReactDOM.createPortal(
    renderSpeciesModal,
    document.getElementById('root')
  );

}


export default SpeciesModalComponent;
