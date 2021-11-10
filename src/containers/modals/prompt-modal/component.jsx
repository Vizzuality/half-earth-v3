import React from "react";

import { ReactComponent as WarningIcon } from 'icons/warning.svg';
import { Modal } from "he-components";

import styles from "./styles.module";


const PromptModalComponent = ({
  title, 
  isOpen,
  description,
  handleClose,
}) => (
  <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
    <div className={styles.modalContainer}>
      <div className={styles.iconWrapper}>
        <WarningIcon  className={styles.icon}/>
      </div>
      <section>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </section>
    </div>
  </Modal>
);

export default PromptModalComponent;
