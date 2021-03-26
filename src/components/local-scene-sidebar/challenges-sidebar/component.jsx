import React, { useEffect, useState } from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import { CONTINENTS } from 'constants/country-mode-constants';
import styles from './styles.module.scss';

import 
metadataConfig, {
  CHALLENGES_CHART,
} from 'constants/metadata';
import metadataService from 'services/metadata-service';

const Component = ({
  handleSourceClick
}) => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const md = metadataConfig[CHALLENGES_CHART]
    metadataService.getMetadata(md.slug).then( data => {
      setMetadata(data);
    })
  }, []);

  return (
    <>
      <div className={styles.cardContainer}>
        <SidebarCardWrapper>
          <SidebarCardContent
            title={metadataConfig[CHALLENGES_CHART].title}
            description={metadata && metadata.description}
            metaDataSources={metadata && metadata.source}
          />
        </SidebarCardWrapper>
      </div>
      <div className={styles.countriesLegend}>
        {CONTINENTS.map((continent) => (
          <div key={`legend-${continent}`} className={cx(styles.continent)}>
            <span className={cx(styles.legendDot, styles[kebabCase(continent)])} />
            <span className={cx(styles.legendContinent, styles[continent])}>{continent}</span>
          </div>
        ))}
      </div>
      <section className={styles.circlesLegend}>
      <div>
          <svg height="32" width="32">
            <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="1" fillOpacity="0" />
          </svg>
          <div>
            <span className={styles.value}>&#60;150</span>
            <span className={styles.unit}>km<sup>2</sup></span>
          </div>
        </div>
        <div>
          <svg height="52" width="52">
            <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1" fillOpacity="0" />
          </svg>
          <div>
            <span className={styles.value}>&#60;22,000</span>
            <span className={styles.unit}>km<sup>2</sup></span>
          </div>
        </div>
        <div>
          <svg height="72" width="72">
            <circle cx="36" cy="36" r="35" stroke="white" strokeWidth="1" fillOpacity="0" />
          </svg>
          <div>
            <span className={styles.value}>&#60;3,25M</span>
            <span className={styles.unit}>km<sup>2</sup></span>
          </div>
        </div>
        <div>
          <svg height="92" width="92">
            <circle cx="46" cy="46" r="45" stroke="white" strokeWidth="1" fillOpacity="0" />
          </svg>
          <div>
            <span className={styles.value}>&#60;500M</span>
            <span className={styles.unit}>km<sup>2</sup></span>
          </div>
        </div>
      </section>
    </>
  )
}

export default Component;