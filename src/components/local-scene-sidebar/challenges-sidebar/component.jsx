import React from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';

import {
  MERGED_PROTECTION,
} from 'constants/metadata';
const protectionSources = [
  {label: 'WDPA, OECM & RAISG', matadataService:  MERGED_PROTECTION}
]

const Component = ({
  handleSourceClick
}) => (
  <SidebarCardWrapper>
      <SidebarCardContent
        title="what are the challenges of a country?"
        description="Explore the correlations between the Species Protection Index (2019) and various socio-political indicators of different nations. The scatter plots illustrate some of the differences between countries, and the many social challenges that must be considered to ensure equitable global biodiversity conservation."
        metaDataSources={protectionSources}
        handleSourceClick={handleSourceClick}
      />
    </SidebarCardWrapper>
)

export default Component;