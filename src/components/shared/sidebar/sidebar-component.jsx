import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as ChevronIcon } from 'icons/chevron.svg';
import styles from './sidebar-styles.module.scss';

const Sidebar = ({ theme, children, handleSidebarToggle, isPaddingActive }) => (
  <aside
    className={cx(
      styles.sidebar,
      { [styles.visible]: isPaddingActive },
      theme.sidebar
    )}
  >
    <button
      className={styles.button}
      onClick={handleSidebarToggle}
    >
      <span>
        {isPaddingActive ? 'Hide' : 'Open'}
      </span>
      <ChevronIcon className={cx(styles.icon, { [styles.iconHide] : !isPaddingActive, [styles.iconOpen] : isPaddingActive })}/>
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