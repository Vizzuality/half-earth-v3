import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import unionBy from 'lodash/unionBy';

import { ADMIN_AREAS_FEATURE_LAYER } from 'constants/layers-slugs';

import Component from './dashboard-view-component';
import mapStateToProps from './dashboard-view-selectors';

function DashboardView(props) {
  const { activeLayers, changeUI, activeCategoryLayers, viewSettings } = props;

  const activeLayersWithoutAdmin = activeLayers.filter(
    (ual) => ual.title !== ADMIN_AREAS_FEATURE_LAYER
  );

  const [updatedActiveLayers, setUpdatedActiveLayers] = useState(
    activeLayersWithoutAdmin
  );

  useEffect(() => {
    // Add temporary activeCategoryLayers to activeLayers at render and reset the param
    if (activeCategoryLayers) {
      setUpdatedActiveLayers(
        unionBy(activeCategoryLayers, activeLayers, 'title')
      );
      changeUI({ activeCategoryLayers: undefined });
    } else {
      setUpdatedActiveLayers(activeLayers);
    }
  }, [activeLayers]);

  return (
    <Component
      updatedActiveLayers={updatedActiveLayers}
      viewSettings={viewSettings}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(DashboardView);
