/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useT, T } from '@transifex/react';

import PropTypes from 'prop-types';

import { removeURLParameter } from 'utils/url-utils';

import cx from 'classnames';

import styles from './styles.module';

import { ReactComponent as CopyIcon } from 'icons/copy.svg';

const LINK = 'link';
const EMBED = 'embed';

function ShareModalComponent({ setShareUrl, className, onShareCallback }) {
  const [activeTab, setActiveTab] = useState(LINK);
  const [sharePath, setSharePath] = useState(LINK);
  const [copied, setCopied] = useState({ [LINK]: false, [EMBED]: false });

  const t = useT();

  const isActiveTabLink = activeTab === LINK;

  useEffect(() => {
    const iframe = `<iframe id="map-iframe" src="${setShareUrl()}" />`;
    const urlCopy = activeTab === LINK ? setShareUrl() : iframe;
    setSharePath(removeURLParameter(urlCopy, 'lang'));
  }, [activeTab]);

  const setTab = () => {
    setActiveTab(isActiveTabLink ? EMBED : LINK);
  };
  const resetFlags = () => setCopied({ [LINK]: false, [EMBED]: false });
  const setCopiedFlags = () => {
    if (isActiveTabLink) {
      setCopied({ [LINK]: true, [EMBED]: false });
    } else {
      setCopied({ [LINK]: false, [EMBED]: true });
    }
  };

  const handleCopyEvent = () => {
    onShareCallback();
    setCopiedFlags();
  };

  // responsible for transitioning from COPIED text to COPY after some time
  useEffect(() => {
    const timer = setTimeout(resetFlags, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className={cx(styles.shareContent, className)}>
      <div className={styles.tabs}>
        <div
          role="button"
          tabIndex={0}
          className={cx(styles.tab, {
            [styles.activeTab]: isActiveTabLink,
          })}
          onClick={setTab}
        >
          {t(LINK)}
        </div>
        <div
          role="button"
          tabIndex={0}
          className={cx(styles.tab, {
            [styles.activeTab]: !isActiveTabLink,
          })}
          onClick={setTab}
        >
          {t(EMBED)}
        </div>
      </div>
      <div className={styles.copyContainer}>
        <input
          type="text"
          value={sharePath}
          readOnly
          className={styles.inputButton}
        />
        <CopyToClipboard onCopy={handleCopyEvent} text={sharePath}>
          <button
            type="button"
            className={cx(styles.button, styles.copyButton, {
              [styles.copied]: copied[activeTab],
            })}
          >
            <CopyIcon className={styles.copyIcon} />
            {copied[activeTab] ? <T _str="Copied!" /> : <T _str="Copy" />}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

ShareModalComponent.propTypes = {
  setShareUrl: PropTypes.func,
  onShareCallback: PropTypes.func,
};

ShareModalComponent.defaultProps = {
  onShareCallback: () => {},
  setShareUrl: () => {},
};

export default ShareModalComponent;
