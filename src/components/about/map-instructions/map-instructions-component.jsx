import React from 'react';
import { ReactComponent as MouseRightClickIcon } from 'icons/mouseRightClick.svg';
import { ReactComponent as MouseMiddleClickIcon } from 'icons/mouseMiddleClick.svg';
import { ReactComponent as GlobeIcon } from 'icons/globe.svg';
import { ReactComponent as LandscapeIcon } from 'icons/landscape.svg';

import styles from './map-instructions-styles.module.scss';

const title = 'How to navigate the map';

const mouseClickLabels = {
  leftClick: 'ROTATE VIEW',
  rigthClick: 'PAN VIEW',
  middleClick: 'ZOOM VIEW'
};

const storyDescriptions = {
  firstStep: '1. At higher zoom levels, the map enables you to view datasets at a global scale.',
  secondstep: '2. Search for a place or zoom the globe manually to your desired location and the side panel will show fine detail at local scale.'
};

const MouseNavigatonSection = () => (
  <div className={styles.mouseNavigationSection}>
    <div className={styles.mouseClickIcon}>
      <MouseRightClickIcon className={styles.horizontalFlip}/>
      <span>{mouseClickLabels.leftClick}</span>
    </div>
    <div className={styles.mouseClickIcon}>
      <MouseRightClickIcon />
      <span>{mouseClickLabels.rigthClick}</span>
    </div>
    <div className={styles.mouseClickIcon}>
      <MouseMiddleClickIcon />
      <span>{mouseClickLabels.middleClick}</span>
    </div>
  </div>
);

const StorySection = () => (
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

const MapInstructionsComponent = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <MouseNavigatonSection />
      <StorySection />
    </div>
  )
}

export default MapInstructionsComponent;
