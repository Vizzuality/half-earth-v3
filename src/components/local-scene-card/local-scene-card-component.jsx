import React from 'react';
import styles from './local-scene-card-styles.module.scss';

const LocalSceneCardComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      {children && children.map(
        child => (
          <section className={styles.section}>
            {child}
          </section>
        )
      )}
    </div>
  )
}

export default LocalSceneCardComponent;