/* eslint-disable camelcase */
import React, { useState } from 'react';

import { useT } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';
import 'styles/settings';

import {
  useOnboardingTooltipRefs,
  getOnboardingProps,
} from 'containers/onboarding/onboarding-hooks';

import Button from 'components/button';
import CloseButton from 'components/close-button';
import IndicatorCard from 'components/nrc-content/indicator-card';
import ShareModal from 'components/share-modal';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
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
  handlePrintReport,
  goToAnalyzeAreas,
  countryData,
  countryDescription,
}) {
  const t = useT();

  const {
    SPI_ter,
    total_endemic_ter,
    prop_protected_ter,
    nspecies_ter,
    protection_needed_ter,
  } = countryData || {};

  const [isShareModalOpen, setShareModalOpen] = useState(false);
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
      <CloseButton
        reference={(ref) => {
          tooltipRefs.current.closure = ref;
        }}
        handleClose={handleClose}
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
            Icon={AnalyzeAreasIcon}
            className={styles.actionButton}
            handleClick={goToAnalyzeAreas}
            tooltipText={t('Go to analyze area')}
          />
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
      <div className={styles.countryDescriptionContainer}>
        <p className={styles.countryDescription}>{countryDescription}</p>
      </div>
      <div className={styles.indicatorCardsContainer}>
        <IndicatorCard
          indicator={getLocaleNumber(SPI_ter) || ''}
          description={<p>{t('Land Species Protection Index (SPI)')}</p>}
        />
        <IndicatorCard
          color="#F8D300"
          indicator={getLocaleNumber(total_endemic_ter) || ''}
          description={
            <p>
              <b>{t('are endemic')}</b>{' '}
              {t('land vertebrate species of a total of')}{' '}
              {getLocaleNumber(nspecies_ter)} {t('land vertebrates')}
            </p>
          }
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: `linear-gradient(to right,
                #F8D300,
                #F8D300 ${(total_endemic_ter * 100) / nspecies_ter}%,
                #FFFFFF0F ${(total_endemic_ter * 100) / nspecies_ter}%,
                #FFFFFF0F 100%`,
            }}
          />
        </IndicatorCard>
        <IndicatorCard
          color="#008604"
          indicator={`${Math.round(prop_protected_ter)}%` || ''}
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: `linear-gradient(to right,
                #008604,
                #008604 ${prop_protected_ter}%,
                #B3E74B, ${prop_protected_ter}%,
                #B3E74B, ${prop_protected_ter + protection_needed_ter}%,
                #FFFFFF0F ${prop_protected_ter + protection_needed_ter}%,
                #FFFFFF0F 100%                                                                                                                                                                                                                                                  `,
            }}
          />
        </IndicatorCard>
        <IndicatorCard color="#7D2EFC" indicator="46%" />
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        setShareModalOpen={setShareModalOpen}
      />
    </div>
  );
}

export default NrcContent;
