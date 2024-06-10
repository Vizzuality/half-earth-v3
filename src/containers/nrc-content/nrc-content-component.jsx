/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';
import { Loading } from 'he-components';

import Challenges from 'containers/nrc-content/nrc-challenges';
import Footer from 'containers/nrc-content/nrc-footer';
import Indicators from 'containers/nrc-content/nrc-indicators';
import Trend from 'containers/nrc-content/nrc-trend';
import Vertebrates from 'containers/nrc-content/nrc-vertebrates';
import {
  getOnboardingProps,
  useOnboardingOpenSection,
} from 'containers/onboarding/onboarding-hooks';

import Button from 'components/button';
import CloseButton from 'components/close-button';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
import ShareModal from 'components/share-modal';
import SpeciesTable from 'components/species-table';

import { NRC_STEPS } from 'constants/onboarding-constants';
import { useMobile } from 'constants/responsive';

import uiStyles from 'styles/ui.module.scss';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';

import { NRCSidebar } from './nrc-content';
import styles from './nrc-content-styles.module.scss';

function NrcContent({
  trendChartData,
  challengesInfo,
  changeUI,
  changeGlobe,
  browsePage,
  chartData,
  countryData,
  countryDescription,
  countryId,
  countryISO,
  countryName,
  fullRanking,
  openAnalyzeArea,
  handleClose,
  handlePrintReport,
  NRCSidebarView,
  onboardingType,
  onboardingStep,
  setNRCSidebarView,
  selectedLandMarineOption,
  waitingInteraction,
  setFullRanking,
  landMarineSwitch,
}) {
  const t = useT();
  const isMobile = useMobile();
  const dataIsLoaded =
    trendChartData && countryData && chartData && challengesInfo;

  const { source: challengesSources } = challengesInfo;

  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const {
    overlay: onboardingOverlay,
    className: onboardingClassName,
    onClick: onboardingOnClick,
  } = getOnboardingProps({
    section: 'closure',
    styles,
    changeUI,
    onboardingType,
    onboardingStep,
    waitingInteraction,
  });

  useOnboardingOpenSection({
    onboardingStep,
    onboardingType,
    waitingInteraction,
    changeUI,
    browsePage,
    changeGlobe,
  });

  const scrollableRef = useRef();
  useEffect(() => {
    if (scrollableRef.current && NRC_STEPS.challenges === onboardingStep) {
      const challengesElement = document.getElementById('nrc-challenges');
      if (challengesElement) {
        const offsetTop = challengesElement.getBoundingClientRect().top;
        const notScrolled = offsetTop > 400;
        if (notScrolled) {
          scrollableRef.current.scrollTo(
            0,
            offsetTop - scrollableRef.current.getBoundingClientRect().top
          );
        }
      }
    }
  }, [onboardingStep, scrollableRef.current]);
  const isCountryWithDisclaimer = ['CHN', 'IND'].includes(countryISO);

  return (
    <div
      className={cx({
        [styles.nrcContent]: true,
        [styles.nrcContentVertebrates]:
          NRCSidebarView === NRCSidebar.vertebrates && countryData,
        [styles.mobile]: isMobile,
      })}
    >
      <PdfNationalReport
        countryISO={countryISO}
        trendChartData={trendChartData}
        selectedLandMarineOption={selectedLandMarineOption}
      />
      <CloseButton
        handleClose={() => {
          if (onboardingOnClick && onboardingOnClick.onClick) {
            onboardingOnClick.onClick();
          } else {
            handleClose();
          }
        }}
        className={cx(styles.closeButton, onboardingClassName)}
        tooltipText={t('Go back to the globe')}
        onboardingOverlay={onboardingOverlay}
      />
      {NRCSidebarView === NRCSidebar.main && (
        <motion.div
          className={styles.motionView}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <header className={styles.header}>
            <div className={styles.flagWrapper}>
              <img
                className={styles.flag}
                src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
                alt=""
              />
              {countryName && (
                <p className={styles.countryName}>{countryName}</p>
              )}
            </div>
            {!isMobile && (
              <div className={styles.actionButtons}>
                <Button
                  type="icon-square"
                  Icon={AnalyzeAreasIcon}
                  className={styles.actionButton}
                  handleClick={openAnalyzeArea}
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
            )}
          </header>
          {!dataIsLoaded && (
            <div className={styles.loader} style={{ height: 200 }}>
              <Loading />
            </div>
          )}
          {dataIsLoaded && (
            <div
              ref={scrollableRef}
              className={cx(
                styles.scrolleableArea,
                uiStyles.onboardingAllowInteraction
              )}
            >
              {isMobile && landMarineSwitch}
              <div className={styles.countryDescriptionContainer}>
                <p className={styles.countryDescription}>
                  {countryDescription}
                </p>
                {isCountryWithDisclaimer && (
                  <div className={styles.disclaimerContainer}>
                    <div className={styles.disclaimer}>
                      <span className={styles.disclaimerBold}>Note:</span> You
                      may notice some notable gaps in protected area coverage on
                      the map. This is because we use protected area information
                      from the World Database on Protected Areas, or WDPA, which
                      requires countries to report information about their
                      protected areas to the WDPA. Some countries do not fully
                      report their protected areas in recent years, leading to
                      the gaps in data coverage you see on the map.
                    </div>
                  </div>
                )}
              </div>

              <Indicators isShrunken={fullRanking} />

              <Vertebrates
                isShrunken={fullRanking}
                setFullRanking={setFullRanking}
                selectedLandMarineOption={selectedLandMarineOption}
              />

              <Trend chartData={trendChartData} isShrunken={fullRanking} />

              {!isMobile && (
                <Challenges
                  countryISO={countryISO}
                  countryName={countryName}
                  countryId={countryId}
                  fullRanking={fullRanking}
                />
              )}

              {!isMobile && (
                <div className={styles.sourceText}>
                  <p>{t('Source:')}</p>{' '}
                  <ReactMarkdown
                    key={challengesSources}
                    source={challengesSources}
                  />
                </div>
              )}
              {!isMobile && (
                <Footer
                  countryId={countryId}
                  isShrunken={fullRanking}
                  openAnalyzeArea={openAnalyzeArea}
                />
              )}
            </div>
          )}
          <ShareModal
            isOpen={isShareModalOpen}
            setShareModalOpen={setShareModalOpen}
          />
        </motion.div>
      )}
      {NRCSidebarView === NRCSidebar.vertebrates && (
        <motion.div
          className={styles.motionView}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <button
                className={styles.backBtn}
                type="button"
                aria-label="Back to main view"
                onClick={() => setNRCSidebarView(NRCSidebar.main)}
              >
                <BackArrowIcon className={styles.arrowIcon} />
              </button>
              {countryName && (
                <p className={styles.title}>
                  {t('Vertebrates in', {
                    _comment: 'Number of (vertebrates in) a country',
                  })}{' '}
                  {countryName}
                </p>
              )}
            </div>
          </header>
          <SpeciesTable selectedLandMarineOption={selectedLandMarineOption} />
        </motion.div>
      )}
    </div>
  );
}

export default NrcContent;
