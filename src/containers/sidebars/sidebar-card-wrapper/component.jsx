import cx from 'classnames';

import styles from './styles.module.scss';

import CloseIcon from 'icons/close.svg?react';

function Component({
  children,
  className,
  sectionClassName,
  collapsable,
  onCardClose,
  isClosed,
  dark,
}) {
  const childrenArray = Array.isArray(children) ? children : [children];
  return (
    <div className={cx(styles.wrapper, { [styles.closed]: isClosed })}>
      {collapsable && (
        <button
          type="button"
          aria-label="Close card"
          className={styles.closeButton}
          onClick={onCardClose}
        >
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
              <section
                // eslint-disable-next-line react/no-array-index-key
                key={`section-${i}`}
                className={cx(styles.section, sectionClassName)}
              >
                {child}
              </section>
            ) : null
          )}
      </div>
    </div>
  );
}

export default Component;
