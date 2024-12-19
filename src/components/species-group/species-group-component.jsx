import React, { useContext } from 'react';

import cx from 'classnames';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
  SPECIES_IMAGE_URL,
} from 'constants/dashboard-constants.js';

import { LightModeContext } from '../../context/light-mode';
import TaxaImageComponent from '../taxa-image';

import styles from './species-group-component.module.scss';

function SpeciesGroupComponent(props) {
  const { species, selectedTaxaObj, setSelectedIndex, setScientificName } =
    props;
  // eslint-disable-next-line camelcase
  const { asset_url, common_name, scientific_name } = species;
  const { lightMode } = useContext(LightModeContext);

  const selectSpecies = (selectedSpecies) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(selectedSpecies.scientific_name);
    localStorage.setItem(
      SPECIES_SELECTED_COOKIE,
      selectedSpecies.scientific_name
    );
  };

  return (
    <button
      type="button"
      className={cx(lightMode ? styles.light : '', styles.speciesBox)}
      onClick={() => selectSpecies(species)}
    >
      <div className={styles.imgBox}>
        {asset_url && (
          <img
            alt={`${selectedTaxaObj.taxa}`}
            loading="lazy"
            src={`${SPECIES_IMAGE_URL}${asset_url}.jpg`}
          />
        )}
        {!asset_url && <TaxaImageComponent taxa={selectedTaxaObj.taxa} />}
      </div>
      <div className={cx(styles.speciesText, styles.name)}>
        <div className={styles.common}>{common_name}</div>
        <div className={styles.sci}>{scientific_name}</div>
      </div>
    </button>
  );
}

export default SpeciesGroupComponent;
