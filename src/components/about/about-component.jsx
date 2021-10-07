import React, { useState } from "react";
import cx from "classnames";
import { connect } from "react-redux";
import AboutModal from "./about-modal";
import { openAboutPageAnalyticsEvent } from "actions/google-analytics-actions";

import styles from "./about-styles.module.scss";

const actions = { openAboutPageAnalyticsEvent };

const AboutComponent = ({
  className,
  setPageTexts,
  VIEW,
  openAboutPageAnalyticsEvent,
  buttonContentComponent,
  overrideButtonStyles,
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
      <button
        className={cx(
          {
            [styles.aboutButton]: !overrideButtonStyles,
          },
          className
        )}
        onClick={handleOpenAboutPage}
      >
        {buttonContentComponent || "About the Half-Earth map"}
      </button>
      {isAboutPageOpened && (
        <AboutModal handleCloseAboutPage={handleCloseAboutPage} />
      )}
    </>
  );
};

export default connect(null, actions)(AboutComponent);
