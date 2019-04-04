import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as ChevronIcon } from 'icons/chevron.svg';
import styles from './sidebar-styles.module.scss';

const Sidebar = ({ theme, children }) => {
  const [isOpen, setSidebarState] = useState(true);
  const toggleSidebar = () => setSidebarState(!isOpen);

  return (
    <aside
      className={cx(
        styles.sidebar,
        { [styles.visible]: isOpen },
        theme.sidebar
      )}
    >
      <button
        className={styles.button}
        onClick={toggleSidebar}
      >
        <span>
          {isOpen ? 'Hide' : 'Open'}
        </span>
        <ChevronIcon className={cx(styles.icon, { [styles.iconHide] : !isOpen, [styles.iconOpen] : isOpen })}/>
      </button>
      { children }
    </aside>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.shape({ sidebar: PropTypes.string })
};

Sidebar.defaultProps = {
  children: null,
  theme: {}
};

export default Sidebar;