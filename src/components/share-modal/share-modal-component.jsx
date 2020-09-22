import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'he-components';
import cx from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getShortenUrl } from 'services/bitly';

import styles from './share-modal-styles.module';

const LINK = 'link';
const EMBED = 'embed';

const ShareModalComponent = ({ handleClose, isOpen, shareSocialMedia }) => {
  const [activeTab, setActiveTab] = useState(LINK);
  const [copied, setCopied] = useState({ [LINK]: false, [EMBED]: false });
  const [shortLink, setShortLink] = useState(null);
  const [shareUrl, setShareUrl] = useState(null);

  const isActiveTabLink = activeTab === LINK;
  const currentLocation = window.location.href;

  const setTab = () => {
    setActiveTab(isActiveTabLink ? EMBED : LINK);
  }
  const resetFlags = () => setCopied({ [LINK]: false, [EMBED]: false });
  const setCopiedFlags = () => {
    isActiveTabLink ? setCopied({ [LINK]: true, [EMBED]: false }) : setCopied({ [LINK]: false, [EMBED]: true });
  }

  // Use bitly service to get a short link
  useEffect(() => {
    getShortenUrl(currentLocation)
    .then(link => {
      setShortLink(link);
    })
  }, [])

  useEffect(() => {
    if (shortLink) {
      const iframe = `<iframe id="map-iframe" src="${currentLocation}" />`;
      const urlCopy = activeTab === LINK ? shortLink : iframe;
      setShareUrl(urlCopy);
    }
  },[shortLink, activeTab])

  // responsible for transitioning from COPIED text to COPY after some time
  useEffect(() => {
    const timer = setTimeout(resetFlags, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

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
        <input type="text" value={shareUrl} readOnly className={styles.inputButton} />
        <CopyToClipboard onCopy={setCopiedFlags} text={shareUrl}>
          <Button theme={{ button: cx(styles.button, styles.copyButton, { [styles.copied]: copied[activeTab] } ) }}>
            <span className={cx({[styles.copiedText]: copied[activeTab]})}>{copied[activeTab] ? 'copied!': 'copy'}</span>
          </Button>
        </CopyToClipboard>
      </div>
      <div className={styles.socialMediaContainer}>
        {shareSocialMedia.map(socialMedia => (
          <button
            onClick={() => window.open(`${socialMedia.link}${encodeURIComponent(shortLink)}`)}
            className={styles.iconBackground}
            key={socialMedia.alt}
          >
            <img src={socialMedia.icon} alt={socialMedia.alt} />
          </button>
        ))}
      </div>
    </Modal>
  );
}

ShareModalComponent.propTypes = {
  route: PropTypes.string,
  theme: PropTypes.shape({})
};

ShareModalComponent.defaultProps = {
  route: '',
  theme: {}
};

export default ShareModalComponent;
