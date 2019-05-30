import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from 'components/radio-group';

import styles from './biodiversity-layers-styles.module.scss';

const BiodiversityLayers = ({ map, title, description, options, defaultSelection, handleLayerToggle }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleSection}>
        <h2 className={styles.widgetTitle}>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <RadioGroup options={options} title={title} defaultSelection={defaultSelection} handleLayerToggle={handleLayerToggle}/>
    </div>
  )}


BiodiversityLayers.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array
};

BiodiversityLayers.defaultProps = {
  title: '',
  description: '',
  options: []
};

export default BiodiversityLayers;