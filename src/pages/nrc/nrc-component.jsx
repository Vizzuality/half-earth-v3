import React from 'react';

import { NATIONAL_REPORT_CARD } from 'router';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import NrcContent from 'containers/nrc-content';
import { useOnboardingOpenSection } from 'containers/onboarding/onboarding-hooks';
import SoundButton from 'containers/onboarding/sound-btn';
import OnboardingTooltip from 'containers/onboarding/tooltip';

import Button from 'components/button';
import HalfEarthLogo from 'components/half-earth-logo';
import RankingChart from 'components/ranking-chart';

import uiStyles from 'styles/ui.module.scss';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';

import nrcBackground from 'images/nrc-background.png';

import styles from './nrc-styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

export const rankingTransitionDuration = 500;

function NationalReportCard({
  countryISO,
  countryName,
  chartData,
  hasMetadata,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  browsePage,
  changeUI,
  changeGlobe,
  countryId,
  handleLandMarineSelection,
  selectedLandMarineOption,
  NRCSidebarView,
  handleSetFullRanking,
  fullRanking,
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

  const tabsData = {
    land: {
      text: t('Land', { __comment: '(Land) SPI' }),
    },
    marine: {
      text: t('Marine', { __comment: '(Marine) SPI' }),
    },
  };

  const renderLandMarineSwitch = () => (
    <div className={styles.switchDataButtons}>
      {Object.keys(tabsData).map((key) => (
        <button
          key={key}
          disabled={!marine}
          type="button"
          className={cx({
            [styles.switchDataButton]: true,
            [styles.switchDataActiveButton]:
              selectedLandMarineOption.slug === key,
          })}
          onClick={() => handleLandMarineSelection(key)}
        >
          {tabsData[key].text}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {!!onboardingType && <SoundButton />}
      <OnboardingTooltip />
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
          initial={{ width: 300 }}
          animate={{ width: fullRanking ? '64vw' : 300 }}
          transition={{ duration: rankingTransitionDuration / 1000 }}
          className={cx(styles.hideOnPrint, styles.rankingContainer, {
            [uiStyles.onboardingMode]: !!onboardingType,
          })}
        >
          <RankingChart
            countryISO={countryISO}
            className={styles.rankingChart}
            fullRanking={fullRanking}
            selectedLandMarineOption={selectedLandMarineOption}
          />
          {renderLandMarineSwitch()}
        </motion.div>
        <motion.div
          className={cx(styles.hideOnPrint, styles.nrcContentContainer, {
            [uiStyles.onboardingMode]: !!onboardingType,
          })}
        >
          {NRCSidebarView === 'main' && (
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
                handleClick={() => handleSetFullRanking(!fullRanking)}
                label={fullRanking ? t('Default Ranking') : t('Full Ranking')}
              />
            </motion.div>
          )}
          <NrcContent
            chartData={chartData}
            countryISO={countryISO}
            countryName={countryName}
            countryId={countryId}
            fullRanking={fullRanking}
            setFullRanking={handleSetFullRanking}
            selectedLandMarineOption={selectedLandMarineOption}
          />
        </motion.div>
      </div>
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default NationalReportCard;
