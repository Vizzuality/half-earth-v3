import React from 'react';

import BiodiversitySidebarCard from 'containers/sidebars/map-layers/biodiversity-sidebar-card';
import CarbonSidebarCard from 'containers/sidebars/map-layers/carbon-sidebar-card';
import HumanImpactSidebarCard from 'containers/sidebars/map-layers/human-impact-sidebar-card';
import ProtectedAreasSidebarCard from 'containers/sidebars/map-layers/protected-areas-sidebar-card';

function MapLayers({
  activeCategory,
  activeLayers,
  handleGlobeUpdating,
  map,
  onboardingType,
  onboardingStep,
  view,
  waitingInteraction,
}) {
  return (
    <>
      <BiodiversitySidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        map={map}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        view={view}
        waitingInteraction={waitingInteraction}
      />
      <ProtectedAreasSidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        map={map}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
      <HumanImpactSidebarCard
        activeCategory={activeCategory}
        activeLayers={activeLayers}
        handleGlobeUpdating={handleGlobeUpdating}
        map={map}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
      <CarbonSidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        map={map}
      />
    </>
  );
}

export default MapLayers;
