import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from './checkbox';
import styles from './checkbox-group-styles.module.scss';

const CheckboxGroup = ({ options, title, handleLayerToggle, theme, activeLayers }) => {
  const alreadyChecked = options.reduce((acc, option) => ({ 
    ...acc, [option.name]: activeLayers.some(layer => layer.id === option.id) 
  }), {});

  const [checkedItems, setCheckedItems] = useState(alreadyChecked);

  const handleChange = (e, option) => {
    const item = option.name;
    const isChecked = e.target.checked;
    checkedItems[item] = isChecked;
    const map = { ...checkedItems }; // re-render happens only when we're setting a new object, modifying the old one doesn't trigger it
    setCheckedItems(map);
    handleLayerToggle(option.id);
  }

  return (
    <div className={styles.container}>
      {options.map(option => (
        <Checkbox option={option} theme={theme} checked={checkedItems[option.name]} onChange={handleChange} />
      ))}
    </div>
  )
}

CheckboxGroup.propTypes = {
  options: PropTypes.array,
  title: PropTypes.string,
  handleLayerToggle: PropTypes.func,
  theme: PropTypes.string,
  activeLayers: PropTypes.array
};

CheckboxGroup.defaultProps = {
  options: [],
  title: '',
  handleLayerToggle: () => {},
  theme: '',
  activeLayers: []
};

export default CheckboxGroup;