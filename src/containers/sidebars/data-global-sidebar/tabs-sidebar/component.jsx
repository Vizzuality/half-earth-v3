import React, { useState } from 'react';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import styles from './styles.module.scss';

import { getTabs } from './constants';

function TabsSidebarComponent({
  className,
  onboardingStep,
  onboardingType,

}) {
  const sidebarTabs = getTabs();
  const [isOpen/* , setOpen */] = useState(false);
  const [activeSidebarTab, setActivesidebarTab] = useState(sidebarTabs[0].slug);

  const handleSidebarTabs = (tab) => setActivesidebarTab(tab);

  return (
    <div className={cx(styles.sidebarTabsContainer, className, {
      [styles.open]: isOpen,
      [styles.onboardingOverlay]:
          onboardingType === 'priority-places' && onboardingStep === 2,
    })}
    >
      <div className={cx(styles.tabs, className)}>
        <ul className={styles.tabList} role="tablist">
          {sidebarTabs.map((tab, i) => {
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
                    className={cx(
                      styles.title,
                      { [styles.active]: slug === activeSidebarTab },
                      { [styles.first]: i === 0 },
                    )}
                  >
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
