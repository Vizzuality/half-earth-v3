import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import RadioGroup from 'components/radio-group';

import styles from './biodiversity-layers-styles.module.scss';

const BiodiversityLayers = ({ title, description, options }) => (
  <div className={styles.wrapper}>
    <div className={styles.titleSection}>
      <h2 className={styles.widgetTitle}>{title}</h2>
    </div>
    <p className={styles.description}>{description}</p>
    <RadioGroup options={options} />
  </div>
)


BiodiversityLayers.propTypes = {
};

BiodiversityLayers.defaultProps = {
};

export default BiodiversityLayers;