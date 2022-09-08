import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';

import { BASE_LAYERS } from 'constants/aois';

import Component from './component';
import mapStateToProps from './selectors';

const actions = {
  ...aoisActions,
};

function TabsSidebarContainer(props) {
  const {
    activeLayers,
    aoiId,
    activeCategoryLayers,
    biodiversityCountedActiveLayers,
    carbonCountedActiveLayers,
    humanCountedActiveLayers,
    protectionCountedActiveLayers,
    setSidebarTabActive,
    onTabClick,
  } = props;

  const countedActiveLayers = useMemo(() => {
    return biodiversityCountedActiveLayers
      + protectionCountedActiveLayers
      + humanCountedActiveLayers
      + carbonCountedActiveLayers;
  }, [
    biodiversityCountedActiveLayers,
    protectionCountedActiveLayers,
    humanCountedActiveLayers,
    carbonCountedActiveLayers,
  ]);

  const saveSidebarTab = (selectedTab) => {
    setSidebarTabActive(selectedTab);
  };

  return (
    <Component
      countedActiveLayers={countedActiveLayers}
      saveSidebarTab={saveSidebarTab}
      onTabClick={onTabClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(TabsSidebarContainer);
