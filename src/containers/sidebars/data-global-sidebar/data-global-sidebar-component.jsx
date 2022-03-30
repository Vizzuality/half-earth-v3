// dependencies
import React from 'react';
import cx from 'classnames';

// components
import BiodiversitySidebarCard from './biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from './protected-areas-sidebar-card';
import HumanImpactSidebarCard from './human-impact-sidebar-card';
import AnalyzeAreasSidebarCard from './analyze-areas-sidebar-card';

// styles
import styles from './data-global-sidebar-styles.module.scss';

const DataGlobalSidebarComponent = ({
  map,
  view,
  className,
  activeLayers,
  activeCategory,
  countedActiveLayers,
  handleGlobeUpdating,
  onBoardingStep,
  onBoardingType,
  waitingInteraction,
}) => {
  return (
    <div className={cx(styles.container, className)}>
      <AnalyzeAreasSidebarCard
        activeLayers={activeLayers}
        view={view}
        onBoardingStep={onBoardingStep}
      />
      <BiodiversitySidebarCard
        map={map}
        view={view}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        countedActiveLayers={countedActiveLayers}
        onBoardingStep={onBoardingStep}
        onBoardingType={onBoardingType}
        waitingInteraction={waitingInteraction}
      />
      <ProtectedAreasSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
        onBoardingStep={onBoardingStep}
        waitingInteraction={waitingInteraction}
      />
      <HumanImpactSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
        onBoardingStep={onBoardingStep}
        waitingInteraction={waitingInteraction}
      />
    </div>
  )
}

export default DataGlobalSidebarComponent;