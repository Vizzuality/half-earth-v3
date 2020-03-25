import React from 'react';
import loadable from '@loadable/component'

import { biodiversityCategories } from 'constants/mol-layers-configs';

import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
import CountryEntryCard from 'components/country-entry-card';
const BiodiversityLayers = loadable(() => import('components/biodiversity-layers'));
const HumanImpactLayers = loadable(() => import('components/human-impact-layers'));
const ProtectedAreasLayers = loadable(() => import('components/protected-areas-layers'));
const DataGlobeSidebarComponent = ({
  isSidebarOpen,
  isFullscreenActive,
  activeCategory,
  isLandscapeMode,
  activeLayers,
  rasters,
  map,
  view,
  handleGlobeUpdating,
  setRasters,
  activeOption,
  sceneMode,
  countryISO,
  isLandscapeSidebarCollapsed
}) => {
  const isBiodiversityActive = activeCategory === 'Biodiversity';
  const isHumanPressuresActive = activeCategory === 'Human pressures';
  const isProtectedAreasActive = activeCategory === 'Existing protection';
  return (
    <>
      <CountryEntryCard sceneMode={sceneMode} countryISO={countryISO}/>
      <EntryBoxes isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} countryISO={countryISO} activeOption={activeOption} isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode} activeLayers={activeLayers} rasters={rasters}ß/>
      <Sidebar activeOption={activeOption} countryISO={countryISO} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode} map={map} view={view}>
        {isBiodiversityActive && (
          biodiversityCategories.map(cat => (
            <BiodiversityLayers
              key={cat.name}
              isFullscreenActive={isFullscreenActive}
              title={cat.name}
              description={cat.description}
              subcategories={cat.subcategories}
              options={cat.taxa}
              activeLayers={activeLayers}
            />
          ))
        )}
        {isHumanPressuresActive && (
          <HumanImpactLayers
            activeLayers={activeLayers}
            rasters={rasters}
            handleGlobeUpdating={handleGlobeUpdating}
            setRasters={setRasters}
          />
        )}
        {isProtectedAreasActive && (
          <ProtectedAreasLayers
            handleGlobeUpdating={handleGlobeUpdating}
            activeLayers={activeLayers}
            activeCategory={activeCategory}
          />
        )}
      </Sidebar>
    </>
  )
}

export default DataGlobeSidebarComponent;