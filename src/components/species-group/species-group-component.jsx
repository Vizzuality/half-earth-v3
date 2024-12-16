import React from 'react';

import cx from 'classnames';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import styles from './species-group-component.module.scss';

function SpeciesGroupComponent(props) {
  const { species, selectedTaxaObj, setSelectedIndex, setScientificName } =
    props;
  const { asset_url, common, scientificname } = species;

  const selectSpecies = (species) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(species.scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, species.scientificname);
  };

  return (
    <div className={styles.speciesBox} onClick={() => selectSpecies(species)}>
      <div className={styles.imgBox}>
        {asset_url && (
          <img
            loading="lazy"
            src={`https://storage.googleapis.com/mol-assets2/thumbs/${asset_url}.jpg`}
          />
        )}
        {!asset_url && (
          <img
            loading="lazy"
            src={`https://mol.org/static/img/groups/taxa_${selectedTaxaObj.taxa}.png`}
          />
        )}
      </div>
      <div className={cx(styles.speciesText, styles.name)}>
        <div className={styles.common}>{common}</div>
        <div className={styles.sci}>{scientificname}</div>
      </div>
    </div>
  );
}

export default SpeciesGroupComponent;
