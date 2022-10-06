import React from 'react';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import { Modal } from 'he-components';

import styles from './styles.module';

import { ReactComponent as GlobeIcon } from 'icons/globe.svg';
import { ReactComponent as LandscapeIcon } from 'icons/landscape.svg';
import { ReactComponent as PanMouseIcon } from 'icons/pan_mouse.svg';
import { ReactComponent as RotateMouseIcon } from 'icons/rotate_mouse.svg';
import { ReactComponent as ZoomMouseIcon } from 'icons/zoom_mouse.svg';

function HelpModal({ handleClose, isOpen }) {
  const t = useT();
  const title = t('How to navigate the map');

  const mouseClickLabels = {
    leftClick: t('ROTATE VIEW'),
    rightClick: t('PAN VIEW'),
    middleClick: t('ZOOM VIEW'),
  };

  const storyTitles = {
    firstStep: t('Map Layers'),
    secondStep: t('Analyze Areas'),
  };

  const storyDescriptions = {
    firstStep: t(
      'At higher zoom levels, the map enables you to view datasets at a global scale.'
    ),
    secondStep: t(
      'Search for a place using the search bar at the bottom of the left-hand report card or find a country or region by manually zooming on the globe. Once selected, the left side panel will display fine detail at a local scale.'
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

HelpModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

HelpModal.defaultProps = {
  isOpen: false,
};

export default HelpModal;
