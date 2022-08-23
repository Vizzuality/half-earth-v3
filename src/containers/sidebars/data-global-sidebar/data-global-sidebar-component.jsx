import React from 'react';

import cx from 'classnames';

import uiStyles from 'styles/ui.module.scss';

import AnalyzeAreasSidebarCard from './analyze-areas-sidebar-card';
import BiodiversitySidebarCard from './biodiversity-sidebar-card';
import CarbonSidebarCard from './carbon-sidebar-card';
import styles from './data-global-sidebar-styles.module.scss';
import HumanImpactSidebarCard from './human-impact-sidebar-card';
import ProtectedAreasSidebarCard from './protected-areas-sidebar-card';
import TabsSidebar from './tabs-sidebar';

function DataGlobalSidebarComponent({
  map,
  view,
  className,
  activeLayers,
  activeCategory,
  handleGlobeUpdating,
  onboardingStep,
  onboardingType,
  waitingInteraction,
}) {
  return (
    <div
      className={cx(styles.container, className, {
        [uiStyles.onboardingMode]: !!onboardingType,
      })}
    >
      <TabsSidebar
        activeLayers={activeLayers}
        view={view}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
      />
      <AnalyzeAreasSidebarCard
        activeLayers={activeLayers}
        view={view}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
      />
      <BiodiversitySidebarCard
        map={map}
        view={view}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
      <ProtectedAreasSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
      />
      <HumanImpactSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
      <CarbonSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
      />
    </div>
  );
}

export default DataGlobalSidebarComponent;
