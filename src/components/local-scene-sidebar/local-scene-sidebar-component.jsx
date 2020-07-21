import React from 'react';
import cx from 'classnames';

import CountryDataCard from 'components/country-data-card';
import LocalPriorityCard from './local-priority-card';
import LocalSpeciesCard from './local-species-card';
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
  countryName,
  countryData,
  birdsEndemic,
  mammalsEndemic,
  indexStatement,
  reptilesEndemic,
  vertebratesCount,
  protectionNeeded,
  currentProtection,
  amphibiansEndemic,
  isFullscreenActive,
  countryDescription,
  countryDataLoading,
  handleSceneModeChange,
  endemicVertebratesCount,
}) => {

  const sidebarHidden = isFullscreenActive;
  return (
    <div className={cx(styles.container, {
      [animationStyles.leftHidden]: sidebarHidden,
    })}>
      <DummyBlurWorkaround />
      <CountryDataCard
        SPI={SPI}
        mean={mean}
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
      <LocalPriorityCard />
      <LocalSpeciesCard
        birds={birds}
        mammals={mammals}
        reptiles={reptiles}
        amphibians={amphibians}
        birdsEndemic={birdsEndemic}
        mammalsEndemic={mammalsEndemic}
        reptilesEndemic={reptilesEndemic}
        amphibiansEndemic={amphibiansEndemic}
      />
    </div>
  )
}


export default LocalSceneSidebarComponent;
