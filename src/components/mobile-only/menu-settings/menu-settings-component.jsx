import React from 'react';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import { FOOTER_OPTIONS, SETTINGS_OPTIONS } from 'constants/mobile-only';
import ShareModalButton from 'components/share-modal';

import styles from './menu-settings-styles.module.scss';

const MenuSettings = ({ options, activeOption, textData, activeModal, closeModal }) => {
  const isSettingsOpen = activeOption === FOOTER_OPTIONS.SETTINGS;
  const isHalfEarthModal = activeModal && activeModal === SETTINGS_OPTIONS.HALF_EARTH_MODAL;
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
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={closeModal}
            >
              <ArrowExpandIcon className={styles.icon} />
              <span className={styles.backButton}>BACK</span>
            </button>
            {isHalfEarthModal && 
              <div className={styles.share}>
                <span className={styles.shareText}>Share</span>
                <ShareModalButton />
              </div>
            }          
          </div>
          <Component textData={textData} />
        </div>}
    </>
  )
}

export default MenuSettings;  