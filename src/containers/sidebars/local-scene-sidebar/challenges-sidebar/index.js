import React, { useEffect, useState } from 'react';
import Component from './component.jsx';

import metadataConfig, { CHALLENGES_CHART } from 'constants/metadata';
import metadataService from 'services/metadata-service';

const Container = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const md = metadataConfig[CHALLENGES_CHART]
    metadataService.getMetadata(md.slug).then( data => {
      setMetadata(data);
    })
  }, []);


  return (
    <Component
      metaDataTitle={metadataConfig[CHALLENGES_CHART].title}
      metaDataDescription={metadata && metadata.description}
      metaDataSources={metadata && metadata.source}
    />
  )
}

export default Container;