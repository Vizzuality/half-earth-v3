import React, { useState } from 'react';
import { connect } from 'react-redux';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import Component from './component';
import { mapStateToProps } from './sidemenu-selectors';

const actions = {
  ...urlActions,
  ...mapTooltipActions,
  ...aoisGeometriesActions,
  ...aoiAnalyticsActions,
};

function SideMenu(props) {
  const [isPromptModalOpen, setPromptModalOpen] = useState(false);

  const handlePromptModalToggle = () => setPromptModalOpen(!isPromptModalOpen);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      isPromptModalOpen={isPromptModalOpen}
      handlePromptModalToggle={handlePromptModalToggle}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(SideMenu);
