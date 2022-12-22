import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import {
  useOnboardingTooltipRefs,
  getOnboardingProps,
} from 'containers/onboarding/onboarding-hooks';

import Button from 'components/button';

import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import { ReactComponent as CloseIcon } from 'icons/menu-close.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';

import styles from './nrc-content-styles.module.scss';

function NrcContent({
  changeUI,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  handleClose,
  countryISO,
  countryName,
  setShareModalOpen,
  handlePrintReport,
}) {
  const t = useT();
  const tooltipRefs = useOnboardingTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
  });

  const { overlay: onboardingOverlay, className: onboardingClassName } =
    getOnboardingProps({
      section: 'closure',
      styles,
      changeUI,
      onboardingType,
      onboardingStep,
      waitingInteraction,
    });
  return (
    <div className={styles.nrcContent}>
      <Button
        reference={(ref) => {
          tooltipRefs.current.closure = ref;
        }}
        type="rounded"
        handleClick={handleClose}
        Icon={CloseIcon}
        className={cx(styles.closeButton, onboardingClassName)}
        tooltipText={t('Go back to the globe')}
        onboardingOverlay={onboardingOverlay}
      />
      <header className={styles.header}>
        <div className={styles.flagWrapper}>
          <img
            className={styles.flag}
            src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
            alt=""
          />
          {countryName && <p className={styles.countryName}>{countryName}</p>}
        </div>
        <div className={styles.actionButtons}>
          <Button
            type="icon-square"
            Icon={ShareIcon}
            className={styles.actionButton}
            handleClick={setShareModalOpen}
            tooltipText={t('Share the URL to this view')}
          />
          <Button
            type="icon-square"
            Icon={DownloadIcon}
            handleClick={handlePrintReport}
            tooltipText={t('Download national report')}
          />
        </div>
      </header>
    </div>
  );
}

export default NrcContent;
