import React from 'react';

import CountryDataCard from './country-data-card';
import LocalPriorityCard from './local-priority-card';
import LocalSpeciesCard from './local-species-card';
import Button from 'components/button';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import styles from './styles.module.scss';

const OverviewSidebarComponent = ({
  map,
  activeLayers,
  SPI,
  mean,
  birds,
  mammals,
  reptiles,
  fishes,
  fishesEndemic,
  mammalsMar,
  mammalsMarEndemic,
  amphibians,
  chartData,
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
  countryDescription,
  countryDataLoading,
  priorityAreasSentence,
  endemicVertebratesCount,
  endemicVertebratesSentence,
  highlightedSpeciesSentence,
  highlightedSpeciesRandomNumber,
}) => {
  return (
    <>
      <CountryDataCard
        SPI={SPI}
        mean={mean}
        chartData={chartData}
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
        countryData={countryData}
        countryName={countryName}
        hasPriority={hasPriority}
        countryData={countryData}
        priorityAreasSentence={priorityAreasSentence}
        map={map}
        activeLayers={activeLayers}
      />
      <LocalSpeciesCard
        birds={birds}
        mammals={mammals}
        reptiles={reptiles}
        fishes={fishes}
        fishesEndemic={fishesEndemic}
        mammalsMar={mammalsMar}
        mammalsMarEndemic={mammalsMarEndemic}
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
      <Button
        type="compound"
        Icon={DownloadIcon}
        handleClick={handlePrintReport}
        className={styles.actionButton}
        label="download this info (pdf)"
        tooltipText="Download national data report"
      />
    </>
  );
};

export default OverviewSidebarComponent;
