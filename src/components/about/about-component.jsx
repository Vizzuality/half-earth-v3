import React, { useState } from 'react';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import PartnersComponent from './partners/partners';
import MapInstructionsComponent from './map-instructions/map-instructions-component';

import styles from './about-styles.module.scss';

const AboutPage = ({ handleCloseAboutPage, textData }) => {
  const [isPartnersActive, setPartnersActive] = useState(true);

  const keyEscapeEventListener = (evt) => {
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
        { isPartnersActive ? <PartnersComponent textData={textData}/> : <MapInstructionsComponent />}
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

const AboutComponent = ({ setPageTexts, textData, VIEW  }) => {
  const [isAboutPageOpened, setAboutPageOpened] = useState(false);

  const handleOpenAboutPage = () => {
    setPageTexts(VIEW);
    setAboutPageOpened(true);
  }
  const handleCloseAboutPage = () => setAboutPageOpened(false);

  return (
    <>
      <button
        className={styles.aboutButton}
        onClick={handleOpenAboutPage}
      >
        About the Half-Earth map
      </button>
      {isAboutPageOpened && <AboutPage handleCloseAboutPage={handleCloseAboutPage} textData={textData} />}
    </>
  );
}

export default AboutComponent;