import React from 'react';
import PropTypes from 'prop-types';

import styles from './legend-title-styles.module.scss';
import molLogo from 'logos/mol_short_logo.png';

const LegendTitleComponent = ({ name, layer }) => {
  return (
    <div className={styles.titleContainer}>
      {layer.molLogo && <a
        href='https://mol.org/'
        className={styles.imageLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={molLogo} alt="logo" />
      </a>}
      <div>{name}</div>
    </div>
  );
};

LegendTitleComponent.propTypes = {
  activeLayer: PropTypes.shape(),
  name: PropTypes.string.isRequired,
  layers: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

LegendTitleComponent.defaultProps = { activeLayer: null };

export default LegendTitleComponent;
