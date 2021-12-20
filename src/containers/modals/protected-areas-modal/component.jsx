import React from "react";
import { Modal } from "he-components";

import styles from "./styles.module";

const ProtectedAreasModal = ({
  isOpen,
  handleModalClose,
}) => {

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h1>Protected areas in </h1>
      </div>
    </Modal>
  );
};

export default ProtectedAreasModal;
