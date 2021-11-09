import React from "react";

import { ReactComponent as WarningIcon } from 'icons/warning.svg';
import { Modal } from "he-components";

import styles from "./styles.module";


const PromptModalComponent = ({
  isOpen,
  handleClose
}) => (
  <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
    <div className={styles.modalContainer}>
      <div className={styles.iconWrapper}>
        <WarningIcon />
      </div>
    </div>
  </Modal>
);

export default PromptModalComponent;
