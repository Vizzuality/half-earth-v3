import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import Button from 'components/button';

import styles from './styles.module.scss';

import { ReactComponent as CloseIcon } from 'icons/menu-close.svg';

function Component({ onboardingOverlay, className, handleClose, reference }) {
  const t = useT();
  return (
    <Button
      reference={reference}
      type="rounded"
      handleClick={handleClose}
      Icon={CloseIcon}
      className={cx(styles.closeButton, className)}
      tooltipText={t('Go back to the globe')}
      onboardingOverlay={onboardingOverlay}
    />
  );
}

export default Component;
