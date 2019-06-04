import React from 'react';
import PropTypes from 'prop-types';

import styles from './legend-title-styles.module.scss';
import molLogo from 'logos/mol_short_logo.png';

const LegendTitleComponent = ({ layers, name, activeLayer }) => {
  console.log('title')
  return (
    <div className={styles.titleContainer}>
      <a
        href={'TODO'}
        className={styles.imageLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={molLogo} alt="logo" />
      </a>
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
