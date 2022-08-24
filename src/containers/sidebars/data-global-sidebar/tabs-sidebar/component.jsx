import React, { useMemo, useState } from 'react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import styles from './styles.module.scss';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as MapLayersIcon } from 'icons/map_layers.svg';

import { getTabs } from './constants';

function TabsSidebarComponent({
  className,
  onboardingStep,
  onboardingType,
  activeLayers,
}) {
  const sidebarTabs = getTabs();
  const [activeSidebarTab, setActivesidebarTab] = useState(sidebarTabs[0].slug);

  const mapLayersCounterIsActive = (slug) => slug === sidebarTabs[0].slug
  && activeSidebarTab !== slug;
  const mapLayersIsActive = (slug) => slug === sidebarTabs[0].slug && activeSidebarTab === slug;
  const analyzeAreasIsActive = (slug) => slug === sidebarTabs[1].slug;

  const handleSidebarTabs = (tab) => setActivesidebarTab(tab);

  const categoryActiveLayersCounter = useMemo(() => {
    return activeLayers.filter((al) => !!al.category).length;
  }, [activeLayers]);

  return (
    <div className={cx(styles.sidebarTabsContainer, className, {
      [styles.onboardingOverlay]:
          onboardingType === 'priority-places' && onboardingStep === 2,
    })}
    >
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
              onboardingType,
              onboardingStep,
              // waitingInteraction,
            });
            return (
              <li role="presentation" key={`tab-${tabSlug}`}>
                <motion.div
                  className={cx(
                    styles.tab,
                    onboardingClassname,
                  )}
                  role="tab"
                  aria-selected={slug === activeSidebarTab}
                  {...onboardingOverlay}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSidebarTabs(slug);
                  }}
                >
                  <div
                    className={styles.titleContainer}
                  >
                    {mapLayersCounterIsActive(slug) && (
                    <div className={styles.layersIndicator}>
                      {categoryActiveLayersCounter}
                    </div>
                    )}
                    {mapLayersIsActive(slug) && (
                      <MapLayersIcon className={styles.tabIcon} />
                    )}
                    {analyzeAreasIsActive(slug) && (
                      <AnalyzeAreasIcon className={styles.tabIcon} />
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

export default TabsSidebarComponent;
