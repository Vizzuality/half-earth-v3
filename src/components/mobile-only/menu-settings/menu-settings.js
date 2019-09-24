import React from 'react';
import { connect } from 'react-redux';

import { ABOUT_TABS } from 'constants/google-analytics-constants';
import * as actions from 'actions/url-actions';

import Component from './menu-settings-component';


const MenuSettingsContainer = props => {
  const { isHalfEarthMeterModalOpen, isAboutOpen } = props;
  
  const handleHalfEarthMeterModalOpen = () => { if (!isHalfEarthMeterModalOpen) props.changeUI({ isHalfEarthMeterModalOpen: true }); }
  const handleHalfEarthMeterModalClose = () => { if (isHalfEarthMeterModalOpen) props.changeUI({ isHalfEarthMeterModalOpen: false }); }

  const handleAboutPartnertsModalOpen = () => {
    props.changeUI({ activeAboutSection: ABOUT_TABS.PARTNERS })
    props.changeUI({ isAboutOpen: true })
  }

  const handleNavigationModalOpen = () => {
    props.changeUI({ activeAboutSection: ABOUT_TABS.INSTRUCTIONS })
    props.changeUI({ isAboutOpen: true })
  }

  const handleAboutModalClose = () => {
    if (isAboutOpen) { props.changeUI({ isAboutOpen: false }) }
  }

  const options = [
    { 
      name: 'Monitoring progress towards the goal of half-earth',
      onClickHandler: () => {
        handleAboutModalClose();
        handleHalfEarthMeterModalOpen();
      }
    },
    {
      name: 'Partners',
      onClickHandler: () => {
        handleHalfEarthMeterModalClose();
        handleAboutPartnertsModalOpen();
      }
    },
    {
      name: 'How to navigate the map',
      onClickHandler: () => {
        handleHalfEarthMeterModalClose();
        handleNavigationModalOpen();
      }
    }
  ]

  return <Component options={options} {...props} />; 
}

export default connect(null, actions)(MenuSettingsContainer);