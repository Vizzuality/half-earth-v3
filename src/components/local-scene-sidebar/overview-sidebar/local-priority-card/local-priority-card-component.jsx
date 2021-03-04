import React, { useState, useEffect } from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';

import styles from './local-priority-card-styles.module.scss';

import metadataConfig, {
  MERGED_PROTECTION,
  COUNTRY_PRIORITY
} from 'constants/metadata';
import metadataService from 'services/metadata-service';


const LocalPriorityCardComponent = (props) => {
  const {
    hasPriority,
    protectionNeeded,
    currentProtection,
    priorityAreasSentence,
  } = props;

  const [priorityMetadata, setPriorityMetadata] = useState(null);
  const [protectionMetadata, setProtectionsMetadata] = useState(null);

  useEffect(() => {
    const md = metadataConfig[MERGED_PROTECTION]
    metadataService.getMetadata(md.slug).then( data => {
      setProtectionsMetadata(data);
    })
  }, []);

  useEffect(() => {
    const md = metadataConfig[COUNTRY_PRIORITY]
    metadataService.getMetadata(md.slug).then( data => {
      setPriorityMetadata(data);
    })
  }, []);

  return (
    <div className={styles.cardContainer}>
      <SidebarCardWrapper>
        <SidebarCardContent
          title={`The current protection: ${currentProtection}%`}
          description="The green areas on the map represent regions that are currently recognized as being managed for the long-term conservation of nature"
          legendType={'basic'}
          metaDataSources={protectionMetadata && protectionMetadata.source}
          />
        <SidebarCardContent
          title={`Additional protection needed: ${protectionNeeded}%`}
          description={priorityAreasSentence}
          legendType={hasPriority && 'gradient'}
          metaDataSources={priorityMetadata && priorityMetadata.source}
        />
      </SidebarCardWrapper>
    </div>
  );
}

export default LocalPriorityCardComponent;
