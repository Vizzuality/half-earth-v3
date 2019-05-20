import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as ChevronIcon } from 'icons/chevron.svg';
import styles from './sidebar-styles.module.scss';

const Sidebar = ({ theme, children, handleSidebarToggle, isSidebarOpen }) => (
  <aside
    className={cx(
      styles.sidebar,
      { [styles.visible]: isSidebarOpen },
      theme.sidebar
    )}
  >
    <button
      className={styles.button}
      onClick={handleSidebarToggle}
    >
      <span>
        {isSidebarOpen ? 'Hide' : 'Open'}
      </span>
      <ChevronIcon className={cx(styles.icon, { [styles.iconHide] : !isSidebarOpen, [styles.iconOpen] : isSidebarOpen })}/>
    </button>
    { children }
  </aside>
)


Sidebar.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.shape({ sidebar: PropTypes.string })
};

Sidebar.defaultProps = {
  children: null,
  theme: {}
};

export default Sidebar;