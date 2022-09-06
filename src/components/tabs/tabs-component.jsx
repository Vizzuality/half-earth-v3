import React from 'react';

import cx from 'classnames';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import styles from './tabs-styles.module.scss';

const getSelectedTabIndex = (tabs, defaultTabSlug) => {
  const selectedTab = tabs.find(
    (t) => t.slug === defaultTabSlug || t.title === defaultTabSlug,
  );
  const selectedTabIndex = tabs.indexOf(selectedTab);
  return selectedTabIndex > -1 ? selectedTabIndex : 0;
};

function Tabs({
  tabs,
  onClick,
  disabled,
  defaultTabSlug,
  className,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  tabButtonsRef,
}) {
  return (
    <div className={cx(styles.tabs, className)}>
      <ul className={styles.tabList} role="tablist">
        {tabs.map((tab, i) => {
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
            waitingInteraction,
          });
          return (
            <li role="presentation" key={`tab-${tabSlug}`}>
              <motion.div
                ref={(ref) => {
                  if (tabButtonsRef && tabButtonsRef.current) {
                    tabButtonsRef.current[tabSlug] = ref;
                  }
                }}
                className={cx(
                  styles.tab,
                  onboardingClassname,
                  { [styles.disabled]: disabled },
                )}
                role="tab"
                aria-selected={slug === defaultTabSlug}
                {...onboardingOverlay}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClick(tabSlug);
                }}
              >
                <div
                  className={cx(
                    styles.title,
                    { [styles.active]: slug === defaultTabSlug },
                    { [styles.first]: i === 0 },
                    {
                      [styles.hasBorder]:
                        slug !== defaultTabSlug
                        && i !== getSelectedTabIndex(tabs, defaultTabSlug) + 1
                        && i !== getSelectedTabIndex(tabs, defaultTabSlug) - 1,
                    },
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
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
  defaultTabSlug: PropTypes.string,
};

Tabs.defaultProps = {
  tabs: [],
  defaultTabSlug: '',
};

export default Tabs;
