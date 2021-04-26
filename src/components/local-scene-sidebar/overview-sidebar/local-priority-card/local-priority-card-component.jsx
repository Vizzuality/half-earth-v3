import React from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';

import styles from './local-priority-card-styles.module.scss';

const LocalPriorityCardComponent = (props) => {
  const {
    hasPriority,
    protectionNeeded,
    priorityMetadata,
    currentProtection,
    protectionMetadata,
    priorityAreasSentence,
  } = props;

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
          highValueLabel={'high priority'}
          lowValueLabel={'low priority'}
          metaDataSources={priorityMetadata && priorityMetadata.source}
        />
      </SidebarCardWrapper>
    </div>
  );
}

export default LocalPriorityCardComponent;
