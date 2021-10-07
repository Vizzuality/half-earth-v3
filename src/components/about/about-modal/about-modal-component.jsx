import React, { useState } from "react";
import ReactDOM from "react-dom";
import useEventListener from "hooks/use-event-listener";
import { ReactComponent as CloseIcon } from "icons/close.svg";
import PartnersComponent from "../partners/partners";
import MapInstructionsComponent from "../map-instructions/map-instructions-component";
import { ABOUT_TABS } from "constants/ui-params";

import styles from "../about-styles.module.scss";

const tabsData = {
  [ABOUT_TABS.PARTNERS]: {
    slug: ABOUT_TABS.PARTNERS,
    text: "PARTNERS",
    Component: PartnersComponent,
  },
  [ABOUT_TABS.INSTRUCTIONS]: {
    slug: ABOUT_TABS.INSTRUCTIONS,
    text: "MAP INSTRUCTIONS",
    Component: MapInstructionsComponent,
  },
};

const AboutPage = ({ handleCloseAboutPage }) => {
  const [activeTab, setActiveTab] = useState(ABOUT_TABS.PARTNERS);

  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27) handleCloseAboutPage();
  };

  useEventListener("keydown", keyEscapeEventListener);

  const changeActiveTab = (ACTIVE_TAB) => {
    if (ACTIVE_TAB !== activeTab) {
      setActiveTab(ACTIVE_TAB);
    }
  };

  const renderTabComponent = () => {
    const { Component } = tabsData[activeTab];
    return <Component />;
  };

  const renderAboutPage = (
    <div className={styles.aboutPage}>
      <div className={styles.navbar}>
        <div className={styles.tabsSwitch}>
          {Object.keys(tabsData).map((key, index) => (
            <button
              key={key}
              className={key === activeTab ? styles.active : ""}
              onClick={() => changeActiveTab(key)}
            >
              {tabsData[key].text}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.content}>{renderTabComponent()}</div>
      <button className={styles.closeButton} onClick={handleCloseAboutPage}>
        <CloseIcon />
      </button>
    </div>
  );

  return ReactDOM.createPortal(
    renderAboutPage,
    document.getElementById("root")
  );
};

export default AboutPage;
