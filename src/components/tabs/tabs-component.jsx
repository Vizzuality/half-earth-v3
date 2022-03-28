// Dependencies
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { motion } from 'framer-motion';
// Styles
import styles from './tabs-styles.module.scss';

const getSelectedTabIndex = (tabs, defaultTabSlug) => {
  const selectedTab = tabs.find(t => t.slug === defaultTabSlug || t.title === defaultTabSlug);
  const selectedTabIndex = tabs.indexOf(selectedTab);
  return selectedTabIndex > -1 ? selectedTabIndex : 0;
}

const Tabs = ({ tabs, onClick, defaultTabSlug, className, onBoardingStep, onBoardingType }) => {
  console.log({ onBoardingType })
  return (
    <div className={cx(styles.tabs, className)}>
      <ul className={styles.tabList} role="tablist">
        {tabs.map((tab, i) => {
          const { slug, title } = tab;
          const tabSlug = slug || title;
          console.log({ tabSlug })

          const richnessOnBoardingStep = tabSlug === 'richness' && onBoardingType === 'priority-places' && onBoardingStep === 1;
          const rarityOnBoardingTab = tabSlug === 'rarity' && onBoardingType === 'priority-places' && onBoardingStep === 2;
          const challengesOnBoardingTab = tabSlug === 'challenges' && onBoardingType === 'national-report-cards' && onBoardingStep === 4;
          const rankingOnBoardingTab = tabSlug === 'ranking' && onBoardingType === 'national-report-cards' && onBoardingStep === 4;

          const slugOnBoardingStep = useMemo(() => {
            if (richnessOnBoardingStep) return 2
            if (rarityOnBoardingTab) return 3
            if (challengesOnBoardingTab) return 4
            if (rankingOnBoardingTab) return 5
            return null
          }, [onBoardingStep])

          return (
            <li role="presentation" key={`tab-${tabSlug}`}>
              <motion.div
                className={styles.tab}
                role="tab"
                aria-selected={slug === defaultTabSlug}
                animate={{
                  outline: richnessOnBoardingStep || rarityOnBoardingTab || challengesOnBoardingTab || rankingOnBoardingTab ? '5px solid #00BDB5' : 'none',
                }}
                transition={{
                  duration: 1.75,
                  repeat: Infinity,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClick(tabSlug, slugOnBoardingStep);
                }}
              >
                <div
                  className={cx(
                    styles.title,
                    { [styles.active]: slug === defaultTabSlug },
                    { [styles.first]: i === 0 },
                    {
                      [styles.hasBorder]:
                        slug !== defaultTabSlug &&
                        i !== getSelectedTabIndex(tabs, defaultTabSlug) + 1 &&
                        i !== getSelectedTabIndex(tabs, defaultTabSlug) - 1
                    }
                  )}
                >
                  {title}
                </div>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div >
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string.isRequired
    })
  ),
  onClick: PropTypes.func.isRequired,
  defaultTabSlug: PropTypes.string
};

Tabs.defaultProps = {
  tabs: [],
  onClick: () => { }
};

export default Tabs;