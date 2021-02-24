import React from 'react';
import SidebarCardWrapper from 'components/sidebar-card-wrapper';
import SidebarCardContent from 'components/sidebar-card-content';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import { CONTINENTS } from 'constants/country-mode-constants';
import styles from './styles.module.scss';

import {
  MERGED_PROTECTION,
} from 'constants/metadata';
const protectionSources = [
  {label: 'Gross National Income', matadataService:  MERGED_PROTECTION},
  {label: 'Population', matadataService:  MERGED_PROTECTION},
  {label: 'proportion of very high human modification', matadataService:  MERGED_PROTECTION},
  {label: 'number of endemic vertebrates', matadataService:  MERGED_PROTECTION},
  {label: 'total number of vertebrate species', matadataService:  MERGED_PROTECTION},
  {label: 'SPI', matadataService:  MERGED_PROTECTION},

]

const Component = ({
  handleSourceClick
}) => (
  <>
    <SidebarCardWrapper>
      <SidebarCardContent
        title="what are the challenges of a country?"
        description="Explore the correlations between the Species Protection Index (2019) and various socio-political indicators of different nations. The scatter plots illustrate some of the differences between countries, and the many social challenges that must be considered to ensure equitable global biodiversity conservation."
        metaDataSources={protectionSources}
        handleSourceClick={handleSourceClick}
      />
    </SidebarCardWrapper>
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
          <circle cx="16" cy="16" r="15" stroke="white" stroke-width="1" fill-opacity="0" />
        </svg>
        <span>{`>100`}</span>
      </div>
      <div>
        <svg height="52" width="52">
          <circle cx="26" cy="26" r="25" stroke="white" stroke-width="1" fill-opacity="0" />
        </svg>
        <span>{`>100`}</span>
      </div>
      <div>
        <svg height="72" width="72">
          <circle cx="36" cy="36" r="35" stroke="white" stroke-width="1" fill-opacity="0" />
        </svg>
        <span>{`>100`}</span>
      </div>
      <div>
        <svg height="92" width="92">
          <circle cx="46" cy="46" r="45" stroke="white" stroke-width="1" fill-opacity="0" />
        </svg>
        <span>{`>100`}</span>
      </div>
    </section>
  </>
)

export default Component;