import React from 'react';
import Link from 'redux-first-router-link';
import styles from './switcher-styles.module';

const Switcher = ({ route, handleClick }) => {
  const isDataGlobe = route.path === '/simple';
  const experienceText = isDataGlobe ? 'featured maps': 'explore data';
  return (
    <Link className={styles.switcherContainer} to={{ type: isDataGlobe ? 'location/FEATURED' : 'location/SIMPLE'}}>
      <div className={styles.switcher}>
        Go To {experienceText}
      </div>
    </Link>
  )
}

export default Switcher;