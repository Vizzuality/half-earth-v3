import { Modal } from 'he-components';
import React from 'react';
import styles from './styles.module';

const OnBoardingModalComponent = ({
  isOpen,
  title,
  description,
  handleModalClose,
}) => {

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          {description}
        </p>
        <div className={styles.buttons}>
          <button className={styles.backBtn}>
            Back home
          </button>
          <button className={styles.exploreBtn}>
            Explore
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OnBoardingModalComponent;
