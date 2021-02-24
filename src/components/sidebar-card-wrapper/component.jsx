import React from 'react';

import styles from './styles.module.scss'

const Component = ({ children }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <div className={styles.container}>
      {children && childrenArray.map(
        (child, i) => (
          <section key={i} className={styles.section}>
            {child}
          </section>
        )
      )}
    </div>
  )
}

export default Component;
