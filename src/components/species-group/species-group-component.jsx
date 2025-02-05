import React, { useContext } from 'react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import TaxaImageComponent from '../taxa-image';

import styles from './species-group-component.module.scss';

function SpeciesGroupComponent(props) {
  const { species, selectedTaxaObj, setSelectedIndex, setScientificName } =
    props;
  // eslint-disable-next-line camelcase
  const { species_url, common_name, scientific_name } = species;
  const { lightMode } = useContext(LightModeContext);

  const selectSpecies = (selectedSpecies) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(selectedSpecies.scientific_name);
    localStorage.setItem(
      SPECIES_SELECTED_COOKIE,
      selectedSpecies.scientific_name
    );
  };

  const getCommonName = (commonName, scientificName) => {
    const parsedName = JSON.parse(commonName);

    const name = parsedName.filter((pn) => pn.lang === 'fr');
    return name[0]?.cmname || scientificName;
  };

  return (
    <button
      type="button"
      className={cx(lightMode ? styles.light : '', styles.speciesBox)}
      onClick={() => selectSpecies(species)}
    >
      <div className={styles.imgBox}>
        {species_url && (
          <img
            alt={`${selectedTaxaObj.taxa}`}
            loading="lazy"
            src={`${species_url}`}
          />
        )}
        {!species_url && <TaxaImageComponent taxa={selectedTaxaObj.taxa} />}
      </div>
      <div className={cx(styles.speciesText, styles.name)}>
        <div className={styles.common}>
          {getCommonName(common_name, scientific_name)}
        </div>
        <div className={styles.sci}>{scientific_name}</div>
      </div>
    </button>
  );
}

export default SpeciesGroupComponent;
