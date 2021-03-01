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
  RANKING_LEGEND
} from 'constants/country-mode-constants';
import metadataService from 'services/metadata-service';

const Component = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const md = metadataConfig[RANKING_CHART]
    metadataService.getMetadata(md.slug).then( data => {
      setMetadata(data);
    })
  }, []);

  const LegendBlock = ({legendItems}) => (
    <div className={styles.legendBlock}>
      {
        legendItems.map(item => (
          <div className={styles.legendItem}>
            <span
              className={styles.color}
              style={{backgroundColor:`${RANKING_COLORS[item.slug]}`}}/>
            <span
              className={styles.label}
            >
              {item.label}
            </span>
          </div>
        ))
      }
    </div>
  )

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
      <LegendBlock legendItems={RANKING_LEGEND.species}/>
      <LegendBlock legendItems={RANKING_LEGEND.human}/>
      <LegendBlock legendItems={RANKING_LEGEND.protection}/>
    </div>
    </>
  )
}

export default Component;