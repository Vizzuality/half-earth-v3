import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import { checkSpiInfoAnalytics } from 'actions/google-analytics-actions';

import metadataConfig, { SPECIES_PROTECTION_INDEX } from 'constants/metadata';

import Component from './country-data-card-component';
import mapStateToProps from './country-data-card-selectors';

const actions = { checkSpiInfoAnalytics, ...metadataActions };

function CountryDataCardContainer(props) {
  const { areaChartData } = props;
  const locale = useLocale();

  const handleInfoClick = () => {
    const {
      setModalMetadata,
      checkSpiInfoAnalytics: checkSpiInfoAnalyticsAction,
    } = props;
    checkSpiInfoAnalyticsAction('Species Protection Index');
    setModalMetadata({
      slug: metadataConfig[SPECIES_PROTECTION_INDEX],
      locale,
      isOpen: true,
    });
  };

  return (
    <Component
      areaChartData={areaChartData}
      handleInfoClick={handleInfoClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(CountryDataCardContainer);
