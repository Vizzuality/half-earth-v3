import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ShareModal from 'components/share-modal';
import ShareModalButton from 'components/share-button';
import styles from './fixed-header-styles.module.scss';

import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';
import { useMobile } from 'constants/responsive';

const BACK = 'BACK';

const differentFixedHeaderHeights = ['Existing protection', 'Human pressures'];

const FixedHeader = ({ closeSidebar, title, handleTitleOptionClick, titleOptions, selectableTitle, autoHeight, toggleCollapsedLandscapeSidebar, isLandscapeSidebarCollapsed, noBackClick = false }) => {
  const isHigherHeader = differentFixedHeaderHeights.includes(title);
  const flipToggleSwitch = noBackClick;
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false)
  const isOnMobile = useMobile();
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div
      className={cx(
        styles.header,
        { [styles.higherHeader]: isHigherHeader },
        { [styles.autoHeightHeader]: autoHeight }
      )}
    >
      {!isOnMobile && (
        <>
          <ShareModalButton
            theme={{ shareButton: styles.shareButton }}
            setShareModalOpen={setShareModalOpen}
          />
          <ShareModal
            theme={{ shareButton: styles.shareButton }}
            isOpen={isShareModalOpen}
            setShareModalOpen={setShareModalOpen}
          />
        </>
      )}
      {!noBackClick && (
        <button className={styles.button} onClick={closeSidebar}>
          <div className={styles.icon} />
          <span className={styles.backButton}>{BACK}</span>
        </button>
      )}
      <div
        onClick={flipToggleSwitch ? toggleCollapsedLandscapeSidebar : () => {}}
        className={styles.titleContainer}
      >
        {title && !autoHeight
          ? title.split(' ').map((word) => <span key={word}>{word}</span>)
          : title}
        {flipToggleSwitch && (
          <div
            className={cx(styles.flipToggleSwitchIcon, {
              [styles.collapsedFlipToggleSwitchIcon]: isLandscapeSidebarCollapsed
            })}
          />
        )}
        {titleOptions && (
          <ChevronIcon
            onClick={() => setTitleDropdownOpen(!titleDropdownOpen)}
            className={cx(styles.optionsToggle, {
              [styles.openList]: titleDropdownOpen
            })}
          />
        )}
        {titleOptions && (
          <div className={styles.dropdownWrapper}>
            <ul
              className={cx(styles.titleOptionsList, {
                [styles.open]: titleDropdownOpen
              })}
            >
              {titleOptions.map((option) => {
                return (
                  <li
                    key={option.name}
                    className={styles.titleOptionItem}
                    onClick={() => handleTitleOptionClick(option)}
                  >
                    {option.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {title && <div className={styles.spacer} />}
    </div>
  );
};


FixedHeader.propTypes = {
  closeSidebar: PropTypes.func,
  title: PropTypes.string,
  autoHeight: PropTypes.bool
};

FixedHeader.defaultProps = {
  closeSidebar: () => {},
  title: '',
  autoHeight: false
};

export default FixedHeader;