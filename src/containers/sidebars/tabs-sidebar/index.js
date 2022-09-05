import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';

import { BASE_LAYERS } from 'constants/aois';

import Component from './component';

const actions = {
  ...aoisActions,
};

function TabsSidebarContainer(props) {
  const { activeLayers, setSidebarTabActive, onTabClick } = props;

  const saveSidebarTab = (selectedTab) => {
    setSidebarTabActive(selectedTab);
  };

  const categoryActiveLayersCounter = useMemo(() => {
    return activeLayers.map((al, i) => {
      if (!BASE_LAYERS[i]) return al;
      return null;
    }).filter((i) => i !== null);
  }, [activeLayers]);

  return (
    <Component
      categoryActiveLayersCounter={categoryActiveLayersCounter}
      saveSidebarTab={saveSidebarTab}
      onTabClick={onTabClick}
      {...props}
    />
  );
}

export default connect(null, actions)(TabsSidebarContainer);
