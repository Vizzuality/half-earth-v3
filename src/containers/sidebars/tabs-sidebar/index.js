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
    categoryActiveLayers, activeLayers, setSidebarTabActive, onTabClick,
  } = props;

  const mapLayersActive = useMemo(() => {
    if (!categoryActiveLayers) {
      return activeLayers.filter(({ title: id1 }) => !BASE_LAYERS
        .some(({ title: id2 }) => id2 === id1));
    } return categoryActiveLayers.filter(({ title: id1 }) => !BASE_LAYERS
      .some(({ title: id2 }) => id2 === id1));
  }, [activeLayers]);

  const saveSidebarTab = (selectedTab) => {
    setSidebarTabActive(selectedTab);
  };

  return (
    <Component
      savedActiveLayers={mapLayersActive}
      saveSidebarTab={saveSidebarTab}
      onTabClick={onTabClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(TabsSidebarContainer);
