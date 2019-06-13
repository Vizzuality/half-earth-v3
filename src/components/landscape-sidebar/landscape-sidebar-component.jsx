import React from 'react';
import cx from 'classnames';
import {useSpring, animated} from 'react-spring'

import GeoDescriptionWidget from './geo-description-widget';
import HumanPressureWidget from './human-pressure-widget';
import MOLUploader from './mol-uploader';

import uiStyles from 'styles/ui.module';
import styles from './landscape-sidebar-styles.module.scss';

const LandscapeSidebarComponent = ({ isLandscapeMode, isFullscreenActive, view }) => {
  const animationProps = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isLandscapeMode && !isFullscreenActive ? 0 : -400,
    delay: isLandscapeMode && !isFullscreenActive ? 400 : 0
  })
  return (
    <animated.aside
      className={cx(
        uiStyles.uiTopLeft,
        styles.sidebar
      )}
      style={animationProps}>
      <div className={styles.wrapper}>
        <GeoDescriptionWidget view={view} />
        <HumanPressureWidget />
        <MOLUploader />
      </div>
    </animated.aside>
  )
}


export default LandscapeSidebarComponent;
