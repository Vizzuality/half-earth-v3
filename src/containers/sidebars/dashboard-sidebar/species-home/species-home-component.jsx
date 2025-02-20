import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import SpeciesSearch from 'components/species-search';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './species-home-styles.module.scss';

function SpeciesHomeComponent(props) {
  const t = useT();
  const {
    setSelectedIndex,
    setScientificName,
    prioritySpeciesList,
    setExploreAllSpecies,
  } = props;

  const { lightMode } = useContext(LightModeContext);

  const selectSpecies = (scientificname) => {
    setExploreAllSpecies(false);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.content}>
        <span className={styles.sectionTitle}>
          {t('Biodiversity Dashboard')}
        </span>
        <hr className={hrTheme.dark} />
        <p>
          {t(
            'Explore species spatial data, view conservation status, and analyze regions where a species occurs'
          )}
        </p>
        <SpeciesSearch {...props} />
        {prioritySpeciesList.length > 0 && (
          <div className={styles.mostPopular}>
            <span className={styles.sectionTitle}>{t('Popular Species')}</span>
            <div className={styles.species}>
              {prioritySpeciesList.map((species) => (
                <button
                  key={species.species_name}
                  type="button"
                  className={cx(styles.navCard)}
                  onClick={() => selectSpecies(species.species_name)}
                >
                  <img
                    src={species.image_url}
                    alt={species.species_name}
                    width={200}
                    height={200}
                  />
                  <span>{species.local_name || species.common_name_en}</span>
                  <p>{species.species_name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <PartnersContainer /> */}
    </div>
  );
}

export default SpeciesHomeComponent;
