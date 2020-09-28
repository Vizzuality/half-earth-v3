import React from 'react';
import loadable from '@loadable/component'

import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';

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
        countryName={countryName}
        hasMetadata={hasMetadata}
        activeLayers={activeLayers}
        openedModal={openedModal}
        sceneSettings={sceneSettings}
        countryExtent={countryExtent}
        isGlobeUpdating={isGlobeUpdating}
        selectedSpecies={selectedSpecies}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        localSceneActiveTab={localSceneActiveTab}
        sortRankingCategory={sortRankingCategory}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        countryChallengesSelectedKey={countryChallengesSelectedKey}
        sortRankingCategory={sortRankingCategory}
        userConfig={userConfig}
      />
    )}
    {sceneMode === DATA_SCENE && (
      <DataScene
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        hasMetadata={hasMetadata}
        activeLayers={activeLayers}
        activeOption={activeOption}
        isSidebarOpen={isSidebarOpen}
        openedModal={openedModal}
        sceneSettings={sceneSettings}
        activeCategory={activeCategory}
        isLandscapeMode={isLandscapeMode}
        isGlobeUpdating={isGlobeUpdating}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
        isBiodiversityActive={isBiodiversityActive}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
        userConfig={userConfig}
      />
    )}
  </>
);

export default DataGlobeComponent;