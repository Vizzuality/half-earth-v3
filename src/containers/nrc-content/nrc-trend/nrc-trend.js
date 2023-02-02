import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useLocale } from '@transifex/react';

import ContentfulService from 'services/contentful';

import metadataConfig, { SPECIES_PROTECTION_INDEX } from 'constants/metadata';

import Component from './nrc-trend-component';
import mapStateToProps from './nrc-trend-selectors';

function TrendContainer(props) {
  const [metadataInfo, setMetadataInfo] = useState();
  const { locale } = useLocale();
  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[SPECIES_PROTECTION_INDEX],
      locale
    ).then((data) => {
      if (data) {
        setMetadataInfo(data.description);
      }
    });
  }, []);
  return <Component {...props} metadataInfo={metadataInfo} />;
}

export default connect(mapStateToProps, null)(TrendContainer);
