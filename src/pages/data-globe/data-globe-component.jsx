// dependencies
import React from "react";
import loadable from "@loadable/component";
// components
import DataScene from "scenes/data-scene";
import HalfEarthLogo from "components/half-earth-logo";
import MainMenu from "components/main-menu";
//styles
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
}) => {
  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft} />
      <MainMenu />
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
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
};

export default DataGlobeComponent;
