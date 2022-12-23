import React from 'react';

import { NATIONAL_REPORT_CARD } from 'router';

import loadable from '@loadable/component';

import cx from 'classnames';

import { useOnboardingOpenSection } from 'containers/onboarding/onboarding-hooks';

import HalfEarthLogo from 'components/half-earth-logo';
import NrcContent from 'components/nrc-content';
import RankingChart from 'components/ranking-chart';

import uiStyles from 'styles/ui.module.scss';

import nrcBackground from 'images/nrc-background.png';

import styles from './nrc-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function NationalReportCard({
  countryISO,
  countryName,
  chartData,
  // openedModal,
  hasMetadata,
  // isFullscreenActive,
  // countryChallengesSelectedKey,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  browsePage,
  changeUI,
  changeGlobe,
  countryId,
}) {
  useOnboardingOpenSection({
    onboardingStep,
    onboardingType,
    waitingInteraction,
    browsePage,
    changeUI,
    changeGlobe,
    countryISO,
    locationRoute: NATIONAL_REPORT_CARD,
  });

  const { marine } = chartData;
  const coastal = !!marine;

  return (
    <>
      <img
        title="NRC background"
        alt="NRC background"
        src={nrcBackground}
        className={styles.background}
      />
      <HalfEarthLogo
        className={cx(styles.hideOnPrint, uiStyles.halfEarthLogoTopLeft)}
      />
      <div
        className={cx(styles.hideOnPrint, styles.nrcContentContainer, {
          [uiStyles.onboardingMode]: !!onboardingType,
        })}
      >
        <NrcContent
          countryISO={countryISO}
          countryName={countryName}
          countryId={countryId}
        />
      </div>
      <div
        className={cx(styles.hideOnPrint, styles.rankingContainer, {
          [uiStyles.onboardingMode]: !!onboardingType,
        })}
      >
        <RankingChart
          coastal={coastal}
          countryISO={countryISO}
          className={styles.rankingChart}
        />
      </div>
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default NationalReportCard;
