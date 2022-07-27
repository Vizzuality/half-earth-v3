import React, { useState } from 'react';
import AboutModal from './about-modal';

const AboutComponent = ({
  className,
  openAboutPageAnalyticsEvent,
  buttonContentComponent,
}) => {
  const [isAboutPageOpened, setAboutPageOpened] = useState(false);

  const handleOpenAboutPage = () => {
    setAboutPageOpened(true);
    openAboutPageAnalyticsEvent();
  };

  const handleCloseAboutPage = () => setAboutPageOpened(false);

  return (
    <>
      <button className={className} onClick={handleOpenAboutPage}>
        {buttonContentComponent}
      </button>
      {isAboutPageOpened && (
        <AboutModal handleCloseAboutPage={handleCloseAboutPage} />
      )}
    </>
  );
};

export default AboutComponent;
