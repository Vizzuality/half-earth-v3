import React, { useState } from 'react';
import cx from 'classnames';
import { Loading } from 'he-components';

import CountryDataCard from './country-data-card';
import LocalPriorityCard from './local-priority-card';
import LocalSpeciesCard from './local-species-card';
import { ReactComponent as BackIcon } from 'icons/arrow_expand.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import ShareModal from 'components/share-modal';
import ShareModalButton from 'components/share-button';

import animationStyles from 'styles/common-animations.module.scss';
import styles from './local-scene-sidebar-styles.module.scss';

const LocalSceneSidebarComponent = ({
  SPI,
  mean,
  birds,
  mammals,
  reptiles,
  className,
  amphibians,
  countryISO,
  countryName,
  countryData,
  hasPriority,
  openedModal,
  birdsEndemic,
  mammalsEndemic,
  indexStatement,
  reptilesEndemic,
  vertebratesCount,
  protectionNeeded,
  speciesChartData,
  currentProtection,
  amphibiansEndemic,
  handlePrintReport,
  handleShareReport,
  isFullscreenActive,
  countryDescription,
  countryDataLoading,
  priorityAreasSentence,
  handleSceneModeChange,
  endemicVertebratesCount,
  endemicVertebratesSentence,
  highlightedSpeciesSentence,
  highlightedSpeciesRandomNumber,
}) => {
  const sidebarHidden = isFullscreenActive;
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  if (countryDataLoading) {
    return (
      <div className={styles.container}>
        <button
        className={styles.backButton}
        onClick={handleSceneModeChange}
      >
        <BackIcon className={styles.icon}/>
        <span className={styles.text}>back to global</span>
      </button>
        <div className={styles.loading}>
          <span className={styles.loadingText}>{`Loading ${countryName} information...`}</span>
          <Loading />
        </div>
      </div>
    );
  }

  return countryData ? (
    <div
      className={cx(styles.container, className, {
        [animationStyles.leftHidden]: sidebarHidden
      })}
    >
      <button className={styles.backButton} onClick={handleSceneModeChange}>
        <BackIcon className={styles.icon} />
        <span className={styles.text}>back to global</span>
      </button>
      <DummyBlurWorkaround />
      <CountryDataCard
        SPI={SPI}
        mean={mean}
        countryISO={countryISO}
        countryName={countryName}
        countryData={countryData}
        indexStatement={indexStatement}
        vertebratesCount={vertebratesCount}
        protectionNeeded={protectionNeeded}
        currentProtection={currentProtection}
        countryDescription={countryDescription}
        countryDataLoading={countryDataLoading}
        endemicVertebratesCount={endemicVertebratesCount}
        />
      <LocalPriorityCard
        hasPriority={hasPriority}
        protectionNeeded={protectionNeeded}
        currentProtection={currentProtection}
        priorityAreasSentence={priorityAreasSentence}
      />
      <LocalSpeciesCard
        birds={birds}
        mammals={mammals}
        reptiles={reptiles}
        amphibians={amphibians}
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        birdsEndemic={birdsEndemic}
        chartData={speciesChartData}
        mammalsEndemic={mammalsEndemic}
        reptilesEndemic={reptilesEndemic}
        vertebratesCount={vertebratesCount}
        amphibiansEndemic={amphibiansEndemic}
        endemicVertebratesCount={endemicVertebratesCount}
        endemicVertebratesSentence={endemicVertebratesSentence}
        highlightedSpeciesSentence={highlightedSpeciesSentence}
        highlightedSpeciesRandomNumber={highlightedSpeciesRandomNumber}
      />
      <div className={styles.actionGroup}>
        <DownloadIcon />
        <button className={styles.actionButton} onClick={handlePrintReport}>
          download this info (pdf)
        </button>
      </div>
      <div className={styles.actionGroup}>
        <ShareModalButton
          variant="longText"
          theme={{ shareText: styles.shareText }}
          setShareModalOpen={setShareModalOpen}
        />
        <ShareModal
          isOpen={isShareModalOpen}
          setShareModalOpen={setShareModalOpen}
        />
      </div>
    </div>
  ) : null;
}


export default LocalSceneSidebarComponent;
