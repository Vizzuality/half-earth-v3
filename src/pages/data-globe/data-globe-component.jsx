// Dependencies
import React from "react";
import loadable from "@loadable/component";
// Components
import HalfEarthLogo from "components/half-earth-logo";
import MainMenu from "components/main-menu";
import DataScene from "scenes/data-scene";
// Styles
import uiStyles from "styles/ui.module.scss";
// Dynamic imports
const InfoModal = loadable(() => import("components/modal-metadata"));

const DataGlobeComponent = ({
  sceneMode,
  countryISO,
  userConfig,
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
  onBoardingType,
  onBoardingStep,
  waitingInteraction,
}) => {

  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu waitingInteraction={waitingInteraction} />
      <DataScene
        sceneMode={sceneMode}
        userConfig={userConfig}
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
        onBoardingType={onBoardingType}
        onBoardingStep={onBoardingStep}
        waitingInteraction={waitingInteraction}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
};

export default DataGlobeComponent;
