import React from 'react';
import { connect } from 'react-redux';
// Constants
import * as urlActions from 'actions/url-actions';
import Component from './aoi-entry-tooltip-component';
import { AREA_OF_INTEREST } from 'router';
import { AREA_TYPES } from 'constants/aois';
import mapTooltipActions from 'redux_modules/map-tooltip';
import mapStateToProps from 'selectors/map-tooltip-selectors';
import aoisActions from 'redux_modules/aois';
import { createHashFromGeometry } from 'utils/analyze-areas-utils';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import { HALF_EARTH_FUTURE_TILE_LAYER } from 'constants/layers-slugs';
const actions = { ...urlActions, ...aoisActions, ...aoisGeometriesActions, ...mapTooltipActions}

const AoiEntryTooltipContainer = props => {
  const { mapTooltipIsVisible, setTooltipInfo, tooltipInfo, setAreaTypeSelected } = props;

  const handleTooltipClose = () => {
    setTooltipInfo(null);
  }

  const handleExploreAOIClick = () => {
    const { browsePage } = props;
    const { attributes, geometry } = tooltipInfo;
    setTooltipInfo(null);
    // TODO: Add analytics
    const aoiId = createHashFromGeometry(geometry);
    setAreaTypeSelected(AREA_TYPES.futurePlaces)

    browsePage({ type: AREA_OF_INTEREST, payload: { id: aoiId }, query: { precalculatedLayer: HALF_EARTH_FUTURE_TILE_LAYER, OBJECTID: attributes.OBJECTID }});
  };

  return (
    <Component
      mapTooltipIsVisible={mapTooltipIsVisible}
      tooltipContent={tooltipInfo}
      tooltipPosition={tooltipInfo && tooltipInfo.geometry}
      handleTooltipClose={handleTooltipClose}
      onExploreAOIClick={handleExploreAOIClick}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(AoiEntryTooltipContainer);
