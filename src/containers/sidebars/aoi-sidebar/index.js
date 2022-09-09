import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DATA } from 'router';

import { useLocale } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';

import { getTotalPressures, getMainPressure } from 'utils/analyze-areas-utils';
import { percentageFormat, getLocaleNumber } from 'utils/data-formatting-utils';
import { postAoiToDataBase } from 'utils/geo-processing-services';

import intersectionBy from 'lodash/intersectionBy';

import { STRINGIFIED_ATTRIBUTES } from 'constants/aois';
import { CATEGORY_LAYERS } from 'constants/category-layers-constants';

import Component from './component';

const actions = { ...urlActions, ...aoiAnalyticsActions };

function AoiSidebarContainer(props) {
  const {
    speciesData, contextualData, geometry, browsePage, changeUI, activeLayers,
  } = props;
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [values, setFormattedValues] = useState({});

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
      });
    }
  }, [contextualData, locale]);

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
      time_stamp: Date.now(),
    };
    postAoiToDataBase(geometry, attributes, speciesData);
  };

  useEffect(() => {
    if (isShareModalOpen && contextualData.isCustom) {
      saveAreaToDB();
    }
  }, [isShareModalOpen]);

  const handleClose = () => {
    browsePage({ type: DATA });
    changeUI({ activeCategoryLayers: intersectionBy(activeLayers, CATEGORY_LAYERS, 'title') });
  };

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
  );
}

export default connect(null, actions)(AoiSidebarContainer);
