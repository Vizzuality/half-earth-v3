import React from 'react';

import CountryDataCard from './country-data-card';
import LocalPriorityCard from './local-priority-card';
import LocalSpeciesCard from './local-species-card';
const Component = ({
  SPI,
  mean,
  birds,
  mammals,
  reptiles,
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
  handleSourceClick,
  handleShareReport,
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
          handleSourceClick={handleSourceClick}
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
    </>
  )
}

export default Component;