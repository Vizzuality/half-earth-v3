import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { percentageFormat, localeFormatting } from 'utils/data-formatting-utils';
import { getTotalPressures, getMainPressure } from 'utils/analyze-areas-utils';
import Component from './component';
import * as urlActions from 'actions/url-actions';
import { DATA } from 'router'

const actions = {...urlActions}

const AoiSidebarContainer = (props) => {
  const { aoiData, browsePage } = props;
  const [values, setFormattedValues ] = useState({})
  useEffect(() => {
    if (Object.keys(aoiData).length > 0) {
      setFormattedValues({
        landCover: aoiData.elu && aoiData.elu.landCover,
        area: localeFormatting(aoiData.area),
        climateRegime: aoiData.elu && aoiData.elu.climateRegime,
        population: aoiData.population && localeFormatting(aoiData.population),
        mainPressure: aoiData.pressures && getMainPressure(aoiData.pressures),
        totalPressures: aoiData.pressures && getTotalPressures(aoiData.pressures),
        protectionPercentage: aoiData.protectionPercentage && percentageFormat(aoiData.protectionPercentage),
      })
    }
  }, [aoiData]);


  const handleSceneModeChange = () => browsePage({type: DATA})

  return console.log(aoiData) || (
    <Component 
      aoiData={aoiData}
      area={values.area}
      landCover={values.landCover}
      population={values.population}
      climateRegime={values.climateRegime}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}

export default connect(null, actions)(AoiSidebarContainer);