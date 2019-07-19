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
        <img src={molLogo} className={styles.molLogo} alt="logo" />
      </a>}
      <p className={styles.title}>{name}</p>
    </div>
  );
};

LegendTitleComponent.propTypes = {
  activeLayer: PropTypes.shape(),
  name: PropTypes.string
};

LegendTitleComponent.defaultProps = { activeLayer: null, name: '' };

export default LegendTitleComponent;
