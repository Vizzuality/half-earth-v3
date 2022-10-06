import React, { useState } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { Modal } from 'he-components';

import useEventListener from 'hooks/use-event-listener';

import Button from 'components/button';

import { ReactComponent as IconWarning } from 'icons/warning-icon.svg';

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
        <IconWarning className={styles.icon} />
        <div className={styles.title}>{t('Limited mobile version')}</div>
        <p className={styles.paragraph}>
          {t(
            'The mobile version of Half-Earth map has limited funcionalities, for that reason we recomend you to use the desktop version.'
          )}
        </p>
        <p className={cx(styles.paragraph, styles.bold)}>
          {t('Either way, you can continue to explore the mobile version.')}
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
