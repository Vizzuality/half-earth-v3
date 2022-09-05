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

  const parsedLayers = useMemo(() => {
    if (categoryActiveLayers) {
      return categoryActiveLayers.map((acl) => {
        return {
          title: acl,
        };
      });
    } return null;
  }, []);

  const savedActiveLayers = useMemo(() => {
    if (parsedLayers) {
      return parsedLayers.map((al, i) => {
        if (!BASE_LAYERS[i]) return al;
        return null;
      }).filter((i) => i !== null).map((al) => al.title);
    }
    return null;
  }, [categoryActiveLayers]);

  const mapLayersActive = useMemo(() => {
    return activeLayers.map((al, i) => {
      if (!BASE_LAYERS[i]) return al;
      return null;
    }).filter((i) => i !== null);
  }, [activeLayers]);

  const saveSidebarTab = (selectedTab) => {
    setSidebarTabActive(selectedTab);
  };

  return (
    <Component
      savedActiveLayers={savedActiveLayers || mapLayersActive}
      saveSidebarTab={saveSidebarTab}
      onTabClick={onTabClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(TabsSidebarContainer);
