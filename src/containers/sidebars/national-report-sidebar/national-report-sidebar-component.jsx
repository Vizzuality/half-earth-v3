import React, { useState } from 'react';
import cx from 'classnames';
import { Loading } from 'he-components';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CloseIcon } from 'icons/closes.svg';

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
  LOCAL_SCENE_TABS,
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
        tooltipText="Go back to the globe"
        onboardingOverlay={onboardingOverlay}
      />
      <DummyBlurWorkaround />
      <div className={styles.nameWrapper}>
        <span className={styles.nrcTitle}>National report card of</span>
        <div className={styles.flagWrapper}>
          <img
            className={styles.flag}
            src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
            alt=""
          />
          {countryName && <p className={styles.countryName}>{countryName}</p>}
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
          <span
            className={styles.loadingText}
          >{`Loading country information...`}</span>
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
          <Button
            type="compound"
            Icon={ShareIcon}
            handleClick={setShareModalOpen}
            className={styles.actionButton}
            label="share this info"
            tooltipText="Share the URL to this view"
          />
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
