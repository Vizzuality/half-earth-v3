import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './tabs-styles.module.scss';
const getSelectedTabIndex = (tabs, defaultTabSlug) => {
  const selectedTab = tabs.find(t => t.slug === defaultTabSlug || t.title === defaultTabSlug);
  const selectedTabIndex = tabs.indexOf(selectedTab);
  return selectedTabIndex > -1 ? selectedTabIndex : 0;
}
const Tabs = ({ tabs, onClick, defaultTabSlug, className }) => (
  <div className={cx(styles.tabs, className)}>
    <ul className={styles.tabList} role="tablist">
      {tabs.map((tab, i) => {
        const { slug, title } = tab;
        const tabSlug = slug || title;
        return (
          <li role="presentation" key={`tab-${tabSlug}`}>
            <div
              className={styles.tab}
              role="tab"
              aria-selected={slug === defaultTabSlug}
              onClick={(e) => {
                e.preventDefault();
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
                    slug !== defaultTabSlug &&
                    i !== getSelectedTabIndex(tabs, defaultTabSlug) + 1 &&
                    i !== getSelectedTabIndex(tabs, defaultTabSlug) - 1
                  }
                )}
              >
                {title}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

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
  onClick: () => {}
};

export default Tabs;