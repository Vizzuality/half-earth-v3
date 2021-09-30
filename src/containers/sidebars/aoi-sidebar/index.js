import React, { useEffect, useState } from 'react';
import { percentageFormat, localeFormatting } from 'utils/data-formatting-utils';
import { getTotalPressures, getMainPressure } from 'utils/analyze-areas-utils';
import Component from './component';

const AoiSidebarContainer = (props) => {
  const { aoiData } = props;
  const [values, setFormattedValues ] = useState({})
  useEffect(() => {
    if (Object.keys(aoiData).length > 0) {
      setFormattedValues({
        landCover: aoiData.elu.landCover,
        area: localeFormatting(aoiData.area),
        climateRegime: aoiData.elu.climateRegime,
        population: localeFormatting(aoiData.population),
        mainPressure: getMainPressure(aoiData.pressures),
        totalPressures: getTotalPressures(aoiData.pressures),
        protectionPercentage: percentageFormat(aoiData.protectionPercentage),
      })
    }
  }, [aoiData])

  return (
    <Component 
      area={values.area}
      landCover={values.landCover}
      population={values.population}
      climateRegime={values.climateRegime}
      {...props}
    />
  )
}

export default AoiSidebarContainer;