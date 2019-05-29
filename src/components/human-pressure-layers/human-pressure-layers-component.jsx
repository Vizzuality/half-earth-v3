import React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from 'components/checkbox-group';

import styles from './human-pressure-layers-styles.module.scss';

const HumanPressureLayers = ({ title, description, options }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleSection}>
        <h2 className={styles.widgetTitle}>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <CheckboxGroup options={options} title={title} />
    </div>
  )}


HumanPressureLayers.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array
};

HumanPressureLayers.defaultProps = {
  title: '',
  description: '',
  options: []
};

export default HumanPressureLayers;