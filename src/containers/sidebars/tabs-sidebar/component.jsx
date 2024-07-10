import { useMemo } from 'react';
import { connect } from 'react-redux';

import { useLocale } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import { getSidebarTabs } from 'constants/ui-params';

import styles from './styles.module.scss';

import AnalyzeAreasIcon from 'icons/analyze_areas.svg?react';
import AnalyzeAreasSelectedIcon from 'icons/analyze_areas_selected.svg?react';
import MapLayersIcon from 'icons/map_layers.svg?react';

import mapStateToProps from './selectors';

function TabsSidebarComponent({
  aoiId,
  countedActiveLayers,
  className,
  saveSidebarTab,
  sidebarTabActive,
  onTabClick = () => {},
}) {
  const locale = useLocale();
  const [mapLayersTab, analyzeAreasTab] = useMemo(
    () => getSidebarTabs(),
    [locale]
  );

  const hasCountedActiveLayers =
    !!countedActiveLayers && countedActiveLayers > 0;
  const mapLayersCounterIsActive = (slug) =>
    slug === mapLayersTab.slug &&
    hasCountedActiveLayers &&
    sidebarTabActive !== slug;

  const displayMapLayersIcon = (slug) =>
    slug === mapLayersTab.slug &&
    (!hasCountedActiveLayers || sidebarTabActive === slug);

  const displayAnalyzeAreasIcon = (slug) => slug === analyzeAreasTab.slug;

  const handleSidebarTabs = (tab) => {
    saveSidebarTab(tab);
    onTabClick(tab);
  };

  return (
    <div className={cx(styles.sidebarTabsContainer, className)}>
      <div className={cx(styles.tabs, className)}>
        <ul className={styles.tabList} role="tablist">
          {[mapLayersTab, analyzeAreasTab].map((tab) => {
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
                  className={cx(styles.tab, onboardingClassname)}
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
                        {countedActiveLayers}
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
