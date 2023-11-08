import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './styles.module';

function BasemapSelector({ landcoverBasemap, setLandcoverBasemap }) {
  const handleBasemapClick = () => setLandcoverBasemap(!landcoverBasemap);

  return (
    <button
      className={cx(styles.basemapContainer, {
        [styles.basemapDefault]: !landcoverBasemap,
        [styles.basemapLandcover]: landcoverBasemap,
      })}
      type="button"
      onClick={handleBasemapClick}
    >
      <p className={styles.basemapLabel}>
        {landcoverBasemap ? 'lancover' : 'default'}
      </p>
    </button>
  );
}

BasemapSelector.propTypes = {
  landcoverBasemap: PropTypes.bool,
  setLandcoverBasemap: PropTypes.func.isRequired,
};

BasemapSelector.defaultProps = {
  landcoverBasemap: false,
};

export default BasemapSelector;
