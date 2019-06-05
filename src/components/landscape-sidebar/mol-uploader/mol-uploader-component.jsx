import React from 'react';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

import styles from './mol-uploader-styles.module.scss';

const MOLUploader = () => {
  const handleClick = () => window.open('https://mol.org/upload', '_blank');

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer}>
        <button className={styles.uploadButton} onClick={handleClick}>
          <CloseIcon className={styles.icon} />
        </button>
        <h3 className={styles.title}>Help us complete our database</h3>
      </div>
      <div className={styles.question}>
        Do you have more information about this particular area?
      </div>
    </div>
  );
};

export default MOLUploader;
