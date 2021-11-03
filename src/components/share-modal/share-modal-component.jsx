import React from "react";
import { Modal } from "he-components";
import ShareInput from 'components/share-input';
import ShareSocialIcons from 'components/share-social-icons';
import { ReactComponent as ShareIcon } from "icons/share.svg";

import styles from "./share-modal-styles.module";

const ShareModalComponent = ({ handleClose, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.iconBackground}>
          <ShareIcon />
        </div>
        <div className={styles.shareContent}>
          <div className={styles.title}>Share this page</div>
          <ShareInput
            setShareUrl={() => `${window.location.href}`}
            className={styles.shareInputLayout}
          />
          <ShareSocialIcons
            setShareUrl={() => `${window.location.href}`}
            className={styles.shareIconsLayout}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShareModalComponent;
