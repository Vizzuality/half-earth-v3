import React from 'react';
import loadable from '@loadable/component'

import { biodiversityCategories } from 'constants/mol-layers-configs';

import EntryBoxes from 'components/entry-boxes';
import Sidebar from 'components/sidebar';
const BiodiversityLayers = loadable(() => import('components/biodiversity-layers'));
const HumanImpactLayers = loadable(() => import('components/human-impact-layers'));
const ProtectedAreasLayers = loadable(() => import('components/protected-areas-layers'));
const CountryEntryCard = loadable(() => import('components/country-entry-card'));

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
  isLandscapeSidebarCollapsed
}) => {
  const isBiodiversityActive = activeCategory === 'Biodiversity';
  const isHumanPressuresActive = activeCategory === 'Human pressures';
  const isProtectedAreasActive = activeCategory === 'Existing protection';
  return (
    <>
      <CountryEntryCard />
      <EntryBoxes isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} activeOption={activeOption} isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode} activeLayers={activeLayers} rasters={rasters}ß/>
      <Sidebar activeOption={activeOption} isLandscapeSidebarCollapsed={isLandscapeSidebarCollapsed} isSidebarOpen={isSidebarOpen} isFullscreenActive={isFullscreenActive} activeCategory={activeCategory} isLandscapeMode={isLandscapeMode} map={map} view={view}>
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