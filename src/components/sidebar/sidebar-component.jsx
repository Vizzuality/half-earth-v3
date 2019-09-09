import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FixedHeader from 'components/fixed-header';

import uiStyles from 'styles/ui.module';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './sidebar-styles.module.scss';

const Sidebar = ({ map, view, theme, children, activeCategory, handleSidebarToggle, isSidebarOpen, isLandscapeMode, isFullscreenActive }) => {
  const isSidebarVisible = isSidebarOpen && !isLandscapeMode && !isFullscreenActive;

  return (
    <div className={cx(uiStyles.uiTopLeft, styles.sidebar, theme.sidebar)}>
      <div className={cx(styles.wrapper, { [animationStyles.leftHidden]: !isSidebarVisible })}>
        <FixedHeader closeSidebar={handleSidebarToggle} title={activeCategory} view={view}/>
        <div className={styles.content}>
          {React.Children.map(children || null, (child, i) => {
            return child && <child.type {...child.props} key={i} map={map} view={view}/>;
          })}
        </div>
      </div>
    </div>
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