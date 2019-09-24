import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useEventListener from 'hooks/use-event-listener';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import PartnersComponent from './partners/partners';
import MapInstructionsComponent from './map-instructions/map-instructions-component';
import { openAboutPageAnalyticsEvent, switchAboutPageTabAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
import { ABOUT_TABS } from 'constants/google-analytics-constants';

import styles from './about-styles.module.scss';

const actions = { openAboutPageAnalyticsEvent, switchAboutPageTabAnalyticsEvent, ...urlActions };

const AboutPage = ({ handleCloseAboutPage, tabsData, switchAboutPageTabAnalyticsEvent, activeSection = ABOUT_TABS.PARTNERS }) => {
  const [activeTab, setActiveTab] = useState(activeSection);

  const keyEscapeEventListener = (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27)
      handleCloseAboutPage();
  };

  useEventListener('keydown', keyEscapeEventListener);

  const changeActiveTab = (ACTIVE_TAB) => {
    if(ACTIVE_TAB !== activeTab) {
      setActiveTab(ACTIVE_TAB);
      switchAboutPageTabAnalyticsEvent({ activeTab: ACTIVE_TAB });
    }
  }

  const renderTabComponent = () => {
    const { Component, textData } = tabsData[activeTab];
    return <Component textData={textData} />
  }

  return (
    <div className={styles.aboutPage}>
      <div className={styles.navbar}>
        <div  className={styles.tabsSwitch}>
          {Object.keys(tabsData).map((key, index) => (
            <button
              key={key}
              className={key === activeTab ? styles.active : ''}
              onClick={() => changeActiveTab(key)}
            >
              {tabsData[key].text}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        {renderTabComponent()}
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

const AboutComponent = ({ setPageTexts, textData, VIEW , openAboutPageAnalyticsEvent, switchAboutPageTabAnalyticsEvent, activeSection, isAboutOpen = false, changeUI }) => {
  const [isAboutPageOpened, setAboutPageOpened] = useState(isAboutOpen);

  useEffect(() => {
    if (isAboutOpen) { handleOpenAboutPage() }
  }, [isAboutOpen, activeSection])

  const handleOpenAboutPage = () => {
    setPageTexts(VIEW);
    setAboutPageOpened(true);
    openAboutPageAnalyticsEvent();
  }
  const handleCloseAboutPage = () => { changeUI({ isAboutOpen: false }); setAboutPageOpened(false); }

  const tabsData = {
    [ABOUT_TABS.PARTNERS]: {
      slug: ABOUT_TABS.PARTNERS,
      text: 'PARTNERS',
      Component: PartnersComponent,
      textData: textData
    },
    [ABOUT_TABS.INSTRUCTIONS]: {
      slug: ABOUT_TABS.INSTRUCTIONS,
      text: 'MAP INSTRUCTIONS',
      Component: MapInstructionsComponent
    }
  };

  return (
    <>
      <button
        className={styles.aboutButton}
        onClick={handleOpenAboutPage}
      >
        About the Half-Earth map
      </button>
      {isAboutPageOpened && (
        <AboutPage
          handleCloseAboutPage={handleCloseAboutPage}
          tabsData={tabsData} 
          switchAboutPageTabAnalyticsEvent={switchAboutPageTabAnalyticsEvent}
          activeSection={activeSection}
          />
      )}
    </>
  );
}

export default connect(null, actions)(AboutComponent);