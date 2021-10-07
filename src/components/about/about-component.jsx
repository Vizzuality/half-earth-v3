import React, { useState } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import AboutModal from "./about-modal";
import { openAboutPageAnalyticsEvent } from "actions/google-analytics-actions";

const actions = { openAboutPageAnalyticsEvent };

const AboutComponent = ({
  className,
  setPageTexts,
  VIEW,
  openAboutPageAnalyticsEvent,
  buttonContentComponent,
}) => {
  const [isAboutPageOpened, setAboutPageOpened] = useState(false);

  const handleOpenAboutPage = () => {
    setPageTexts(VIEW);
    setAboutPageOpened(true);
    openAboutPageAnalyticsEvent();
  };

  const handleCloseAboutPage = () => setAboutPageOpened(false);
  return (
    <>
      <button className={className} onClick={handleOpenAboutPage}>
        {buttonContentComponent || "About the Half-Earth map"}
      </button>
      {isAboutPageOpened && (
        <AboutModal handleCloseAboutPage={handleCloseAboutPage} />
      )}
    </>
  );
};

export default connect(null, actions)(AboutComponent);
