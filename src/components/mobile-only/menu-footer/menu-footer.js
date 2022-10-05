import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import urlActions from 'actions/url-actions';

// icons

import { FOOTER_OPTIONS } from 'constants/mobile-only';

import { ReactComponent as SettingsIcon } from 'icons/settings.svg';

import Component from './menu-footer-component';

function MenuFooterContainer(props) {
  const { isSidebarOpen, activeOption } = props;
  const { changeUI } = props;
  const handleSidebarClose = () => {
    if (isSidebarOpen) changeUI({ isSidebarOpen: false });
  };
  const resetActiveOption = () => changeUI({ activeOption: '' });
  const setActiveOption = (option) => changeUI({ activeOption: option });

  useEffect(() => {
    if (isSidebarOpen) handleSidebarClose();
  }, [activeOption]);

  const handler = (option) => {
    if (activeOption === option) resetActiveOption();
    else setActiveOption(option);
  };

  const options = [
    {
      icon: SettingsIcon,
      name: 'More',
      key: FOOTER_OPTIONS.SETTINGS,
      onClickHandler: () => handler(FOOTER_OPTIONS.SETTINGS),
    },
  ];

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component options={options} {...props} />
  );
}

export default connect(null, { ...urlActions, ...mapTooltipActions })(
  MenuFooterContainer
);
