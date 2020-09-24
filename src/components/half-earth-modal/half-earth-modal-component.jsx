import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import GlobeImage from 'images/globe.png';
import GlobeSmallImage from 'images/globeSmall.png';
import { useMobile } from 'constants/responsive';
import ShareModalButton from 'components/share-button';
import ShareModal from 'components/share-modal';

import data from './half-earth-modal-data';

import styles from './half-earth-modal-styles.module.scss';

const HalfEarthModalComponent = ({ handleModalClose, textData }) => {
  const { legend } = data;

  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27)
      handleModalClose();
  };

  useEventListener('keydown', keyEscapeEventListener);

  const isOnMobile = useMobile();
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  return (
    <div className={styles.halfEarthModal}>
      <div className={styles.grid}>
        <h1 className={styles.title}>{textData && textData.title}</h1>
        <ReactMarkdown
          className={styles.description}
          source={textData && textData.content}
          escapeHtml={false}
        />
        {legend.map(({ value, label, imageSrc }) => (
          <div key={label} className={styles.legendItem}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
            <img src={imageSrc} className={styles.icon} alt={label} />
          </div>
        ))}
        <div className={styles.globeWrapper}>
          <div className={styles.progresBars}>
            <img
              src={isOnMobile ? GlobeSmallImage : GlobeImage}
              className={styles.globe}
              alt="Half-Earth globe"
            />
          </div>
        </div>
        <div className={styles.share}>
          <ShareModalButton
            variant="shortText"
            theme={{ shareButton: styles.shareButton }}
            setShareModalOpen={setShareModalOpen}
          />
          <ShareModal
            isOpen={isShareModalOpen}
            setShareModalOpen={setShareModalOpen}
          />
        </div>
      </div>
      <button className={styles.closeButton} onClick={handleModalClose}>
        <CloseIcon />
      </button>
    </div>
  );
}

export default HalfEarthModalComponent;
