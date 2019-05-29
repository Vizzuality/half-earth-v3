import React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from 'components/checkbox-group';

import styles from './multiple-active-layers-styles.module.scss';

const MultipleActiveLayers = ({ title, description, options, handleLayerToggle, theme, activeLayers }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleSection}>
        <h2 className={styles.widgetTitle}>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <CheckboxGroup handleLayerToggle={handleLayerToggle} activeLayers={activeLayers} options={options} title={title} theme={theme} />
    </div>
  )}


MultipleActiveLayers.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array,
  handleLayerToggle: PropTypes.func,
  theme: PropTypes.string,
  activeLayers: PropTypes.array
};

MultipleActiveLayers.defaultProps = {
  title: '',
  description: '',
  options: [],
  handleLayerToggle: () => {},
  theme: '',
  activeLayers: []
};

export default MultipleActiveLayers;