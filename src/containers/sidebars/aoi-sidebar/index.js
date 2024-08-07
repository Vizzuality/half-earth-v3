import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import uiActions from 'redux_modules/ui';

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
import { WDPA_OECM_FEATURE_LAYER } from 'constants/layers-slugs';

import Component from './component';
import mapStateToProps from './selectors';

const actions = { ...urlActions, ...uiActions, ...aoiAnalyticsActions };

function AoiSidebarContainer(props) {
  const {
    speciesData,
    contextualData,
    geometry,
    browsePage,
    changeUI,
    activeLayers,
    precalculatedLayerSlug,
    view,
  } = props;

  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [sentenceData, setSentenceData] = useState();
  const [values, setFormattedValues] = useState({});
  const locale = useLocale();

  const isProtectedAreaAOI = precalculatedLayerSlug === WDPA_OECM_FEATURE_LAYER;

  const PA_DEFAULT_ZOOM = 6;

  // Effect to set parsed values TODO: move to selector
  useEffect(() => {
    if (Object.keys(contextualData).length > 0) {
      // Custom AOIs rely on percentage instead of protectionPercentage

      const percentage =
        contextualData.protectionPercentage || contextualData.percentage;

      setFormattedValues({
        landCover: contextualData.elu && contextualData.elu.landCover,
        area:
          contextualData.area && getLocaleNumber(contextualData.area, locale),
        climateRegime: contextualData.elu && contextualData.elu.climateRegime,
        population:
          contextualData.population &&
          getLocaleNumber(contextualData.population, locale),
        mainPressure:
          contextualData.pressures && getMainPressure(contextualData.pressures),
        totalPressures:
          contextualData.pressures &&
          getTotalPressures(contextualData.pressures),
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

  useEffect(() => {
    if (speciesData?.species) {
      const { species } = speciesData;
      const data = species.reduce((acc, specie) => {
        if (specie.meet_target === 1) {
          if (acc.meetTargetTotal) {
            acc.meetTargetTotal += 1;
          } else {
            acc.meetTargetTotal = 1;
          }
        }
        if (specie.SPS_increase === 1) {
          if (acc.SPSIncreaseTotal) {
            acc.SPSIncreaseTotal += 1;
          } else {
            acc.SPSIncreaseTotal = 1;
          }
        }
        return acc;
      }, {});

      if (data.meetTargetTotal) {
        data.meetTargetPercentage = Math.round(
          (data.meetTargetTotal * 100) / species.length
        );
      }
      setSentenceData(data);
    }
  }, [speciesData]);
  const handleClose = () => {
    browsePage({
      type: DATA,
      query: {
        centerOn: {
          coords: [
            geometry && view.center.longitude,
            geometry && view.extent.center.latitude,
          ],
          zoom: isProtectedAreaAOI ? PA_DEFAULT_ZOOM : view.zoom,
        },
      },
    });
    changeUI({
      activeCategoryLayers: intersectionBy(
        activeLayers,
        CATEGORY_LAYERS,
        'title'
      ),
    });
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
      sentenceData={sentenceData}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(AoiSidebarContainer);
