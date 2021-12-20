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

      </div>
    </Modal>
  );
};

export default ProtectedAreasModal;
