import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from './checkbox';
import styles from './checkbox-group-styles.module.scss';

const CheckboxGroup = ({ options, title, handleLayerToggle, theme, checkedOptions, handleHumanPressureRasters, handleClick }) => {
  const [checkedItems, setCheckedItems] = useState(checkedOptions);

  const handleChange = (e, option) => {
    const item = option.value;
    const isChecked = e.target.checked;
    checkedItems[item] = isChecked;
    const map = { ...checkedItems }; // re-render happens only when we're setting a new object, modifying the old one doesn't trigger it
    setCheckedItems(map);
    handleClick(map, option);
  }

  return (
    <div className={styles.container}>
      {options.map(option => (
        <Checkbox key={option.name} option={option} theme={theme[option.theme]} checked={checkedItems[option.value]} onChange={handleChange} />
      ))}
    </div>
  )
}

CheckboxGroup.propTypes = {
  options: PropTypes.array,
  handleLayerToggle: PropTypes.func,
  theme: PropTypes.object,
  activeLayers: PropTypes.array
};

CheckboxGroup.defaultProps = {
  options: [],
  handleLayerToggle: () => {},
  theme: {},
  activeLayers: []
};

export default CheckboxGroup;