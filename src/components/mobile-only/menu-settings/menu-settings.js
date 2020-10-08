import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { SETTINGS_OPTIONS } from 'constants/mobile-only';
import { MODALS } from 'constants/ui-params';

import * as urlActions from 'actions/url-actions';

import Partners from 'components/about/partners';
import MapInstructions from 'components/about/map-instructions/map-instructions-component';
import HalfEarthModal from 'components/half-earth-modal';
import Component from './menu-settings-component';

const actions = { ...urlActions };

const MenuSettingsContainer = props => {
  const { openedModal, changeUI } = props;
  const [activeModal, setActiveModal] = useState(null);

  // take opened half earth modal from the url state
  useEffect(() => {
    if (openedModal === MODALS.HE) setActiveModal(HALF_EARTH_MODAL);
  }, []);

  const closeHEModal = () => { changeUI({ openedModal: null }) }

  const closeModal = () => {
    if (activeModal === HALF_EARTH_MODAL) { closeHEModal() }
    setActiveModal(null)
  };

  const { HALF_EARTH_MODAL, ABOUT_PARTNERS, ABOUT_INSTRUCTIONS } = SETTINGS_OPTIONS;

  const options = {
    [HALF_EARTH_MODAL]: {
      name: 'Monitoring progress towards the goal of half-earth',
      Component: HalfEarthModal,
      onClickHandler: () => {
        setActiveModal(HALF_EARTH_MODAL);
        changeUI({ openedModal: MODALS.HALF_EARTH });
      }
    },
    [ABOUT_PARTNERS]: {
      name: 'Partners',
      Component: Partners,
      onClickHandler: () => {
        setActiveModal(ABOUT_PARTNERS);
      }
    },
    [ABOUT_INSTRUCTIONS]: {
      name: 'How to navigate the map',
      Component: MapInstructions,
      onClickHandler: () => {
        setActiveModal(ABOUT_INSTRUCTIONS);
      }
    }
  }

  return <Component
    options={options}
    activeModal={activeModal}
    closeModal={closeModal}
    {...props} />;
}

export default connect(null, actions)(MenuSettingsContainer);