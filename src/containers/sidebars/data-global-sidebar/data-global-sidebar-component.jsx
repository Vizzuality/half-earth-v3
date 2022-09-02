import React from 'react';
import { connect } from 'react-redux';

import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import TabsSidebar from 'containers/sidebars/tabs-sidebar';

import { getSidebarTabs } from 'constants/aois';

import uiStyles from 'styles/ui.module.scss';

import AnalyzeAreasSidebarCard from './analyze-areas-sidebar-card';
import BiodiversitySidebarCard from './biodiversity-sidebar-card';
import CarbonSidebarCard from './carbon-sidebar-card';
import styles from './data-global-sidebar-styles.module.scss';
import HumanImpactSidebarCard from './human-impact-sidebar-card';
import ProtectedAreasSidebarCard from './protected-areas-sidebar-card';
import mapStateToProps from './selectors';

const { REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS } = process.env;

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
  aoiId,
}) {
  const sidebarTabs = getSidebarTabs();
  if (FEATURE_NEW_MENUS) {
    return (
      <div className={cx(styles.container, className)}>
        <TabsSidebar
          activeLayers={activeLayers}
          aoiId={aoiId}
          view={view}
        />
        <div
          className={cx(styles.content, {
            [uiStyles.onboardingMode]: !!onboardingType,
          })}
        >
          <AnimatePresence exitBeforeEnter>
            {sidebarTabActive === sidebarTabs[1].slug && (
            <motion.div
              key={sidebarTabs[1].slug}
              initial={{ opacity: 0, x: 160, width: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 160 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
            >
              <AnalyzeAreasSidebarCard
                activeLayers={activeLayers}
                view={view}
                onboardingStep={onboardingStep}
                onboardingType={onboardingType}
              />
            </motion.div>
            )}
            {sidebarTabActive === sidebarTabs[0].slug && (
            <motion.div
              className={styles.mapLayersContainer}
              key={sidebarTabs[0].slug}
              initial={{ opacity: 0, x: 160 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 160 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
            >
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
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (!FEATURE_NEW_MENUS) {
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
}

export default connect(mapStateToProps, null)(DataGlobalSidebarComponent);
