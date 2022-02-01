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
  const [isShareModalOpen, setShareModalOpen] = useState(false);
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

  useEffect(()=> {
    if (isShareModalOpen) {
      saveAreaToDB();
    }
  }, [isShareModalOpen])

  const handleSceneModeChange = () => browsePage({type: DATA})
  const stringifiedFields = ['elu', 'pressures', 'protectedAreasList', 'species'];
  const saveAreaToDB = () => {
    const attributes = {
      ...contextualData,
      ...stringifiedFields.map(key => (
        {[key]: JSON.stringify(contextualData[key])}
      )),
      per_global: contextualData.percentage,
      per_aoi: contextualData.percentageAoi,
      time_stamp: Date.now()
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
      isShareModalOpen={isShareModalOpen}
      setShareModalOpen={setShareModalOpen}
      {...props}
    />
  )
}

export default connect(null, actions)(AoiSidebarContainer);
