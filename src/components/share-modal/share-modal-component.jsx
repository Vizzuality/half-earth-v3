import { T } from '@transifex/react';

import { Modal } from 'he-components';

import ShareInput from 'components/share-input';
import ShareSocialIcons from 'components/share-social-icons';

import ShareIcon from 'icons/share.svg?react';

import styles from './share-modal-styles.module';

function ShareModalComponent({ handleClose, isOpen }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.iconBackground}>
          <ShareIcon />
        </div>
        <div className={styles.shareContent}>
          <div className={styles.title}>
            <T _str="Share this page" />
          </div>
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
}

export default ShareModalComponent;
