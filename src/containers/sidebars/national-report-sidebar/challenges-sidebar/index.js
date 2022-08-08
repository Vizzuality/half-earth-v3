import React, { useEffect, useState } from 'react';
import { useT, useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import metadataConfig, { CHALLENGES_CHART } from 'constants/metadata';
import ContentfulService from 'services/contentful';
import { visitNrcChallengesAnalytics } from 'actions/google-analytics-actions';

const actions = { visitNrcChallengesAnalytics };

function Container(props) {
  const [metadata, setMetadata] = useState(null);
  const t = useT();
  const locale = useLocale();

  useEffect(() => {
    const md = metadataConfig[CHALLENGES_CHART]
    ContentfulService.getMetadata(md.slug, locale).then(data => {
      setMetadata(data);
    });
  }, []);

  useEffect(() => {
    const { visitNrcChallengesAnalytics } = props;
    visitNrcChallengesAnalytics();
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
