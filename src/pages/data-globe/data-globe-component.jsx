import React from 'react';
import loadable from '@loadable/component'

import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';

import ReleaseNotesModal from 'components/release-notes-modal';
const CountryScene = loadable(() => import('scenes/country-scene'));
const DataScene = loadable(() => import('scenes/data-scene'));

const DataGlobeComponent = ({
  sceneMode,
  countryISO,
  countryName,
  hasMetadata,
  activeLayers,
  activeOption,
  countryExtent,
  openedModal,
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
  sortRankingCategory,
  localSceneActiveTab,
  isBiodiversityActive,
  isLandscapeSidebarCollapsed,
  countryChallengesSelectedKey,
  userConfig
}) => (
  <>
    {sceneMode === LOCAL_SCENE && (
      <CountryScene
        countryISO={countryISO}
        userConfig={userConfig}
        countryName={countryName}
        hasMetadata={hasMetadata}
        activeLayers={activeLayers}
        openedModal={openedModal}
        sceneSettings={sceneSettings}
        countryExtent={countryExtent}
        isGlobeUpdating={isGlobeUpdating}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        localSceneActiveTab={localSceneActiveTab}
        sortRankingCategory={sortRankingCategory}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        countryChallengesSelectedKey={countryChallengesSelectedKey}
      />
    )}
    {sceneMode === DATA_SCENE && (
      <DataScene
        sceneMode={sceneMode}
        userConfig={userConfig}
        countryISO={countryISO}
        countryName={countryName}
        hasMetadata={hasMetadata}
        activeLayers={activeLayers}
        activeOption={activeOption}
        isSidebarOpen={isSidebarOpen}
        openedModal={openedModal}
        sceneSettings={sceneSettings}
        activeCategory={activeCategory}
        selectedSpecies={selectedSpecies}
        isLandscapeMode={isLandscapeMode}
        isGlobeUpdating={isGlobeUpdating}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
        isBiodiversityActive={isBiodiversityActive}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
      />
    )}
    <ReleaseNotesModal />
  </>
);

export default DataGlobeComponent;