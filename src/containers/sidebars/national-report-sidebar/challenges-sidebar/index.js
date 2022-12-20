import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useT, useLocale } from '@transifex/react';

import { visitNrcChallengesAnalytics } from 'actions/google-analytics-actions';

import ContentfulService from 'services/contentful';

import metadataConfig, { CHALLENGES_CHART } from 'constants/metadata';

import Component from './component.jsx';

const actions = { visitNrcChallengesAnalytics };

function Container(props) {
  const [metadata, setMetadata] = useState(null);
  const t = useT();
  const locale = useLocale();

  useEffect(() => {
    ContentfulService.getMetadata(
      metadataConfig[CHALLENGES_CHART],
      locale
    ).then((data) => {
      setMetadata(data);
    });
  }, []);

  useEffect(() => {
    const { visitNrcChallengesAnalytics: visitNrcChallengesAnalyticsAction } =
      props;
    visitNrcChallengesAnalyticsAction();
  }, []);

  return (
    <Component
      metaDataTitle={t('What are the challenges for a country?')}
      metaDataDescription={metadata && metadata.description}
      metaDataSources={metadata && metadata.source}
      {...props}
    />
  );
}

export default connect(null, actions)(Container);
