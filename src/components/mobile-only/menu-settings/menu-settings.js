import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { SETTINGS_OPTIONS } from 'constants/mobile-only';

import pageTextsActions from 'redux_modules/page-texts/page-texts';
import * as urlActions from 'actions/url-actions';

import Partners from 'components/about/partners';
import MapInstructions from 'components/about/map-instructions/map-instructions-component';
import HalfEarthModal from 'components/half-earth-modal';
import Component from './menu-settings-component';

const actions = { ...pageTextsActions, ...urlActions };
const PARTNERS_TEXT_SLUG = 'partners';

const mapStateToProps = ({ pageTexts }) => ({
  textData: pageTexts.data[PARTNERS_TEXT_SLUG]
});

const MenuSettingsContainer = props => {
  const { setPageTexts, textData, isHEModalOpen, changeUI } = props;
  const [activeModal, setActiveModal] = useState(null);

  // take opened half earth modal from the url state
  useEffect(() => {
    if (isHEModalOpen) setActiveModal(HALF_EARTH_MODAL);
  }, []);

  const closeHEModal = () => { changeUI({ isHEModalOpen: false }) }

  const closeModal = () => { 
    if(activeModal === HALF_EARTH_MODAL) { closeHEModal() }
    setActiveModal(null) 
  };

  const { HALF_EARTH_MODAL, ABOUT_PARTNERS, ABOUT_INSTRUCTIONS } = SETTINGS_OPTIONS;

  const options = {
    [HALF_EARTH_MODAL]: {
      name: 'Monitoring progress towards the goal of half-earth',
      Component: HalfEarthModal,
      onClickHandler: () => {
        setActiveModal(HALF_EARTH_MODAL);
        changeUI({ isHEModalOpen: true });
      }
    },
    [ABOUT_PARTNERS]: {
      name: 'Partners',
      Component: Partners,
      onClickHandler: () => {
        setPageTexts(PARTNERS_TEXT_SLUG)
        setActiveModal(ABOUT_PARTNERS);
        closeHEModal()
      }
    },
    [ABOUT_INSTRUCTIONS]: {
      name: 'How to navigate the map',
      Component: MapInstructions,
      onClickHandler: () => { 
        setActiveModal(ABOUT_INSTRUCTIONS);
        closeHEModal()
      }
    }
  }

  return <Component 
    options={options}
    activeModal={activeModal}
    textData={textData}
    closeModal={closeModal} 
    {...props} />; 
}

export default connect(mapStateToProps, actions)(MenuSettingsContainer);