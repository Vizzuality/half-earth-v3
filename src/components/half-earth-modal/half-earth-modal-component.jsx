import React from 'react';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as HalfEarthGlobe } from 'images/halfEarthGlobe.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import data from './half-earth-modal-data';

import styles from './half-earth-modal-styles.module.scss';

const HalfEarthModalComponent = ({ handleModalClose }) => {
  const { title, description, legend } = data;

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
          <h1>{title}</h1>
          <div className={styles.descriptionWrapper}>
            <div className={styles.description}>
              {description.map(text => <p>{text}</p>)}
            </div>
          </div>
          <div className={styles.legendWrapper}>
            {legend.map(({ value, label, imageSrc}) => (
              <div className={styles.legendItem}>
                <span className={styles.value}>{value}</span>
                <span className={styles.label}>{label}</span>
                <img src={imageSrc} className={styles.icon} alt={''}/>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.globeWrapper}>
          <HalfEarthGlobe className={styles.globe}/>
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
