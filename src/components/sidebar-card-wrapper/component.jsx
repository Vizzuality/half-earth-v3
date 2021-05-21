import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss'

const Component = ({ children, className }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <div className={cx(styles.container, className)}>
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
