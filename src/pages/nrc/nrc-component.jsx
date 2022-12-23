import React, { useState } from 'react';

import { NATIONAL_REPORT_CARD } from 'router';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { useOnboardingOpenSection } from 'containers/onboarding/onboarding-hooks';

import Button from 'components/button';
import HalfEarthLogo from 'components/half-earth-logo';
import NrcContent from 'components/nrc-content';
import RankingChart from 'components/ranking-chart';

import uiStyles from 'styles/ui.module.scss';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';

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
  const t = useT();
  const { marine } = chartData;
  const coastal = !!marine;
  const [fullRanking, setFullRanking] = useState(false);

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
      <div className={styles.container}>
        <motion.div
          initial={{ width: 320 }}
          animate={{ width: fullRanking ? '70vw' : 320 }}
          transition={{ duration: 0.5 }}
          className={cx(styles.hideOnPrint, styles.rankingContainer, {
            [uiStyles.onboardingMode]: !!onboardingType,
          })}
        >
          <RankingChart
            coastal={coastal}
            countryISO={countryISO}
            className={styles.rankingChart}
          />
        </motion.div>
        <motion.div
          className={cx(styles.hideOnPrint, styles.nrcContentContainer, {
            [uiStyles.onboardingMode]: !!onboardingType,
          })}
        >
          <motion.div
            className={cx(styles.fullRankingButtonContainer, {
              [styles.fullRanking]: fullRanking,
            })}
            initial={{ left: -4 }}
            animate={{ left: fullRanking ? -26 : -4 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              type="rectangular-primary"
              Icon={ArrowExpandIcon}
              className={styles.fullRankingButton}
              handleClick={() => setFullRanking(!fullRanking)}
              label={fullRanking ? t('Default Ranking') : t('Full Ranking')}
            />
          </motion.div>
          <NrcContent
            countryISO={countryISO}
            countryName={countryName}
            countryId={countryId}
          />
        </motion.div>
      </div>
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default NationalReportCard;
