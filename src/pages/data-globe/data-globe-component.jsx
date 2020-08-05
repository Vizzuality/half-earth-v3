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
  isHEModalOpen,
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
}) => (
  <>
    {sceneMode === LOCAL_SCENE &&
      <CountryScene
        countryISO={countryISO}
        countryName={countryName}
        hasMetadata={hasMetadata}
        activeLayers={activeLayers}
        isHEModalOpen={isHEModalOpen}
        sceneSettings={sceneSettings}
        countryExtent={countryExtent}
        isGlobeUpdating={isGlobeUpdating}
        selectedSpecies={selectedSpecies}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        />
      }
    {sceneMode === DATA_SCENE &&
      <DataScene
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        hasMetadata={hasMetadata}
        activeLayers={activeLayers}
        activeOption={activeOption}
        isSidebarOpen={isSidebarOpen}
        isHEModalOpen={isHEModalOpen}
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
      />
    }
   
  </>
)

export default DataGlobeComponent;