import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import countryDataActions from 'redux_modules/country-data';
import metadataActions from 'redux_modules/metadata';
import uiActions from 'redux_modules/ui';

import { NATIONAL_REPORT_CARD } from 'router';

import { useLocale } from '@transifex/react';

import * as urlActions from 'actions/url-actions';

import ContentfulService from 'services/contentful';

import { getIndicatorLabels } from 'constants/country-mode-constants';
import metadataConfig, { CHALLENGES_CHART } from 'constants/metadata';
import { getCountryNames } from 'constants/translation-constants';
import { LOCAL_SCENE_TABS_SLUGS } from 'constants/ui-params';

import Component from './challenges-component';
import mapStateToProps from './challenges-selectors';

const actions = {
  ...urlActions,
  ...countryDataActions,
  ...metadataActions,
  ...uiActions,
};

function ChallengesContainer(props) {
  const {
    browsePage,
    countryName,
    changeUI,
    countryChallengesSelectedKey,
    xAxisKeys,
  } = props;

  const locale = useLocale();
  const countryNames = useMemo(getCountryNames, [locale]);
  const localizedCountryName = countryNames[countryName] || countryName;
  const [challengesInfo, setChallengesInfo] = useState('');

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[CHALLENGES_CHART],
      locale
    ).then((data) => {
      setChallengesInfo(data);
    });
  }, []);

  const handleBubbleClick = ({ countryISO }) => {
    const { selectedFilterOption } = props;
    browsePage({
      type: NATIONAL_REPORT_CARD,
      payload: { iso: countryISO, view: LOCAL_SCENE_TABS_SLUGS.CHALLENGES },
      query: {
        ui: { countryChallengesSelectedFilter: selectedFilterOption.slug },
      },
    });
  };

  const handleFilterSelection = (selectedFilter) => {
    changeUI({ countryChallengesSelectedFilter: selectedFilter.slug });
  };

  const handleSelectNextIndicator = () => {
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex !== xAxisKeys.length - 1) {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex + 1] });
    } else {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[0] });
    }
  };

  const handleSelectPreviousIndicator = () => {
    const currentIndex = xAxisKeys.indexOf(countryChallengesSelectedKey);
    if (currentIndex > 0) {
      changeUI({ countryChallengesSelectedKey: xAxisKeys[currentIndex - 1] });
    } else {
      changeUI({
        countryChallengesSelectedKey: xAxisKeys[xAxisKeys.length - 1],
      });
    }
  };

  const handleSelectIndicator = (selection) => {
    const AllXAxisKeys = Object.keys(getIndicatorLabels());
    const currentIndex = AllXAxisKeys.indexOf(selection.slug);
    changeUI({ countryChallengesSelectedKey: AllXAxisKeys[currentIndex] });
  };

  return (
    <Component
      {...props}
      challengesInfo={challengesInfo}
      countryName={localizedCountryName}
      handleBubbleClick={handleBubbleClick}
      handleFilterSelection={handleFilterSelection}
      handleSelectIndicator={handleSelectIndicator}
      handleSelectNextIndicator={handleSelectNextIndicator}
      handleSelectPreviousIndicator={handleSelectPreviousIndicator}
    />
  );
}

export default connect(mapStateToProps, actions)(ChallengesContainer);
