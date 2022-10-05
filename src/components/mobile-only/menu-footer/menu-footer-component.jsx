/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import cx from 'classnames';

import styles from './menu-footer-styles.module';
// eslint-disable-next-line import/extensions

function MenuFooter({ options, activeOption }) {
  const isActive = (o) => activeOption && o.key === activeOption;

  return (
    <div className={styles.menuContainer}>
      {options.length &&
        options.map((option) => (
          <div
            role="button"
            tabIndex={0}
            key={option.key}
            onClick={option.onClickHandler}
            className={cx(styles.option, {
              [styles.activeOptionContainer]: isActive(option),
            })}
          >
            <option.icon className={styles.icon} />
            <span className={styles.title}>{option.name}</span>
          </div>
        ))}
    </div>
  );
}

export default MenuFooter;
