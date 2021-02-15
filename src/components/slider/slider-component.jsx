import React from 'react';
import Link from 'redux-first-router-link';

import styles from './slider-styles.module.scss';

const Slider = ({ route }) => {
  const isDataGlobe = route && route.path === '/dataGlobe';
  const title = isDataGlobe ? 'Go to featured maps' : 'Go to explore data';
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Link
        className={styles.switch}
        to={{ type: isDataGlobe ? "location/FEATURED" : "location/DATA" }}
      >
        <input type="checkbox" checked={!isDataGlobe} />
        <span className={styles.slider}></span>
      </Link>
    </div>
  );
}

export default Slider;