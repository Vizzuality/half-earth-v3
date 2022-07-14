import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useLocale } from '@transifex/react';

import { percentageFormat, getLocaleNumber } from 'utils/data-formatting-utils';
import { getTotalPressures, getMainPressure } from 'utils/analyze-areas-utils';
import Component from './aoi-sidebar-component';
import * as urlActions from 'actions/url-actions';
import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import { postAoiToDataBase } from 'utils/geo-processing-services';
import { STRINGIFIED_ATTRIBUTES } from 'constants/aois';
import { DATA } from 'router';

const actions = { ...urlActions, ...aoiAnalyticsActions }

const AoiSidebarContainer = (props) => {
  const { speciesData, contextualData, geometry, browsePage } = props;
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [values, setFormattedValues] = useState({})

  const locale = useLocale();

  useEffect(() => {
    if (Object.keys(contextualData).length > 0) {
      // Custom AOIs rely on percentage instead of protectionPercentage
      const percentage = contextualData.protectionPercentage || contextualData.percentage;
      setFormattedValues({
        landCover: contextualData.elu && contextualData.elu.landCover,
        area: getLocaleNumber(contextualData.area, locale),
        climateRegime: contextualData.elu && contextualData.elu.climateRegime,
        population: contextualData.population && getLocaleNumber(contextualData.population, locale),
        mainPressure: contextualData.pressures && getMainPressure(contextualData.pressures),
        totalPressures: contextualData.pressures && getTotalPressures(contextualData.pressures),
        protectionPercentage: percentage && percentageFormat(percentage),
      })
    }
  }, [contextualData, locale]);

  useEffect(() => {
    if (isShareModalOpen && contextualData.isCustom) {
      saveAreaToDB();
    }
  }, [isShareModalOpen])

  const saveAreaToDB = () => {
    const attributes = {
      ...contextualData,
      ...STRINGIFIED_ATTRIBUTES.reduce((acc, key) => {
        acc[key] = JSON.stringify(contextualData[key]);
        return acc;
      }, {}),
      species: JSON.stringify(speciesData.species),
      per_global: contextualData.percentage,
      // per_aoi: 0, Not used yet
      time_stamp: Date.now()
    }
    postAoiToDataBase(geometry, attributes, speciesData)
  };

  const handleClose = () => {
    browsePage({ type: DATA });
  }

  return (
    <Component
      area={values.area}
      speciesData={speciesData}
      landCover={values.landCover}
      population={values.population}
      contextualData={contextualData}
      climateRegime={values.climateRegime}
      handleClose={handleClose}
      isShareModalOpen={isShareModalOpen}
      setShareModalOpen={setShareModalOpen}
      {...props}
    />
  )
}

export default connect(null, actions)(AoiSidebarContainer);
