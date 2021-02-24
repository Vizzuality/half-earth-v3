import React from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';

import {
  MERGED_PROTECTION,
  COUNTRY_PRIORITY
} from 'constants/metadata';

const protectionSources = [
  {label: 'WDPA, OECM & RAISG', matadataService:  MERGED_PROTECTION}
]

const prioritySources = [
  {label: 'Rinnan DS and Jetz W (2020)', matadataService:  COUNTRY_PRIORITY}
]

const LocalPriorityCardComponent = (props) => {
  const {
    hasPriority,
    handleInfoClick,
    protectionNeeded,
    currentProtection,
    priorityAreasSentence,
  } = props;
  return (
    <SidebarCardWrapper>
      <SidebarCardContent
        title={`The current protection: ${currentProtection}%`}
        description="The green areas on the map represent regions that are currently
        recognized as being managed for the long-term conservation of
        nature."
        legendType="basic"
        handleSourceClick={handleInfoClick}
        metaDataSources={protectionSources}
      />
      <SidebarCardContent
        title={`Additional protection needed: ${protectionNeeded}%`}
        description={priorityAreasSentence}
        legendType={hasPriority && 'gradient'}
        lowValueLabel="low priority"
        highValueLabel="high priority"
        handleSourceClick={handleInfoClick}
        metaDataSources={prioritySources}
      />
    </SidebarCardWrapper>
  );
}

export default LocalPriorityCardComponent;
