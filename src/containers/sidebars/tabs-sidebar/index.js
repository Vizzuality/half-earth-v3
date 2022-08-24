import React from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';

import Component from './component';

const actions = {
  ...aoisActions,
};

function TabsSidebarContainer(props) {
  const { setSidebarTabActive } = props;

  const saveSidebarTab = (selectedTab) => {
    setSidebarTabActive(selectedTab);
  };

  return (
    <Component
      saveSidebarTab={saveSidebarTab}
      {...props}
    />
  );
}

export default connect(null, actions)(TabsSidebarContainer);
