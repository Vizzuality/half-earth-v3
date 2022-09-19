import React from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { AREA_OF_INTEREST } from 'router';

import mapStateToProps from 'selectors/map-tooltip-selectors';

import * as urlActions from 'actions/url-actions';

import { createHashFromGeometry } from 'utils/analyze-areas-utils';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';

import Component from './future-place-tooltip-component';

const actions = {
  ...urlActions, ...aoisActions, ...aoisGeometriesActions, ...mapTooltipActions,
};

function FuturePlaceTooltipContainer(props) {
  const {
    mapTooltipIsVisible, setTooltipInfo, tooltipInfo,
  } = props;

  const handleTooltipClose = () => {
    setTooltipInfo(null);
  };

  const handleExploreAOIClick = () => {
    const { browsePage } = props;
    const { attributes, geometry } = tooltipInfo;
    setTooltipInfo(null);
    // TODO: Add analytics
    const aoiId = createHashFromGeometry(geometry);

    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: aoiId },
      query:
      {
        precalculatedLayerSlug: PRECALCULATED_LAYERS_SLUG.protectedAreas,
        OBJECTID: attributes.OBJECTID,
      },
    });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      mapTooltipIsVisible={mapTooltipIsVisible}
      tooltipContent={tooltipInfo}
      tooltipPosition={tooltipInfo && tooltipInfo.geometry}
      handleTooltipClose={handleTooltipClose}
      onExploreAOIClick={handleExploreAOIClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(FuturePlaceTooltipContainer);
