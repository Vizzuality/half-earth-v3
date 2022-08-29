import React from 'react';

import { Modal } from 'he-components';

import styles from './styles.module';

function HelpModalComponent({ handleClose, isOpen }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        Hola
      </div>
    </Modal>
  );
}

export default HelpModalComponent;
