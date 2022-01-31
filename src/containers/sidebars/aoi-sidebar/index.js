import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { percentageFormat, localeFormatting } from 'utils/data-formatting-utils';
import { getTotalPressures, getMainPressure } from 'utils/analyze-areas-utils';
import Component from './aoi-sidebar-component';
import * as urlActions from 'actions/url-actions';
import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import { DATA } from 'router'
import { postAoiToDataBase } from 'utils/geo-processing-services';

const actions = {...urlActions, ...aoiAnalyticsActions}

const AoiSidebarContainer = (props) => {
  const { speciesData, contextualData, browsePage, geometry } = props;
  const [values, setFormattedValues ] = useState({})
  useEffect(() => {
    if (Object.keys(contextualData).length > 0) {
      // Custom AOIs rely on percentage instead of protectionPercentage
      const percentage = contextualData.protectionPercentage || (contextualData.percentage * 100);
      setFormattedValues({
        landCover: contextualData.elu && contextualData.elu.landCover,
        area: localeFormatting(contextualData.area),
        climateRegime: contextualData.elu && contextualData.elu.climateRegime,
        population: contextualData.population && localeFormatting(contextualData.population),
        mainPressure: contextualData.pressures && getMainPressure(contextualData.pressures),
        totalPressures: contextualData.pressures && getTotalPressures(contextualData.pressures),
        protectionPercentage: (contextualData.protectionPercentage || contextualData.percentage) && percentageFormat(percentage),
      })
    }
  }, [contextualData]);


  const handleSceneModeChange = () => browsePage({type: DATA})

  const saveAreaAfterShare = () => {
    const attributes = {
      area: contextualData.area,
      //
      population_sum: 0,
      land_cover_majority: 0,
      climate_regime_majority: 0,
      number_of_mammals: 0,
      number_of_amphibians: 0,
      number_of_birds: 0,
      number_of_reptiles: 0,
      percentage_protected: 0,
      mammals_list: 0,
      amphibians_list: 0,
      birds_list: 0,
      reptiles_list: 0,
      half_earth_goal: 100,
      name: JSON.stringify(contextualData),
      hash_id: contextualData.aoiId,
      geometry: geometry.extent,
      QueriedDate: Date.now(),
    }
    postAoiToDataBase(geometry, attributes, speciesData)
  };

  return (
    <Component
      area={values.area}
      speciesData={speciesData}
      landCover={values.landCover}
      population={values.population}
      contextualData={contextualData}
      climateRegime={values.climateRegime}
      handleSceneModeChange={handleSceneModeChange}
      saveAreaAfterShare={saveAreaAfterShare}
      {...props}
    />
  )
}

export default connect(null, actions)(AoiSidebarContainer);
