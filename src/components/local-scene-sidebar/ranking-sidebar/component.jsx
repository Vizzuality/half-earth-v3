import React, { useEffect, useState } from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';
import styles from './styles.module.scss';

import
metadataConfig, {
  RANKING_CHART,
} from 'constants/metadata';

import {
  RANKING_COLORS,
  RANKING_LEGEND,
  RANKING_GROUPS_SLUGS,
} from "constants/country-mode-constants";
import metadataService from 'services/metadata-service';

const Component = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const md = metadataConfig[RANKING_CHART]
    metadataService.getMetadata(md.slug).then( data => {
      setMetadata(data);
    })
  }, []);

  const LegendBlock = ({ legendItems }) => (
    <div className={styles.legendBlock}>
      {Object.keys(legendItems).map((slug) => (
        <div key={`${RANKING_COLORS[slug]}`} className={styles.legendItem}>
          <span
            className={styles.color}
            style={{ backgroundColor: `${RANKING_COLORS[slug]}` }}
          />
          <span className={styles.label}>{legendItems[slug]}</span>
        </div>
      ))}
    </div>
  );

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
      <div className={styles.legendContainer}>
        <LegendBlock
          legendItems={RANKING_LEGEND[RANKING_GROUPS_SLUGS.species]}
        />
        <LegendBlock
          legendItems={RANKING_LEGEND[RANKING_GROUPS_SLUGS.humanModification]}
        />
        <LegendBlock
          legendItems={RANKING_LEGEND[RANKING_GROUPS_SLUGS.protection]}
        />
      </div>
    </>
  );
}

export default Component;