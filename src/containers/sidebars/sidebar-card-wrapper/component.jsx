import React from 'react';
import cx from 'classnames';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

import styles from './styles.module.scss';

const Component = ({
  children,
  className,
  sectionClassName,
  collapsable,
  onCardClose,
  isClosed,
  dark,
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <div className={cx(styles.wrapper, { [styles.closed]: isClosed })}>
      {collapsable && (
        <button className={styles.closeButton} onClick={onCardClose}>
          <CloseIcon />
        </button>
      )}
      <div
        className={cx(styles.container, className, {
          [styles.dark]: dark,
        })}
      >
        {children &&
          childrenArray.map((child, i) =>
            child ? (
              <section key={i} className={cx(styles.section, sectionClassName)}>
                {child}
              </section>
            ) : null
          )}
      </div>
    </div>
  );
};

export default Component;
