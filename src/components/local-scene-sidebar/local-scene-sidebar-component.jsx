import React from 'react';
import cx from 'classnames';
import { Loading } from 'he-components';

import CountryDataCard from './country-data-card';
import LocalPriorityCard from './local-priority-card';
import LocalSpeciesCard from './local-species-card';
import { ReactComponent as BackIcon } from 'icons/arrow_expand.svg';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

import animationStyles from 'styles/common-animations.module.scss';
import styles from './local-scene-sidebar-styles.module.scss';

const LocalSceneSidebarComponent = ({
  SPI,
  mean,
  birds,
  mammals,
  reptiles,
  amphibians,
  countryISO,
  countryName,
  countryData,
  birdsEndemic,
  mammalsEndemic,
  indexStatement,
  reptilesEndemic,
  vertebratesCount,
  protectionNeeded,
  speciesChartData,
  currentProtection,
  amphibiansEndemic,
  isFullscreenActive,
  countryDescription,
  countryDataLoading,
  handleSceneModeChange,
  endemicVertebratesCount,
  endemicVertebratesSentence
}) => {

  const sidebarHidden = isFullscreenActive;

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
    <div className={cx(styles.container, {
      [animationStyles.leftHidden]: sidebarHidden,
    })}>
      <button
        className={styles.backButton}
        onClick={handleSceneModeChange}
      >
        <BackIcon className={styles.icon}/>
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
        protectionNeeded={protectionNeeded}
        currentProtection={currentProtection}
      />
      <LocalSpeciesCard
        birds={birds}
        mammals={mammals}
        reptiles={reptiles}
        chartData={speciesChartData}
        amphibians={amphibians}
        countryName={countryName}
        birdsEndemic={birdsEndemic}
        mammalsEndemic={mammalsEndemic}
        reptilesEndemic={reptilesEndemic}
        vertebratesCount={vertebratesCount}
        amphibiansEndemic={amphibiansEndemic}
        endemicVertebratesCount={endemicVertebratesCount}
        endemicVertebratesSentence={endemicVertebratesSentence}
      />  
    </div>
  ) : null
}


export default LocalSceneSidebarComponent;
