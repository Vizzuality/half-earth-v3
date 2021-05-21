import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './tabs-styles.module.scss';

const getDefaultTabIndex = (tabs, defaultTabSlug) => {
  const defaultTab = tabs.find(t => t.slug === defaultTabSlug || t.title === defaultTabSlug);
  const defaultTabIndex = tabs.indexOf(defaultTab);
  return defaultTabIndex > -1 ? defaultTabIndex : 0;
}

const Tabs = ({ tabs, onClick, defaultTabSlug, className }) =>  {
  const [selectedTabIndex, setSelectedTabIndex] = useState(getDefaultTabIndex(tabs, defaultTabSlug));
  return (
    <div className={cx(styles.tabs, className)}>
      <ul role="tablist">
        {tabs.map((tab, i) => {
          const { slug, title } = tab;
          const tabSlug = slug || title;
          return (
            <li role="presentation" key={`tab-${tabSlug}`}>
              <div
                className={styles.tab}
                role="tab"
                aria-selected={selectedTabIndex === i}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedTabIndex(i);
                  onClick(tabSlug);
                }}
              >
                <div
                  className={cx(
                    styles.title,
                    { [styles.active]: i === selectedTabIndex },
                    { [styles.first]: i === 0 },
                    {
                      [styles.hasBorder]:
                        i !== selectedTabIndex &&
                        i !== selectedTabIndex + 1 &&
                        i !== selectedTabIndex - 1
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
}

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