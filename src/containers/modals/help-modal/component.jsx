import React from 'react';

import { useT } from '@transifex/react';

import { Modal } from 'he-components';
import { ReactComponent as GlobeIcon } from 'icons/globe.svg';
import { ReactComponent as LandscapeIcon } from 'icons/landscape.svg';
import { ReactComponent as PanMouseIcon } from 'icons/pan_mouse.svg';
import { ReactComponent as RotateMouseIcon } from 'icons/rotate_mouse.svg';
import { ReactComponent as ZoomMouseIcon } from 'icons/zoom_mouse.svg';

import styles from './styles.module';

function HelpModalComponent({ handleClose, isOpen }) {
  const t = useT();
  const title = t('How to navigate the map');

  const mouseClickLabels = {
    leftClick: t('ROTATE VIEW'),
    rightClick: t('PAN VIEW'),
    middleClick: t('ZOOM VIEW'),
  };

  const storyDescriptions = {
    firstStep: t(
      '1. At higher zoom levels, the map enables you to view datasets at a global scale.',
    ),
    secondstep: t(
      '2. Search for a place or zoom the globe manually to your desired location and the side panel will show fine detail at local scale.',
    ),
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.wrapper}>
          <span className={styles.title}>{title}</span>
          <div className={styles.mouseNavigationSection}>
            <div className={styles.mouseClickIcon}>
              <RotateMouseIcon />
              <span>{mouseClickLabels.leftClick}</span>
            </div>
            <div className={styles.mouseClickIcon}>
              <ZoomMouseIcon />
              <span>{mouseClickLabels.rightClick}</span>
            </div>
            <div className={styles.mouseClickIcon}>
              <PanMouseIcon />
              <span>{mouseClickLabels.middleClick}</span>
            </div>
          </div>
          <div className={styles.storySection}>
            <div className={styles.storyElement}>
              <GlobeIcon />
              <span>{storyDescriptions.firstStep}</span>
            </div>
            <div className={styles.storyElement}>
              <LandscapeIcon />
              <span>{storyDescriptions.secondstep}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default HelpModalComponent;
