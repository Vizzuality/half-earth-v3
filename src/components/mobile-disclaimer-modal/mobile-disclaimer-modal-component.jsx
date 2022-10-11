import React, { useState } from 'react';

import { useT } from '@transifex/react';

import { Modal } from 'he-components';

import useEventListener from 'hooks/use-event-listener';

import Button from 'components/button';

import styles from './mobile-disclaimer-modal-styles.module.scss';

function Disclaimer() {
  const [isOpen, setOpen] = useState(true);

  const t = useT();
  const handleClose = () => setOpen(false);
  const keyEscapeEventListener = (evt) => {
    // eslint-disable-next-line no-param-reassign
    evt = evt || window.event;
    if (evt.keyCode === 27) handleClose();
  };

  useEventListener('keydown', keyEscapeEventListener);

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.title}>
          {t('Welcome to the Half-Earth Map.')}
        </div>
        <p className={styles.paragraph}>
          {t(
            'For an improved experience, we recommend you to check the computer version.'
          )}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            type="rectangular-primary"
            className={styles.button}
            handleClick={handleClose}
            label={t('Got it')}
          />
        </div>
      </div>
    </Modal>
  );
}

export default Disclaimer;
