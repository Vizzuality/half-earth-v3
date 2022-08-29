import React from 'react';

import { useT } from '@transifex/react';

import { Modal } from 'he-components';
import { ReactComponent as GlobeIcon } from 'icons/globe.svg';
import { ReactComponent as LandscapeIcon } from 'icons/landscape.svg';
import { ReactComponent as MouseMiddleClickIcon } from 'icons/mouseMiddleClick.svg';
import { ReactComponent as MouseRightClickIcon } from 'icons/mouseRightClick.svg';

import styles from './styles.module';

function MouseNavigatonSection() {
  const t = useT();
  const mouseClickLabels = {
    leftClick: t('ROTATE VIEW'),
    rightClick: t('PAN VIEW'),
    middleClick: t('ZOOM VIEW'),
  };

  return (
    <div className={styles.mouseNavigationSection}>
      <div className={styles.mouseClickIcon}>
        <MouseRightClickIcon className={styles.horizontalFlip} />
        <span>{mouseClickLabels.leftClick}</span>
      </div>
      <div className={styles.mouseClickIcon}>
        <MouseRightClickIcon />
        <span>{mouseClickLabels.rightClick}</span>
      </div>
      <div className={styles.mouseClickIcon}>
        <MouseMiddleClickIcon />
        <span>{mouseClickLabels.middleClick}</span>
      </div>
    </div>
  );
}

function StorySection() {
  const t = useT();
  const storyDescriptions = {
    firstStep: t(
      '1. At higher zoom levels, the map enables you to view datasets at a global scale.',
    ),
    secondstep: t(
      '2. Search for a place or zoom the globe manually to your desired location and the side panel will show fine detail at local scale.',
    ),
  };

  return (
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
  );
}

function HelpModalComponent({ handleClose, isOpen }) {
  const t = useT();
  const title = t('How to navigate the map');
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.wrapper}>
          <span className={styles.title}>{title}</span>
          <MouseNavigatonSection />
          <StorySection />
        </div>
      </div>
    </Modal>
  );
}

export default HelpModalComponent;
