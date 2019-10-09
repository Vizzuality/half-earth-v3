import React from 'react';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import { FOOTER_OPTIONS } from 'constants/mobile-only';

import styles from './menu-settings-styles.module.scss';

const MenuSettings = ({ options, activeOption, textData, activeModal, closeModal }) => {
  const isSettingsOpen = activeOption === FOOTER_OPTIONS.SETTINGS;
  const Component = activeModal && options[activeModal].Component;
  return (
    <>
      <div className={cx(styles.container, { [styles.visible]: isSettingsOpen })}>
        {options && Object.values(options).map(option => (
          <div className={styles.box} onClick={option.onClickHandler}>
            <span className={styles.title}>{option.name}</span>
            <ArrowExpandIcon />
          </div>
        ))}
      </div>
      {isSettingsOpen && activeModal && 
        <div className={styles.modalWrapper}>
          <button
            className={styles.button}
            onClick={closeModal}
          >
            <ArrowExpandIcon className={styles.icon} />
            <span className={styles.backButton}>BACK</span>
          </button>
          <Component textData={textData} />
        </div>}
    </>
  )
}

export default MenuSettings;  