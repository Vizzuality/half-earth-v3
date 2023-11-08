import React from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module';

function BasemapSelector({ basemap, setBasemap }) {
  const handleBasemapClick = () => {
    if (basemap === 'default') {
      setBasemap('landcover');
    }
    if (basemap === 'landcover') {
      setBasemap('default');
    }
  };

  return (
    <button
      className={styles.basemapContainer}
      type="button"
      onClick={() => handleBasemapClick()}
    >
      <p className={styles.basemapLabel}>{basemap}</p>
    </button>
  );
}

BasemapSelector.propTypes = {
  basemap: PropTypes.oneOf(['default', 'landcover']),
  setBasemap: PropTypes.func.isRequired,
};

BasemapSelector.defaultProps = {
  basemap: 'default',
};

export default BasemapSelector;