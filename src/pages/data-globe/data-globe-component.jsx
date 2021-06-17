// dependencies
import React from 'react';
import loadable from '@loadable/component'
// components
import DataScene from 'scenes/data-scene';
import UserDataModal from 'components/user-data-modal';
import TutorialModal from 'components/tutorial/tutorial-modal';
import Switcher from 'components/switcher';
import HalfEarthLogo from 'components/half-earth-logo';
// constants
import { useMobile } from 'constants/responsive';
//styles
import uiStyles from 'styles/ui.module.scss';
// Dynamic imports
const About = loadable(() => import('components/about'));
const InfoModal = loadable(() => import('components/modal-metadata'));


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
  isLandscapeSidebarCollapsed,
}) => {

  return (
    <>
      <HalfEarthLogo className={uiStyles.halfEarthLogoTopLeft}/> 
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
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      />
      {!useMobile() && <Switcher />}
      <UserDataModal />
      <TutorialModal />
      {hasMetadata && <InfoModal />}
      {!useMobile() && <About />}
    </>
  );
}

export default DataGlobeComponent;