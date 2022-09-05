import React from 'react';
import { connect } from 'react-redux';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import { getSidebarTabs } from 'constants/aois';

import styles from './styles.module.scss';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as AnalyzeAreasSelectedIcon } from 'icons/analyze_areas_selected.svg';
import { ReactComponent as MapLayersIcon } from 'icons/map_layers.svg';

import mapStateToProps from './selectors';

function TabsSidebarComponent({
  aoiId,
  savedActiveLayers,
  className,
  saveSidebarTab,
  sidebarTabActive,
  onTabClick = () => {},
}) {
  const sidebarTabs = getSidebarTabs();

  const mapLayersCounterIsActive = (slug) => slug === sidebarTabs[0].slug
  && savedActiveLayers && sidebarTabActive !== slug && savedActiveLayers.length > 0;

  const displayMapLayersIcon = (slug) => slug === sidebarTabs[0].slug
  && savedActiveLayers && (savedActiveLayers.length === 0 || sidebarTabActive === slug);

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

                    {mapLayersCounterIsActive(slug) && savedActiveLayers && (
                      <div className={styles.layersIndicator}>
                        {savedActiveLayers.length}
                      </div>
                    )}

                    {displayMapLayersIcon(slug) && (
                      <MapLayersIcon className={styles.tabIcon} />
                    )}

                    {displayAnalyzeAreasIcon(slug) && !aoiId && (
                      <AnalyzeAreasIcon className={styles.tabIcon} />
                    )}

                    {displayAnalyzeAreasIcon(slug) && aoiId && (
                      <div className={styles.analyzeAreaSelectedIconContainer}>
                        <AnalyzeAreasSelectedIcon className={styles.tabIcon} />
                        <div className={styles.aoiIndicator} />
                      </div>
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
