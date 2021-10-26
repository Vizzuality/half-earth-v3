import React from "react";
import { Modal } from "he-components";

import styles from "./styles.module";


const ShareModalComponent = ({ handleClose, isOpen }) => {
  return console.log(isOpen) || (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        HOLA
      </div>
    </Modal>
  );
};

export default ShareModalComponent;
