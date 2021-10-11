import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "he-components";
import cx from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ReactComponent as ShareIcon } from "icons/share.svg";
import { ReactComponent as CopyIcon } from "icons/copy.svg";

import styles from "./share-modal-styles.module";

const LINK = "link";
const EMBED = "embed";

const ShareModalComponent = ({ handleClose, isOpen, shareSocialMedia }) => {
  const [activeTab, setActiveTab] = useState(LINK);
  const [copied, setCopied] = useState({ [LINK]: false, [EMBED]: false });
  const [shareUrl, setShareUrl] = useState(null);

  const isActiveTabLink = activeTab === LINK;
  const currentLocation = window.location.href;

  const setTab = () => {
    setActiveTab(isActiveTabLink ? EMBED : LINK);
  };
  const resetFlags = () => setCopied({ [LINK]: false, [EMBED]: false });
  const setCopiedFlags = () => {
    isActiveTabLink
      ? setCopied({ [LINK]: true, [EMBED]: false })
      : setCopied({ [LINK]: false, [EMBED]: true });
  };

  useEffect(() => {
    const iframe = `<iframe id="map-iframe" src="${currentLocation}" />`;
    const urlCopy = activeTab === LINK ? currentLocation : iframe;
    setShareUrl(urlCopy);
  }, [activeTab]);

  // responsible for transitioning from COPIED text to COPY after some time
  useEffect(() => {
    const timer = setTimeout(resetFlags, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.iconBackground}>
          <ShareIcon />
        </div>
        <div className={styles.shareContent}>
          <div className={styles.title}>Share this page</div>
          <div className={styles.tabs}>
            <div
              className={cx(styles.tab, {
                [styles.activeTab]: isActiveTabLink,
              })}
              onClick={setTab}
            >
              {LINK}
            </div>
            <div
              className={cx(styles.tab, {
                [styles.activeTab]: !isActiveTabLink,
              })}
              onClick={setTab}
            >
              {EMBED}
            </div>
          </div>
          <div className={styles.copyContainer}>
            <input
              type="text"
              value={shareUrl}
              readOnly
              className={styles.inputButton}
            />
            <CopyToClipboard onCopy={setCopiedFlags} text={shareUrl}>
              <Button
                theme={{
                  button: cx(styles.button, styles.copyButton, {
                    [styles.copied]: copied[activeTab],
                  }),
                }}
              >
                <CopyIcon className={styles.copyIcon} />
                {copied[activeTab] ? "Copied!" : "Copy"}
              </Button>
            </CopyToClipboard>
          </div>
          <div className={styles.socialMediaContainer}>
            {shareSocialMedia.map((socialMedia) => (
              <button
                onClick={() =>
                  window.open(
                    `${socialMedia.link}${encodeURIComponent(currentLocation)}`
                  )
                }
                className={styles.iconBackground}
                key={socialMedia.alt}
              >
                <socialMedia.icon />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

ShareModalComponent.propTypes = {
  route: PropTypes.string,
  theme: PropTypes.shape({}),
};

ShareModalComponent.defaultProps = {
  route: "",
  theme: {},
};

export default ShareModalComponent;
