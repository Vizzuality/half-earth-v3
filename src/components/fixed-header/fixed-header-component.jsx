/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import ShareModalButton from 'components/share-button';
import ShareModal from 'components/share-modal';

import { useMobile } from 'constants/responsive';

import styles from './fixed-header-styles.module.scss';

const differentFixedHeaderHeights = ['Protection', 'Human pressures'];

function FixedHeader({
  closeSidebar,
  title,
  autoHeight,
  toggleCollapsedLandscapeSidebar,
  noBackClick = false,
}) {
  const t = useT();
  const isHigherHeader = differentFixedHeaderHeights.includes(title);
  const flipToggleSwitch = noBackClick;
  const isOnMobile = useMobile();
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div
      className={cx(
        styles.header,
        { [styles.higherHeader]: isHigherHeader },
        { [styles.autoHeightHeader]: autoHeight },
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
        <button type="button" className={styles.button} onClick={closeSidebar}>
          <div className={styles.icon} />
          <span className={styles.backButton}>{t('BACK')}</span>
        </button>
      )}
      <div
        role="button"
        tabIndex={0}
        onClick={flipToggleSwitch ? toggleCollapsedLandscapeSidebar : () => {}}
        className={styles.titleContainer}
      >
        {title && !autoHeight
          ? title.split(' ').map((word) => <span key={word}>{word}</span>)
          : title}
        {flipToggleSwitch && (
          <div className={cx(styles.flipToggleSwitchIcon)} />
        )}
      </div>
      {title && <div className={styles.spacer} />}
    </div>
  );
}

FixedHeader.propTypes = {
  closeSidebar: PropTypes.func,
  title: PropTypes.string,
  autoHeight: PropTypes.bool,
};

FixedHeader.defaultProps = {
  closeSidebar: () => {},
  title: '',
  autoHeight: false,
};

export default FixedHeader;
