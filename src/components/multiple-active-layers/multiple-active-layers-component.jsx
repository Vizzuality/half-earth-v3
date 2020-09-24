import React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroup from 'components/checkbox-group';

import styles from './multiple-active-layers-styles.module.scss';

const MultipleActiveLayers = ({ title, description, options, handleClick, theme, alreadyChecked }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleSection}>
        <h2 className={styles.widgetTitle}>{title}</h2>
      </div>
      <p className={styles.description}>{description}</p>
      <CheckboxGroup
        handleClick={handleClick}
        checkedOptions={alreadyChecked}
        options={options}
        theme={theme}
      />
    </div>
  )}


MultipleActiveLayers.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array,
  handleClick: PropTypes.func,
  theme: PropTypes.object,
  alreadyChecked: PropTypes.object
};

MultipleActiveLayers.defaultProps = {
  title: '',
  description: '',
  options: [],
  handleClick: () => {},
  theme: {},
  alreadyChecked: {}
};

export default MultipleActiveLayers;