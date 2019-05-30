import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from 'icons/x.svg';

import styles from './about-styles.module.scss';
import MapInstructionsComponent from './map-instructions/map-instructions-component';

const About = () => {
  const [isAboutPageOpened, setAboutPageOpened] = useState(false);

  const handleOpenAboutPage = () => {
    setAboutPageOpened(true);
  };

  const handleCloseAboutPage = () => {
    setAboutPageOpened(false);
  };

  return (
    <>
      <button
        className={styles.aboutButton}
        onClick={handleOpenAboutPage}
      >
        About the Half-Earth map
      </button>
      {isAboutPageOpened && 
        <div className={styles.aboutPage}>
          <MapInstructionsComponent />
          <button 
            className={styles.closeButton}
            onClick={handleCloseAboutPage}
          >
            <CloseIcon />
          </button>
          ABOUT
        </div>
      }
    </>
  )
}

export default About;