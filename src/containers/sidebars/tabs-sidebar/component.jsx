import React, { useMemo } from 'react';
import { connect } from 'react-redux';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import { BASE_LAYERS, getSidebarTabs } from 'constants/aois';

import styles from './styles.module.scss';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
// import { ReactComponent as AnalyzeAreasSelectedIcon } from 'icons/analyze_areas_selected.svg';
import { ReactComponent as MapLayersIcon } from 'icons/map_layers.svg';

import mapStateToProps from './selectors';

function TabsSidebarComponent({
  className,
  activeLayers,
  saveSidebarTab,
  sidebarTabActive,
  onTabClick = () => {},
}) {
  const sidebarTabs = getSidebarTabs();

  const categoryActiveLayersCounter = useMemo(() => {
    return activeLayers.map((al, i) => {
      if (!BASE_LAYERS[i]) return al;
      return null;
    }).filter((i) => i !== null).length;
  }, [activeLayers]);

  const mapLayersCounterIsActive = (slug) => slug === sidebarTabs[0].slug
  && sidebarTabActive !== slug && categoryActiveLayersCounter > 0;

  const displayMapLayersIcon = (slug) => slug === sidebarTabs[0].slug
  && (categoryActiveLayersCounter === 0 || sidebarTabActive === slug);

  const displayAnalyzeAreasIcon = (slug) => slug === sidebarTabs[1].slug;

  const handleSidebarTabs = (tab) => {
    saveSidebarTab(tab);
    onTabClick(tab);
  };

  return (
    <div className={cx(styles.sidebarTabsContainer, className)}>
      <div className={cx(styles.tabs, className)}>
        <ul className={styles.tabList} role="tablist">
          {sidebarTabs.map((tab) => {
            const { slug, title } = tab;
            const tabSlug = slug || title;
            const {
              overlay: onboardingOverlay,
              className: onboardingClassname,
            } = getOnboardingProps({
              section: 'tabs',
              slug: tabSlug,
              styles,
            });
            return (
              <li role="presentation" key={`tab-${tabSlug}`}>
                <motion.div
                  className={cx(
                    styles.tab,
                    onboardingClassname,
                  )}
                  role="tab"
                  aria-selected={slug === sidebarTabActive}
                  {...onboardingOverlay}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSidebarTabs(slug);
                  }}
                >
                  <div className={styles.titleContainer}>
                    {mapLayersCounterIsActive(slug) && (
                    <div className={styles.layersIndicator}>
                      {categoryActiveLayersCounter}
                    </div>
                    )}
                    {displayMapLayersIcon(slug) && (
                      <MapLayersIcon className={styles.tabIcon} />
                    )}
                    {displayAnalyzeAreasIcon(slug) && (
                      <AnalyzeAreasIcon className={styles.tabIcon} />
                      // TODO: Set indicator when some aoi is selected and user is on map-layers
                      // <div className={styles.analyzeAreaSelectedIconContainer}>
                      //   <AnalyzeAreasSelectedIcon className={styles.tabIcon} />
                      //   <div className={styles.aoiIndicator} />
                      // </div>
                    )}
                    {title}
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default connect(mapStateToProps, null)(TabsSidebarComponent);
