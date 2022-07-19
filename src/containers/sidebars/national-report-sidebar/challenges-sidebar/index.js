import React, { useEffect, useState } from 'react';
import { useT } from '@transifex/react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import metadataConfig, { CHALLENGES_CHART } from 'constants/metadata';
import metadataService from 'services/metadata-service';
import { visitNrcChallengesAnalytics } from 'actions/google-analytics-actions';

const actions = { visitNrcChallengesAnalytics }

const Container = (props) => {
  const [metadata, setMetadata] = useState(null);
  const t = useT();

  useEffect(() => {
    const md = metadataConfig[CHALLENGES_CHART]
    metadataService.getMetadata(md.slug).then(data => {
      setMetadata(data);
    })
  }, []);

  useEffect(() => {
    const { visitNrcChallengesAnalytics } = props;
    visitNrcChallengesAnalytics()
  }, [])


  return (
    <Component
      metaDataTitle={t('What are the challenges for a country?')}
      metaDataDescription={metadata && metadata.description}
      metaDataSources={metadata && metadata.source}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);
