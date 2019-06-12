import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'he-components';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import facebookIcon from 'icons/facebook.png';
import twitterIcon from 'icons/twitter.png';
import cx from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './share-modal-styles.module';

const LINK = 'link';
const EMBED = 'embed';

const ShareModal = ({ handleClose, isOpen, route, shareSocialMedia, coordinates }) => {
  const [activeTab, setActiveTab] = useState(LINK);
  const [copied, setCopied] = useState({ [LINK]: false, [EMBED]: false });

  const isActiveTabLink = activeTab === LINK;
  
  const setTab = () => {
    setActiveTab(isActiveTabLink ? EMBED : LINK);
  }
  
  const currentLocation = window.location.href;
  
  const embed = `<iframe id="map-iframe" src="${currentLocation}" />`;

  const urlCopy = activeTab === LINK ? currentLocation : embed;

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.title}>Share this page</div>
      <div className={styles.tabs}>
        <div className={cx(styles.tab, {[styles.activeTab]: isActiveTabLink})} onClick={setTab}>
          {LINK}
        </div>
        <div className={cx(styles.tab, {[styles.activeTab]: !isActiveTabLink})} onClick={setTab}>
          {EMBED}
        </div>
      </div>
      <div className={styles.copyContainer}>
        <input type="text" value={urlCopy} readOnly className={styles.inputButton} />
        <CopyToClipboard text={urlCopy}>
          <Button onClick={isActiveTabLink ? setCopied({ [LINK]: true, [EMBED]: false }) : setCopied({ [LINK]: false, [EMBED]: true })} theme={{ button: cx(styles.button, styles.copyButton) }}>
            {copied[activeTab] ? 'copied!': 'copy'}
          </Button>
        </CopyToClipboard>
      </div>
      <div className={styles.coordinates}>
        <p>coordinates: [{coordinates[0].toFixed(3)}, {coordinates[1].toFixed(3)}]</p>
      </div>
      <div className={styles.socialMediaContainer}>
        {shareSocialMedia.map(socialMedia => (
          <Button
            onClick={() => window.open(`${socialMedia.link}${currentLocation}`)}
            theme={{
              button: cx(styles.iconBackground, {
                [styles.facebookIcon]: socialMedia.className === 'facebookIcon'
              })
            }}
            key={socialMedia.className}
          >
          <img src={socialMedia.className === 'facebookIcon' ? facebookIcon : twitterIcon} />
          </Button>
        ))}
      </div>
    </Modal>
  );
}

const ShareModalComponent = (props) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleOpenShareModal = () => setShareModalOpen(true);
  const handleCloseShareModal = () => setShareModalOpen(false);
  const { theme } = props;

  return (
    <>
      <button
        className={cx(theme.shareButton)}
        onClick={handleOpenShareModal}
      >
        <ShareIcon />
      </button>
      {isShareModalOpen && <ShareModal 
        isOpen={isShareModalOpen}
        handleClose={handleCloseShareModal}
        {...props}
      />}
    </>
  );
}

ShareModalComponent.propTypes = {
  shareSocialMedia: PropTypes.array.isRequired,
  route: PropTypes.string,
  coordinates: PropTypes.array.isRequired,
  theme: PropTypes.shape({
    shareButton: PropTypes.string
  })
};

ShareModalComponent.defaultProps = {
  route: '',
  theme: {}
};

export default ShareModalComponent;
