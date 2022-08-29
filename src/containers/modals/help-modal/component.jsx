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

  const storyTitles = {
    firstStep: t(
      'Map Layers',
    ),
    secondStep: t(
      'Analyze Areas',
    ),
  };

  const storyDescriptions = {
    firstStep: t(
      'Explore different datasets at a global scale, from biodiversity patterns to human pressures.',
    ),
    secondStep: t(
      'Select an area to analyze and the side panel will show fine detail at local scale.',
    ),
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
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
          </div>
          <div className={styles.storySection}>
            <div className={styles.storyElement}>
              <GlobeIcon />

              <div className={styles.storyText}>
                <h3 className={styles.storyTitle}>{storyTitles.firstStep}</h3>
                <p>{storyDescriptions.firstStep}</p>
              </div>
            </div>
            <div className={styles.storyElement}>
              <LandscapeIcon />

              <div className={styles.storyText}>
                <h3 className={styles.storyTitle}>{storyTitles.secondStep}</h3>
                <p>{storyDescriptions.secondStep}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default HelpModalComponent;
