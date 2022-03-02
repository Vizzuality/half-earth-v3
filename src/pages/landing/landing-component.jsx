
import React from 'react';
import loadable from '@loadable/component';

import LandingScene from 'scenes/landing-scene';
import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';

import uiStyles from 'styles/ui.module.scss';
// Dynamic imports
const InfoModal = loadable(() => import('components/modal-metadata'));

const LandingComponent = ({
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
      <LandingScene
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

export default LandingComponent;
