import React from 'react';
import { ReactComponent as MouseRightClickIcon } from 'icons/mouseRightClick.svg';
import { ReactComponent as MouseMiddleClickIcon } from 'icons/mouseMiddleClick.svg';
import { ReactComponent as GlobeIcon } from 'icons/globe.svg';
import { ReactComponent as LandscapeIcon } from 'icons/landscape.svg';
import { useT } from '@transifex/react';

import styles from './map-instructions-styles.module.scss';

const MouseNavigatonSection = () => {
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
};

const StorySection = () => {
  const t = useT();
  const storyDescriptions = {
    firstStep: t(
      '1. At higher zoom levels, the map enables you to view datasets at a global scale.'
    ),
    secondstep: t(
      '2. Search for a place or zoom the globe manually to your desired location and the side panel will show fine detail at local scale.'
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
};

const MapInstructionsComponent = () => {
  const t = useT();
  const title = t('How to navigate the map');

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <MouseNavigatonSection />
      <StorySection />
    </div>
  );
};

export default MapInstructionsComponent;
