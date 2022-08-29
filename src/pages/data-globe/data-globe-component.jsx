import React from 'react';

import loadable from '@loadable/component';

import DataScene from 'scenes/data-scene';

import HalfEarthLogo from 'components/half-earth-logo';
// import MainMenu from 'components/main-menu';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function DataGlobeComponent({
  sceneMode,
  countryISO,
  countryName,
  hasMetadata,
  openedModal,
  activeLayers,
  activeOption,
  handleMapLoad,
  sceneSettings,
  isSidebarOpen,
  activeCategory,
  isLandscapeMode,
  isGlobeUpdating,
  selectedSpecies,
  isFullscreenActive,
  handleGlobeUpdating,
  countedActiveLayers,
  isBiodiversityActive,
  countryTooltipDisplayFor,
  isLandscapeSidebarCollapsed,
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) {
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <DataScene
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        activeOption={activeOption}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isSidebarOpen={isSidebarOpen}
        isBiodiversityActive={isBiodiversityActive}
        countedActiveLayers={countedActiveLayers}
        activeCategory={activeCategory}
        selectedSpecies={selectedSpecies}
        isLandscapeMode={isLandscapeMode}
        isGlobeUpdating={isGlobeUpdating}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        countryTooltipDisplayFor={countryTooltipDisplayFor}
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default DataGlobeComponent;
