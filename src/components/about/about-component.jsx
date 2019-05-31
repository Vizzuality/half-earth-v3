import React, { useState } from 'react';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import PartnersComponent from './partners/partners-component';
import MapInstructionsComponent from './map-instructions/map-instructions-component';

import styles from './about-styles.module.scss';

const AboutPage = ({ handleCloseAboutPage }) => {
  const [isPartnersActive, setPartnersActive] = useState(true);

  const keyEscapeEventListener = (evt) => {
    console.log('keyEscapeEventListener')
    evt = evt || window.event;
    if (evt.keyCode === 27)
      handleCloseAboutPage();
  };

  useEventListener('keydown', keyEscapeEventListener);

  return (
    <div className={styles.aboutPage}>
      <div className={styles.navbar}>
        <div  className={styles.tabsSwitch}>
          <button className={isPartnersActive ? styles.active : ''} onClick={() => setPartnersActive(true)}>PARTNERS</button>
          <button className={!isPartnersActive ? styles.active : ''} onClick={() => setPartnersActive(false)}>MAP INSTRUCTIONS</button>
        </div>
      </div>
      <div className={styles.content}>
        { isPartnersActive ? <PartnersComponent /> : <MapInstructionsComponent />}
      </div>
      <button 
        className={styles.closeButton}
        onClick={handleCloseAboutPage}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

const AboutComponent = () => {
  const [isAboutPageOpened, setAboutPageOpened] = useState(false);

  const handleOpenAboutPage = () => setAboutPageOpened(true);
  const handleCloseAboutPage = () => setAboutPageOpened(false);

  return (
    <>
      <button
        className={styles.aboutButton}
        onClick={handleOpenAboutPage}
      >
        About the Half-Earth map
      </button>
      {isAboutPageOpened && <AboutPage handleCloseAboutPage={handleCloseAboutPage} />}
    </>
  );
}

export default AboutComponent;