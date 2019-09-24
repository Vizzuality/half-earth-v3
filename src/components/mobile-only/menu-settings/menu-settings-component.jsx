import React from 'react';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import styles from './menu-settings-styles.module.scss';

const MenuSettings = ({ options, isSettingsOpen }) => {

  return (
    <div className={cx(styles.container, { [styles.visible]: isSettingsOpen })}>
      {options && options.map(option => (
        <div className={styles.box} onClick={option.onClickHandler}>
          <span className={styles.title}>{option.name}</span>
          <ArrowExpandIcon />
        </div>
      ))}
    </div>
  )
}

export default MenuSettings;