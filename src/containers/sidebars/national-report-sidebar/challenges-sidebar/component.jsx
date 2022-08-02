import React from 'react';
import { getLocaleNumber } from 'utils/data-formatting-utils';
import { useT, useLocale } from '@transifex/react';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import SidebarCardContent from 'containers/sidebars/sidebar-card-content';
import cx from 'classnames';
import kebabCase from 'lodash/kebabCase';

import { CONTINENTS } from 'constants/country-mode-constants';
import styles from './styles.module.scss';

const Component = ({ metaDataTitle, metaDataSources, metaDataDescription }) => {
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
            <span className={styles.unit}>
              {t('km')}
              <sup>2</sup>
            </span>
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
            <span className={styles.value}>
              &#60;{getLocaleNumber(22000, locale)}
            </span>
            <span className={styles.unit}>
              {t('km')}
              <sup>2</sup>
            </span>
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
            <span className={styles.value}>&#60;3,25M</span>
            <span className={styles.unit}>
              {t('km')}
              <sup>2</sup>
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
            <span className={styles.unit}>
              {t('km')}
              <sup>2</sup>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Component;
