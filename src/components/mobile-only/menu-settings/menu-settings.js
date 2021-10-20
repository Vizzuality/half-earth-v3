import React, { useState } from 'react';

import { SETTINGS_OPTIONS } from 'constants/mobile-only';

import Partners from 'components/about/partners';
import MapInstructions from 'components/about/map-instructions/map-instructions-component';
import Component from './menu-settings-component';

const MenuSettingsContainer = props => {
  const [activeModal, setActiveModal] = useState(null);



  const closeModal = () => {
    setActiveModal(null)
  };

  const { ABOUT_PARTNERS, ABOUT_INSTRUCTIONS } = SETTINGS_OPTIONS;

  const options = {
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

export default MenuSettingsContainer;