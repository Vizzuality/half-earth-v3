import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import GlobeImage from 'images/globe.png';

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

  return (
    <div className={styles.halfEarthModal}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1 className={styles.title}>{textData && textData.title}</h1>
            <ReactMarkdown
              className={styles.description}
              source={textData && textData.content}
              escapeHtml={false}
            />
          <div className={styles.legendWrapper}>
            {legend.map(({ value, label, imageSrc}) => (
              <div key={label} className={styles.legendItem}>
                <span className={styles.value}>{value}</span>
                <span className={styles.label}>{label}</span>
                <img src={imageSrc} className={styles.icon} alt={label}/>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.globeWrapper}>
          <div className={styles.progresBars}>
            <img src={GlobeImage} className={styles.globe} alt="Half-Earth globe" />
          </div>
        </div>
      </div>
      <button
        className={styles.closeButton}
        onClick={handleModalClose}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export default HalfEarthModalComponent;
