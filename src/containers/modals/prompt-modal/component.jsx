import { Modal } from 'he-components';

import styles from './styles.module';

import WarningIcon from 'icons/warning.svg?react';

// Modal to display warnings and other alerts
function PromptModalComponent({ title, isOpen, description, handleClose }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.iconWrapper}>
          <WarningIcon className={styles.icon} />
        </div>
        <section>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </section>
      </div>
    </Modal>
  );
}

export default PromptModalComponent;
