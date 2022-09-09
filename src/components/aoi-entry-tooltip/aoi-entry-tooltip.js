import React from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { AREA_OF_INTEREST } from 'router';

import mapStateToProps from 'selectors/map-tooltip-selectors';

import * as urlActions from 'actions/url-actions';

import { createHashFromGeometry } from 'utils/analyze-areas-utils';

import { AREA_TYPES } from 'constants/aois';
import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs';

import Component from './aoi-entry-tooltip-component';

const actions = {
  ...urlActions, ...aoisActions, ...aoisGeometriesActions, ...mapTooltipActions,
};

function AoiEntryTooltipContainer(props) {
  const {
    mapTooltipIsVisible, setTooltipInfo, tooltipInfo, setAreaTypeSelected,
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
    setAreaTypeSelected(AREA_TYPES.futurePlaces);

    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: aoiId },
      query:
      {
        precalculatedLayer: HALF_EARTH_FUTURE_TILE_LAYER,
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

export default connect(mapStateToProps, actions)(AoiEntryTooltipContainer);
