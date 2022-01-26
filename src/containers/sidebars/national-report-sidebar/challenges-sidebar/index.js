import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import metadataConfig, { CHALLENGES_CHART } from 'constants/metadata';
import metadataService from 'services/metadata-service';
import { visitNrcChallengesAnalytics } from 'actions/google-analytics-actions';

const actions = { visitNrcChallengesAnalytics }

const Container = (props) => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const md = metadataConfig[CHALLENGES_CHART]
    metadataService.getMetadata(md.slug).then( data => {
      setMetadata(data);
    })
  }, []);

  useEffect(() => {
    const { visitNrcChallengesAnalytics } = props;
    visitNrcChallengesAnalytics() 
  }, [])


  return (
    <Component
      metaDataTitle={metadataConfig[CHALLENGES_CHART].title}
      metaDataDescription={metadata && metadata.description}
      metaDataSources={metadata && metadata.source}
      {...props}
    />
  )
}

export default connect(null, actions)(Container);