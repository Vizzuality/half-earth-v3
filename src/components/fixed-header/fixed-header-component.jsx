import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import ShareModal from 'components/share-modal';
import styles from './fixed-header-styles.module.scss';

import { isMobile } from 'constants/responsive';

const BACK = 'BACK';

const differentFixedHeaderHeights = ['Existing protection', 'Human pressures'];

const FixedHeader = ({ closeSidebar, title, view, autoHeight, toggleCollapsedLandscapeSidebar, isLandscapeSidebarCollapsed, noBackClick = false }) => {
  const isHigherHeader = differentFixedHeaderHeights.includes(title);
  const flipToggleSwitch = noBackClick;

  const isOnMobile = isMobile();

  return (
    <div className={cx(styles.header,
      { [styles.higherHeader]: isHigherHeader},
      { [styles.autoHeightHeader]: autoHeight},
      { [styles.smallerPaddingLeft]: noBackClick })
    }>
      {!isOnMobile && <ShareModal theme={{ shareButton: styles.shareButton}} view={view} />}
      {!noBackClick && <button
        className={styles.button}
        onClick={closeSidebar}
      >
        <ArrowExpandIcon className={styles.icon} />
        <span className={styles.backButton}>{BACK}</span>
      </button>}
      <h1 className={styles.title}>
        { title && !autoHeight ? title.split(' ').map(word => <span key={word}>{word}</span>) : title }
        {flipToggleSwitch && <div onClick={toggleCollapsedLandscapeSidebar} className={cx(styles.flipToggleSwitchIcon, {
          [styles.collapsedFlipToggleSwitchIcon]: isLandscapeSidebarCollapsed
        })} />}
      </h1>
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