// dependencies
import React from 'react';
import cx from 'classnames';

// styles
import uiStyles from 'styles/ui.module.scss';
import styles from './data-global-sidebar-styles.module.scss';

// components
import BiodiversitySidebarCard from './biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from './protected-areas-sidebar-card';
import HumanImpactSidebarCard from './human-impact-sidebar-card';
import AnalyzeAreasSidebarCard from './analyze-areas-sidebar-card';

const DataGlobalSidebarComponent = ({
  map,
  view,
  className,
  activeLayers,
  activeCategory,
  countedActiveLayers,
  handleGlobeUpdating,
  onboardingStep,
  onboardingType,
  waitingInteraction,
}) => {
  return (
    <div
      className={cx(styles.container, className, {
        [uiStyles.onboardingMode]: !!onboardingType,
      })}
    >
      <AnalyzeAreasSidebarCard
        activeLayers={activeLayers}
        view={view}
        onboardingStep={onboardingStep}
      />
      <BiodiversitySidebarCard
        map={map}
        view={view}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        countedActiveLayers={countedActiveLayers}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
      <ProtectedAreasSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
      />
      <HumanImpactSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
    </div>
  );
};

export default DataGlobalSidebarComponent;
