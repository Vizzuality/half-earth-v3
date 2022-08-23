import React, { useMemo, useState } from 'react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import styles from './styles.module.scss';

import { getTabs } from './constants';

function TabsSidebarComponent({
  className,
  onboardingStep,
  onboardingType,
  activeLayers,
}) {
  const sidebarTabs = getTabs();
  const [isOpen/* , setOpen */] = useState(false);
  const [activeSidebarTab, setActivesidebarTab] = useState(sidebarTabs[0].slug);

  const handleSidebarTabs = (tab) => setActivesidebarTab(tab);

  const categoryActiveLayersCounter = useMemo(() => {
    return activeLayers.filter((al) => !!al.category).length;
  }, [activeLayers]);

  return (
    <div className={cx(styles.sidebarTabsContainer, className, {
      [styles.open]: isOpen,
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
                    {(slug === sidebarTabs[0].slug && activeSidebarTab !== slug) && (
                      <div className={styles.layersIndicator}>
                        {categoryActiveLayersCounter}
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

export default TabsSidebarComponent;
