import React from 'react';
import cx from 'classnames';
import {useSpring, animated} from 'react-spring'
import HumanPressureWidget from './human-presure-widget';

import uiStyles from 'styles/ui.module';
import styles from './landscape-sidebar-styles.module.scss';

const LandscapeSidebarComponent = ({ isLandscapeMode }) => {
  console.log(isLandscapeMode)
  const animationProps = useSpring({
    from: { marginLeft: -400 },
    marginLeft: isLandscapeMode ? 0 : -400,
    delay: isLandscapeMode ? 400 : 0
  })
  return (
    <animated.aside
      className={cx(
        uiStyles.uiTopLeft,
        styles.sidebar
      )}
      style={animationProps}>
      <div className={styles.wrapper}>
        <HumanPressureWidget />
      </div>
    </animated.aside>
  )
}


export default LandscapeSidebarComponent;