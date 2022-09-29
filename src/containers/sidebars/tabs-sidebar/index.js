import React from 'react';
import { connect } from 'react-redux';
import uiActions from 'redux_modules/ui';

import Component from './component';
import mapStateToProps from './selectors';

const actions = {
  ...uiActions,
};

function TabsSidebarContainer(props) {
  const {
    setSidebarTabActive,
    onTabClick,
    countedActiveCategoryLayers,
  } = props;

  const saveSidebarTab = (selectedTab) => {
    setSidebarTabActive(selectedTab);
  };

  return (
    <Component
      countedActiveLayers={countedActiveCategoryLayers}
      saveSidebarTab={saveSidebarTab}
      onTabClick={onTabClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(TabsSidebarContainer);
