import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './tabs-styles.module.scss';

const Tab = ({ children, index, isSelected }) => (
  <div
    id={`tabpanel_${index}`}
    name={`tabpanel_${index}`}
    role="tabpanel"
    aria-labelledby={`tab_${index}`}
    aria-hidden={!isSelected}
  >
    {children}
  </div>
);

const Tabs = ({ tabs, selectedTabIndex, setSelectedTabIndex }) =>  {
  const [activeTitle, setActiveTitle] = useState(null);

  useEffect(() => {
    if (activeTitle && activeTitle.current) {
      activeTitle.current.focus()
    }
  }, [activeTitle])


  const handleClick = (e, i) => {
    e.preventDefault();
    setSelectedTabIndex(i)
  }

  return (
    <div className={styles.tabs}>
      <ul role="tablist">
        {tabs.map((tab, i) => (
          <li role="presentation" key={`tab-${i}`}>
            <div
              id={`tab_${i}`}
              href={`#tabpanel_${i}`}
              role="tab"
              aria-selected={i === selectedTabIndex}
              aria-controls={`tabpanel_${i}`}
              onClick={(e) => handleClick(e, i)}
              ref={(link) => {
                if (i === selectedTabIndex) {
                  setActiveTitle(link);
                }
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
                      i !== (selectedTabIndex + 1) &&
                      i !== (selectedTabIndex - 1)
                  }
                )}
              >
                {tab.title}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        {tabs.map((tab, i) => (
          <Tab key={`tab-${i}`} index={i} isSelected={i === selectedTabIndex}>
            {tab.content}
          </Tab>
        ))}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node,
    title: PropTypes.string
  })),
  selectedTabIndex: PropTypes.number.isRequired,
  setSelectedTabIndex: PropTypes.func.isRequired
};

Tabs.defaultProps = {
  tabs: [],
  selectedTabIndex: 0,
};

export default Tabs;