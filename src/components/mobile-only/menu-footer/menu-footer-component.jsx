import React from 'react';
import cx from 'classnames';
import styles from './menu-footer-styles.module';

const MenuFooter = ({ options, activeOption, featured = false }) => {
  const isActive = (o) => activeOption && o.key === activeOption; 

  return (
    <div className={styles.menuContainer}>
      {options.length && options.map(option => (
        <div onClick={option.onClickHandler} className={cx(styles.option, { [styles.activeOptionContainer]: isActive(option) })}>
          <option.icon className={styles.icon}/>
          <span className={styles.title}>{option.name}</span>
        </div>
      ))}
    </div>
  );
}

export default MenuFooter;