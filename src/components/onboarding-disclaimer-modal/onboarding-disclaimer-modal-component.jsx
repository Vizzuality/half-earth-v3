import React, { useState } from 'react';

import { useT } from '@transifex/react';

import { Modal } from 'he-components';

import useEventListener from 'hooks/use-event-listener';

import Button from 'components/button';

import styles from './onboarding-disclaimer-modal-styles.module.scss';

// Component used when the onboarding tour is outdated and we need to communicate it to the user
// Remove if not needed anymore

function OnboardingDisclaimer({ handleBack }) {
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
        <div className={styles.title}>{t('Notice: Audio misalignment')}</div>
        <p className={styles.paragraph}>
          {t(
            'Due to recent updates on our website, some of the features in the page may not be aligned with the audios. We apologize for any confusion and we are working to correct this as soon as possible.'
          )}
        </p>
        <p className={styles.paragraph}>{t('Thank you for your patience.')}</p>
        <div className={styles.buttonsContainer}>
          <Button
            type="rectangular"
            className={[styles.button, styles.cancelButton]}
            handleClick={handleBack}
            label={t('Cancel')}
          />
          <Button
            type="rectangular-primary"
            className={styles.button}
            handleClick={handleClose}
            label={t('Continue the tour')}
          />
        </div>
      </div>
    </Modal>
  );
}

export default OnboardingDisclaimer;
