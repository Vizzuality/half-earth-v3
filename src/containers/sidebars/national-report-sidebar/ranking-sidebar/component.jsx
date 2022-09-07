import React, { useEffect, useState, useMemo } from 'react';

import { useLocale, useT } from '@transifex/react';

import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

import ContentfulService from 'services/contentful';

import {
  RANKING_COLORS,
  getRankingLegend,
  RANKING_GROUPS_SLUGS,
} from 'constants/country-mode-constants';
import metadataConfig, { RANKING_CHART } from 'constants/metadata';

import styles from './styles.module.scss';

function Component() {
  const t = useT();

  const [metadata, setMetadata] = useState(null);
  const locale = useLocale();
  const rankingLegend = useMemo(() => getRankingLegend(), [locale]);

  useEffect(() => {
    const md = metadataConfig[RANKING_CHART];
    ContentfulService.getMetadata(md.slug, locale).then((data) => {
      setMetadata(data);
    });
  }, [locale]);

  function LegendBlock({ legendItems }) {
    return (
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
  }

  return (
    <>
      <div className={styles.cardContainer}>
        <SidebarCardWrapper>
          <SidebarCardContent
            title={t('National Species Protection Index')}
            description={metadata && metadata.description}
            metaDataSources={metadata && metadata.source}
          />
        </SidebarCardWrapper>
      </div>
      <div className={styles.legendContainer}>
        <LegendBlock
          legendItems={rankingLegend[RANKING_GROUPS_SLUGS.species]}
        />
        <LegendBlock
          legendItems={rankingLegend[RANKING_GROUPS_SLUGS.humanModification]}
        />
        <LegendBlock
          legendItems={rankingLegend[RANKING_GROUPS_SLUGS.protection]}
        />
      </div>
    </>
  );
}

export default Component;
