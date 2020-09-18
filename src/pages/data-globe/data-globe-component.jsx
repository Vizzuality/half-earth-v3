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
  countryTooltip,
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
  highlightedCountryIso,
  isLandscapeSidebarCollapsed,
  countryChallengesSelectedKey,
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
        countryTooltip={countryTooltip}
        activeCategory={activeCategory}
        isLandscapeMode={isLandscapeMode}
        isGlobeUpdating={isGlobeUpdating}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
        isBiodiversityActive={isBiodiversityActive}
        highlightedCountryIso={highlightedCountryIso}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed}
      />
    )}
  </>
);

export default DataGlobeComponent;