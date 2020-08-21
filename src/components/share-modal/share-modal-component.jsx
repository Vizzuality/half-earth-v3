import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'he-components';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import cx from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import { getShortenUrl } from 'services/bitly';

import styles from './share-modal-styles.module';

const LINK = 'link';
const EMBED = 'embed';

const ShareModal = ({ handleClose, isOpen, shareSocialMedia }) => {
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

const ShareModalComponent = (props) => {
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const handleOpenShareModal = () => {
    const { openShareModalAnalyticsEvent, viewMode } = props;
    setShareModalOpen(true);
    openShareModalAnalyticsEvent(viewMode);
  }
  const handleCloseShareModal = () => setShareModalOpen(false);
  const { theme, shareText = false } = props;

  const tooltipId = {
    'data-tip': 'data-tip',
    'data-for': 'shareButtonId',
    'data-place': 'right',
    'data-effect':'solid',
    'data-delay-show': 0
  };

  const shareButton = (withClickAndTooltip) => {
    const tooltip = withClickAndTooltip ? {...tooltipId} : {};
    return (
      <button
        className={cx(theme.shareButton)}
        onClick={withClickAndTooltip ? handleOpenShareModal : (() => {})}
        {...tooltip}
      >
        <ShareIcon className={styles.icon} />
      </button>
    )
  }

  return (
    <>
      {shareText && (
        <div 
          className={styles.share}
          onClick={handleOpenShareModal}
          {...tooltipId}
        >
          <span className={styles.shareText}>Share</span>
          {shareButton(false)}
        </div>
      )}
      {!shareText && shareButton(true)}
      <ReactTooltip
        id='shareButtonId'
        className='infoTooltipStyle'
      >
        Click to share
      </ReactTooltip>
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
  theme: PropTypes.shape({
    shareButton: PropTypes.string
  })
};

ShareModalComponent.defaultProps = {
  route: '',
  theme: {}
};

export default ShareModalComponent;
