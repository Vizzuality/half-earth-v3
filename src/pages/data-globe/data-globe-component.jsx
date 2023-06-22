import React from 'react';

import loadable from '@loadable/component';

import DataScene from 'scenes/data-scene';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function DataGlobeComponent({
  sceneMode,
  countryISO,
  countryName,
  hasMetadata,
  openedModal,
  activeLayers,
  handleMapLoad,
  sceneSettings,
  isSidebarOpen,
  activeCategory,
  selectedSpecies,
  isFullscreenActive,
  handleGlobeUpdating,
  countedActiveLayers,
  isBiodiversityActive,
  countryTooltipDisplayFor,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  aoiId,
}) {
  return (
    <>
      <Logo className={uiStyles.halfEarthLogoTopLeft} />
      <DataScene
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isSidebarOpen={isSidebarOpen}
        isBiodiversityActive={isBiodiversityActive}
        countedActiveLayers={countedActiveLayers}
        activeCategory={activeCategory}
        selectedSpecies={selectedSpecies}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        countryTooltipDisplayFor={countryTooltipDisplayFor}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
        aoiId={aoiId}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default DataGlobeComponent;
