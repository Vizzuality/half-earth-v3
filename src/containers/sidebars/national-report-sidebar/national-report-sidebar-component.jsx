import React, { useState, useCallback } from 'react';
import { useT, useLocale } from '@transifex/react';
import { getCountryNames } from 'constants/translation-constants';

import cx from 'classnames';
import { Loading } from 'he-components';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import Tabs from 'components/tabs';
import Button from 'components/button';
import ShareModal from 'components/share-modal';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import OverviewSidebar from './overview-sidebar';
import ChallengesSidebar from './challenges-sidebar';
import RankingSidebar from './ranking-sidebar';

import animationStyles from 'styles/common-animations.module.scss';
import uiStyles from 'styles/ui.module.scss';
import styles from './national-report-sidebar-styles.module.scss';

// Hooks
import { useTooltipRefs } from 'containers/onboarding/onboarding-hooks';

import {
  LOCAL_SCENE_TABS_SLUGS,
  LOCAL_SCENE_DEFAULT_TAB,
} from 'constants/ui-params';

const NationalReportSidebarComponent = ({
  chartData,
  className,
  countryISO,
  countryData,
  countryName,
  openedModal,
  handleTabSelection,
  handlePrintReport,
  isFullscreenActive,
  localSceneActiveTab,
  handleClose,
  map,
  activeLayers,
  onboardingStep,
  onboardingType,
  waitingInteraction,
  changeUI,
}) => {
  const t = useT();
  const locale = useLocale();
  const countryNames = useCallback(getCountryNames, [locale]);

  const LOCAL_SCENE_TABS = [
    { slug: LOCAL_SCENE_TABS_SLUGS.OVERVIEW, title: t('overview') },
    { slug: LOCAL_SCENE_TABS_SLUGS.CHALLENGES, title: t('challenges') },
    { slug: LOCAL_SCENE_TABS_SLUGS.RANKING, title: t('ranking') },
  ];

  const sidebarHidden = isFullscreenActive;
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const tooltipRefs = useTooltipRefs({
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
    <div
      className={cx(styles.container, className, {
        [animationStyles.leftHidden]: sidebarHidden,
        [uiStyles.onboardingMode]: !!onboardingType,
      })}
    >
      <Button
        reference={(ref) => {
          tooltipRefs.current.closure = ref;
        }}
        type="rounded"
        handleClick={handleClose}
        Icon={CloseIcon}
        className={cx(styles.backButton, onboardingClassName)}
        tooltipText={t('Go back to the globe')}
        onboardingOverlay={onboardingOverlay}
      />
      <DummyBlurWorkaround />
      <div className={styles.nameWrapper}>
        <span className={styles.nrcTitle}>{t('National report card of')}</span>
        <div className={styles.cardHeader}>
          <div className={styles.flagWrapper}>
            <img
              className={styles.flag}
              src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
              alt=""
            />
            {countryName && (
              <p className={styles.countryName}>
                {countryNames[countryName] || countryName}
              </p>
            )}
          </div>
          <div className={styles.actionButtons}>
            <Button
              type="icon-square"
              Icon={ShareIcon}
              className={styles.actionButton}
              handleClick={setShareModalOpen}
              tooltipText={t('Share the URL to this view')}
            />
            {localSceneActiveTab === 'overview' && (
              <Button
                type="icon-square"
                Icon={DownloadIcon}
                handleClick={handlePrintReport}
                tooltipText={t('Download national data report')}
              />
            )}
          </div>
        </div>
      </div>
      <Tabs
        tabs={LOCAL_SCENE_TABS}
        onClick={handleTabSelection}
        className={styles.tabsContainer}
        defaultTabSlug={localSceneActiveTab || LOCAL_SCENE_DEFAULT_TAB}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
        tabButtonsRef={countryName && tooltipRefs}
      />
      {!countryData ? (
        <div className={styles.loading}>
          <span className={styles.loadingText}>
            {t('Loading country information...')}
          </span>
          <Loading />
        </div>
      ) : (
        <div className={styles.scrollableArea}>
          {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.OVERVIEW && (
            <OverviewSidebar
              chartData={chartData}
              countryISO={countryISO}
              openedModal={openedModal}
              map={map}
              activeLayers={activeLayers}
            />
          )}
          {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.CHALLENGES && (
            <ChallengesSidebar countryISO={countryISO} />
          )}
          {localSceneActiveTab === LOCAL_SCENE_TABS_SLUGS.RANKING && (
            <RankingSidebar countryISO={countryISO} />
          )}
          <ShareModal
            isOpen={isShareModalOpen}
            setShareModalOpen={setShareModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default NationalReportSidebarComponent;
