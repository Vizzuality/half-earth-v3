import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { percentageFormat, localeFormatting } from 'utils/data-formatting-utils';
import { getTotalPressures, getMainPressure } from 'utils/analyze-areas-utils';
import Component from './component';
import * as urlActions from 'actions/url-actions';
import { DATA } from 'router'

const actions = {...urlActions}

const AoiSidebarContainer = (props) => {
  const { speciesData, contextualData, browsePage } = props;
  const [values, setFormattedValues ] = useState({})
  useEffect(() => {
    if (Object.keys(contextualData).length > 0) {
      setFormattedValues({
        landCover: contextualData.elu && contextualData.elu.landCover,
        area: localeFormatting(contextualData.area),
        climateRegime: contextualData.elu && contextualData.elu.climateRegime,
        population: contextualData.population && localeFormatting(contextualData.population),
        mainPressure: contextualData.pressures && getMainPressure(contextualData.pressures),
        totalPressures: contextualData.pressures && getTotalPressures(contextualData.pressures),
        protectionPercentage: contextualData.protectionPercentage && percentageFormat(contextualData.protectionPercentage),
      })
    }
  }, [contextualData]);


  const handleSceneModeChange = () => browsePage({type: DATA})

  return console.log(speciesData, contextualData) || (
    <Component
      area={values.area}
      speciesData={speciesData}
      landCover={values.landCover}
      population={values.population}
      contextualData={contextualData}
      climateRegime={values.climateRegime}
      handleSceneModeChange={handleSceneModeChange}
      {...props}
    />
  )
}

export default connect(null, actions)(AoiSidebarContainer);