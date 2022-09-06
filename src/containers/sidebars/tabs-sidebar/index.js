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
    activeLayers, aoiId, categoryActiveLayers, setSidebarTabActive, onTabClick,
  } = props;

  const mapLayersActive = useMemo(() => {
    if (aoiId) {
      return categoryActiveLayers.filter(({ title: id1 }) => !BASE_LAYERS
        .some(({ title: id2 }) => id2 === id1));
    }
    return activeLayers.filter(({ title: id1 }) => !BASE_LAYERS
      .some(({ title: id2 }) => id2 === id1));
  }, [activeLayers, categoryActiveLayers]);

  const saveSidebarTab = (selectedTab) => {
    setSidebarTabActive(selectedTab);
  };

  return (
    <Component
      mapLayersActive={mapLayersActive}
      saveSidebarTab={saveSidebarTab}
      onTabClick={onTabClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(TabsSidebarContainer);
