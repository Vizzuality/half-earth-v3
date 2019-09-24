import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './menu-footer-styles.module';

const MenuFooter = ({ options, isLandscapeMode }) => {
  const [activeOption, setActive] = useState(null);
  const isActive = (o) => activeOption && o.name === activeOption.name;

  useEffect(() => {
    if (isLandscapeMode) setActive(null);
  }, [isLandscapeMode])

  const onClickHandler = (option) => {
    setActive(option);
    option.onClickHandler();
  }

  return (
    <div className={styles.menuContainer}>
      {options.length && options.map(option => (
        <div onClick={() => onClickHandler(option)} className={styles.option}>
          <span className={cx(styles.icon, { [styles.activeOption]: isActive(option) })}><option.icon /></span>
          {isActive(option) && <span className={styles.title}>{option.name}</span>}
        </div>
      ))}
    </div>
  );
}

export default MenuFooter;