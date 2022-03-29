import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { helpCompleteDatabaseAnalyticsEvent } from 'actions/google-analytics-actions';

import styles from './mol-uploader-styles.module.scss';

const actions = { helpCompleteDatabaseAnalyticsEvent };

const MOLUploader = ({ helpCompleteDatabaseAnalyticsEvent }) => {
  const handleClick = () => {
    window.open('https://mol.org/upload', '_blank');
    helpCompleteDatabaseAnalyticsEvent();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonContainer} onClick={handleClick}>
        <button className={styles.uploadButton}>
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

export default connect(null, actions)(MOLUploader);
