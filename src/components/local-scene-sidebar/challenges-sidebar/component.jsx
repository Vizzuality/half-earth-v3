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
  {label: 'WDPA, OECM & RAISG', matadataService:  MERGED_PROTECTION}
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
  </>
)

export default Component;