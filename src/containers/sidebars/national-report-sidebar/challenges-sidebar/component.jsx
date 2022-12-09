import React from 'react';

import { useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';

import { CONTINENTS } from 'constants/country-mode-constants';

import styles from './styles.module.scss';

function Component({ metaDataTitle, metaDataSources, metaDataDescription }) {
  const t = useT();
  const CONTINENT_LABELS = {
    africa: t('Africa'),
    antarctica: t('Antarctica'),
    asia: t('Asia'),
    europe: t('Europe'),
    'north-america': t('North America'),
    'south-america': t('South America'),
    oceania: t('Oceania'),
    australia: t('Australia'),
  };
  const locale = useLocale();

  return (
    <>
      <div className={styles.cardContainer}>
        <SidebarCardWrapper>
          <SidebarCardContent
            title={metaDataTitle}
            metaDataSources={metaDataSources}
            description={metaDataDescription}
          />
        </SidebarCardWrapper>
      </div>
      <div className={styles.countriesLegend}>
        {CONTINENTS.map((continent) => (
          <div key={`legend-${continent}`} className={cx(styles.continent)}>
            <span
              className={cx(styles.legendDot, styles[kebabCase(continent)])}
            />
            <span className={cx(styles.legendContinent, styles[continent])}>
              {CONTINENT_LABELS[continent]}
            </span>
          </div>
        ))}
      </div>
      <section className={styles.circlesLegend}>
        <p className={styles.circlesLegendTitle}>Country area in km2</p>
        <div className={styles.circles}>
          <div>
            <svg height="38" width="38">
              <circle
                cx="19"
                cy="19"
                r="18"
                stroke="white"
                strokeWidth="1"
                fillOpacity="0"
              />
            </svg>
            <div>
              <span className={styles.value}>&#60;150</span>
            </div>
          </div>
          <div>
            <svg height="58" width="58">
              <circle
                cx="29"
                cy="29"
                r="28"
                stroke="white"
                strokeWidth="1"
                fillOpacity="0"
              />
            </svg>
            <div>
              <span className={styles.value}>150 - 22K</span>
            </div>
          </div>
          <div>
            <svg height="72" width="72">
              <circle
                cx="36"
                cy="36"
                r="35"
                stroke="white"
                strokeWidth="1"
                fillOpacity="0"
              />
            </svg>
            <div>
              <span className={styles.value}>
                22K - {getLocaleNumber(3.25, locale)}M
              </span>
            </div>
          </div>
          <div>
            <svg height="92" width="92">
              <circle
                cx="46"
                cy="46"
                r="45"
                stroke="white"
                strokeWidth="1"
                fillOpacity="0"
              />
            </svg>
            <div>
              <span className={styles.value}>&#60;500M</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Component;
