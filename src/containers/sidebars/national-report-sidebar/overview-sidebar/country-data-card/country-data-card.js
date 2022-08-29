import React from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import mapStateToProps from './country-data-card-selectors';
import metadataActions from 'redux_modules/metadata';
import metadataConfig, { SPECIES_PROTECTION_INDEX } from 'constants/metadata';
import { checkSpiInfoAnalytics } from 'actions/google-analytics-actions';

import Component from './country-data-card-component';

const actions = { checkSpiInfoAnalytics, ...metadataActions };

function CountryDataCardContainer(props) {
  const { areaChartData } = props;
  const locale = useLocale();

  const handleInfoClick = () => {
    const {
      setModalMetadata,
      checkSpiInfoAnalytics,
    } = props;
    checkSpiInfoAnalytics('Species Protection Index');
    const md = metadataConfig[SPECIES_PROTECTION_INDEX];
    setModalMetadata({
      slug: md.slug,
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
