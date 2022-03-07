import React from 'react';
import { connect } from 'react-redux';
// Constants
import * as urlActions from 'actions/url-actions';
import Component from './aoi-entry-tooltip-component';
import { AREA_OF_INTEREST } from 'router';
import { writeToForageItem } from 'utils/local-forage-utils';
import { AREA_TYPES } from 'constants/aois';
import mapTooltipActions from 'redux_modules/map-tooltip';
import mapStateToProps from 'selectors/map-tooltip-selectors';
import aoisActions from 'redux_modules/aois';
import { createHashFromGeometry } from 'utils/analyze-areas-utils';
import aoisGeometriesActions from 'redux_modules/aois-geometries';

const actions = { ...urlActions, ...aoisActions, ...aoisGeometriesActions, ...mapTooltipActions}

const AoiEntryTooltipContainer = props => {
  const { mapTooltipIsVisible, setTooltipInfo, tooltipInfo, setAreaTypeSelected, setAoiGeometry } = props;

  const handleTooltipClose = () => {
    setTooltipInfo(null);
  }

  const handleExploreAOIClick = () => {
    const { browsePage, changeGlobe } = props;
    const { attributes, geometry } = tooltipInfo;
    const { AREA_KM2, MOL_ID } = attributes;
    setTooltipInfo(null);

    // TODO: Add analytics

    const areaName = `Priority area ${MOL_ID}`;
    const aoiId = createHashFromGeometry(geometry);

    const contextualData = {
      areaName, aoiId, areaType: AREA_TYPES.futurePlaces, area: AREA_KM2, jsonGeometry: JSON.stringify(geometry), ...attributes, timestamp: Date.now(),
      birds: JSON.stringify(attributes.birds),
      mammals: JSON.stringify(attributes.mammals),
      amphibians: JSON.stringify(attributes.amphibians),
      reptiles: JSON.stringify(attributes.reptiles),
    };
    setAreaTypeSelected(AREA_TYPES.futurePlaces)
    setAoiGeometry({ aoiId, geometry });
    writeToForageItem(aoiId, contextualData);

    browsePage({ type: AREA_OF_INTEREST, payload: { id: aoiId }});
    changeGlobe({ areaType: AREA_TYPES.futurePlaces, OBJECTID: attributes.OBJECTID })
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
