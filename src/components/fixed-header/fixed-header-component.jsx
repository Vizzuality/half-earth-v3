import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ShareModal from 'components/share-modal';
import styles from './fixed-header-styles.module.scss';

import { ReactComponent as ChevronIcon } from 'icons/arrow_right.svg';
import { isMobile } from 'constants/responsive';

const BACK = 'BACK';

const differentFixedHeaderHeights = ['Existing protection', 'Human pressures'];

const FixedHeader = ({ closeSidebar, title, view, titleOptions, selectableTitle, autoHeight, toggleCollapsedLandscapeSidebar, isLandscapeSidebarCollapsed, noBackClick = false }) => {
  const isHigherHeader = differentFixedHeaderHeights.includes(title);
  const flipToggleSwitch = noBackClick;
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false)
  const isOnMobile = isMobile();

  return (
    <div className={cx(styles.header,
      { [styles.higherHeader]: isHigherHeader},
      { [styles.autoHeightHeader]: autoHeight}
    )}>
      {!isOnMobile && <ShareModal theme={{ shareButton: styles.shareButton}} />}
      {!noBackClick && <button
        className={styles.button}
        onClick={closeSidebar}
      >
        <div className={styles.icon} />
        <span className={styles.backButton}>{BACK}</span>
      </button>}
      <div onClick={flipToggleSwitch ? toggleCollapsedLandscapeSidebar : (() => {})} className={styles.titleContainer}>
        { title && !autoHeight ? title.split(' ').map(word => <span key={word}>{word}</span>) : title }
        {flipToggleSwitch && <div className={cx(styles.flipToggleSwitchIcon, {
          [styles.collapsedFlipToggleSwitchIcon]: isLandscapeSidebarCollapsed
        })} />}
      {titleOptions && <ChevronIcon onClick={() => setTitleDropdownOpen(!titleDropdownOpen)} className={cx(styles.optionsToggle, {[styles.openList]: titleDropdownOpen})}/>}
      {titleOptions &&
        <ul className={cx(styles.titleOptionsList, { [styles.open]: titleDropdownOpen})}>
        {titleOptions.map( option => {
          return <li className={styles.titleOptionItem} onClick={() => console.log(option)}>{option}</li>
        })}
        </ul>
      }
      </div>
      {title && <div className={styles.spacer} />}
    </div>
  )
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