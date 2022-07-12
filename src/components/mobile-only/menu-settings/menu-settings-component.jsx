import React, { useState } from 'react';
import { useT } from '@transifex/react';

import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import { FOOTER_OPTIONS, SETTINGS_OPTIONS } from 'constants/mobile-only';
import ShareModal from 'components/share-modal';
import ShareModalButton from 'components/share-button';

import styles from './menu-settings-styles.module.scss';

const MenuSettings = ({
  options,
  activeOption,
  textData,
  activeModal,
  closeModal,
}) => {
  const t = useT();
  const isSettingsOpen = activeOption === FOOTER_OPTIONS.SETTINGS;
  const isHalfEarthModal =
    activeModal && activeModal === SETTINGS_OPTIONS.HALF_EARTH_MODAL;
  const Component = activeModal && options[activeModal].Component;
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  return (
    <>
      <div
        className={cx(styles.container, { [styles.visible]: isSettingsOpen })}
      >
        {options &&
          Object.values(options).map((option) => (
            <div
              key={option.name}
              className={styles.box}
              onClick={option.onClickHandler}
            >
              <span className={styles.title}>{option.name}</span>
              <ArrowExpandIcon />
            </div>
          ))}
      </div>
      {isSettingsOpen && activeModal && (
        <div className={styles.modalWrapper}>
          <div className={styles.buttonsContainer}>
            <button className={styles.button} onClick={closeModal}>
              <ArrowExpandIcon className={styles.icon} />
              <span className={styles.backButton}>{t('BACK')}</span>
            </button>
            {isHalfEarthModal && (
              <>
                <ShareModalButton
                  variant="shortText"
                  theme={{ shareButton: styles.shareButton }}
                  setShareModalOpen={setShareModalOpen}
                />
                <ShareModal
                  isOpen={isShareModalOpen}
                  setShareModalOpen={setShareModalOpen}
                />
              </>
            )}
          </div>
          <Component textData={textData} />
        </div>
      )}
    </>
  );
};

export default MenuSettings;
