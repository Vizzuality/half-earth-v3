import React from 'react';
import styles from './switcher-styles.module';

const Switcher = ({ route, handleClick }) => {
  const isDataGlobe = route.path === '/dataGlobe';
  const experienceText = isDataGlobe ? 'featured maps': 'explore data';
  return (
    <div className={styles.switcherContainer}>
      <div className={styles.switcher} onClick={handleClick}>
        Go To {experienceText}
      </div>
    </div>
  )
}

export default Switcher;