import React from 'react';
import { connect } from 'react-redux';

import cx from 'classnames';

import { getSidebarTabs } from 'constants/aois';

import uiStyles from 'styles/ui.module.scss';

import TabsSidebar from '../tabs-sidebar';

import AnalyzeAreasSidebarCard from './analyze-areas-sidebar-card';
import BiodiversitySidebarCard from './biodiversity-sidebar-card';
import CarbonSidebarCard from './carbon-sidebar-card';
import styles from './data-global-sidebar-styles.module.scss';
import HumanImpactSidebarCard from './human-impact-sidebar-card';
import ProtectedAreasSidebarCard from './protected-areas-sidebar-card';
import mapStateToProps from './selectors';

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
  sidebarTabActive,
}) {
  const sidebarTabs = getSidebarTabs();
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
      {sidebarTabActive === sidebarTabs[1].slug && (
        <AnalyzeAreasSidebarCard
          activeLayers={activeLayers}
          view={view}
          onboardingStep={onboardingStep}
          onboardingType={onboardingType}
        />
      )}
      {sidebarTabActive === sidebarTabs[0].slug && (
        <div>
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
      )}
    </div>
  );
}

export default connect(mapStateToProps, null)(DataGlobalSidebarComponent);
