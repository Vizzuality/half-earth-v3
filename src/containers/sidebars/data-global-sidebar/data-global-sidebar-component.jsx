import { connect } from 'react-redux';

import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { resetTooltip } from 'containers/onboarding/onboarding-hooks';
import MapLayers from 'containers/sidebars/map-layers';
import TabsSidebar from 'containers/sidebars/tabs-sidebar';

import { getSidebarTabs } from 'constants/ui-params';

import uiStyles from 'styles/ui.module.scss';

import AnalyzeAreasSidebarCard from './analyze-areas-sidebar-card';
import styles from './data-global-sidebar-styles.module.scss';
import mapStateToProps from './selectors';
import { useEffect, useState } from 'react';
import { batchToggleLayers } from 'utils/layer-manager-utils';

import dataScene from 'containers/scenes/data-scene/data-scene-config.js';

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
  changeGlobe,
  aoiId,
  queryParams,
  changeUI,
}) {
  const [mapLayersTab, analyzeAreasTab] = getSidebarTabs();
  const [resetOption, setResetOption] = useState(false);

  useEffect(() => {
    if(!sidebarTabActive) return;

    clearLayers();
  }, [sidebarTabActive]);

  const clearLayers = () => {
    const initialLayers = dataScene.globe.activeLayers;
    const layersToToggle = [];

    activeLayers.forEach(layer => {
      if(!initialLayers.some(l => l.title === layer.title)){
        layersToToggle.push({
          layerId: layer.title,
        })
      }

      const fromAnalyze = queryParams?.fromAnalyze === 'true' || queryParams?.fromAnalyze === true;
      if(fromAnalyze){
        layersToToggle.push({
          layerId: layer.title,
        })
      }
    })

    if(layersToToggle.length){
      batchToggleLayers(
        layersToToggle.map((l) => l.layerId),
        activeLayers,
        changeGlobe,
        {}
      );
    }

    setResetOption(true);
  };

  return (
    <div className={cx(styles.container, className)}>
      <TabsSidebar
        activeLayers={activeLayers}
        aoiId={aoiId}
        view={view}
        className={cx({
          [uiStyles.onboardingDisableInteraction]: !!onboardingType,
        })}
      />
      <div className={styles.content}>
        <AnimatePresence exitBeforeEnter>
          {sidebarTabActive === mapLayersTab.slug && (
            <motion.div
              className={styles.mapLayersContainer}
              key={mapLayersTab.slug}
              initial={{ opacity: 0, x: 160 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 160 }}
              transition={{
                duration: 0.25,
                ease: 'easeInOut',
              }}
              id="groupDropdownScrollContainer"
              onScroll={() => onboardingType && resetTooltip(changeUI)}
            >
              <MapLayers
                activeLayers={activeLayers}
                activeCategory={activeCategory}
                handleGlobeUpdating={handleGlobeUpdating}
                map={map}
                onboardingStep={onboardingStep}
                onboardingType={onboardingType}
                view={view}
                waitingInteraction={waitingInteraction}
              />
            </motion.div>
          )}
          {sidebarTabActive === analyzeAreasTab.slug && (
            <motion.div
              key={analyzeAreasTab.slug}
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
                resetOption={resetOption}
                onboardingStep={onboardingStep}
                onboardingType={onboardingType}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(DataGlobalSidebarComponent);
