import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { isMobile } from 'constants/responsive';

import FixedHeader from 'components/fixed-header';

import animationStyles from 'styles/common-animations.module.scss';
import styles from './sidebar-styles.module.scss';

const Sidebar = ({ map, view, theme, children, activeCategory, handleSidebarToggle, isSidebarOpen, isLandscapeMode, isFullscreenActive }) => {
  const isSidebarVisible = isSidebarOpen && !isLandscapeMode && !isFullscreenActive;
  const isOnMobile = isMobile();

  return (
    <div className={cx(styles.sidebar, theme.sidebar, { [animationStyles.leftHidden]: !isSidebarVisible && !isOnMobile, [animationStyles.bottomHidden]: !isSidebarVisible && isOnMobile })}>
      <div className={cx(styles.wrapper, { [animationStyles.leftHidden]: !isSidebarVisible && !isOnMobile, [animationStyles.bottomHidden]: !isSidebarVisible && isOnMobile })}>
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