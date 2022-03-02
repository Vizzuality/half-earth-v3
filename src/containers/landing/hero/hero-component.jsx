// dependencies
import React from 'react';
import cx from 'classnames';

// styles
import styles from './hero-styles.module.scss';

const HeroComponent = ({
  className,
}) => {

  return (
    <div className={cx(styles.container, className)}>
      <h3 className={styles.subtitle}>Welcome to HALF EARTH MAP</h3>
      <h1 className={styles.title}>Explore where species conservation <br /> activities are needed the most</h1>
      <p className={styles.ctoText}>SELECT ONE OF THE AUDIO TOURS BELOW TO LEARN MORE ABOUT IT</p>
    </div>
  )
}

export default HeroComponent;