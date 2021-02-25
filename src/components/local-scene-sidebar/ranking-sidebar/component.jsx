import React, { useEffect, useState } from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';
import styles from './styles.module.scss';

import 
metadataConfig, {
  RANKING_CHART,
} from 'constants/metadata';
import metadataService from 'services/metadata-service';

const Component = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const md = metadataConfig[RANKING_CHART]
    metadataService.getMetadata(md.slug).then( data => {
      setMetadata(data);
    })
  }, []);

  return (
    <>
    <div className={styles.cardContainer}>
      <SidebarCardWrapper>
        <SidebarCardContent
          title={metadataConfig[RANKING_CHART].title}
          description={metadata && metadata.description}
          metaDataSources={metadata && metadata.source}
        />
      </SidebarCardWrapper>
    </div>
    </>
  )
}

export default Component;