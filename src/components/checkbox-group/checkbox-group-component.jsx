import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './checkbox';

const CheckboxGroup = ({ options, theme, checkedOptions, handleClick }) => {
  const handleChange = (e, option) => {
    const item = option.value;
    const isChecked = e.target.checked;
    checkedOptions[item] = isChecked;
    handleClick(checkedOptions, option);
  }

  return (
    <div>
      {options.map(option => {
        return (
          <Checkbox key={option.name} option={option} theme={theme} checked={checkedOptions[option.value]} onChange={handleChange} />
        )
      })}
    </div>
  )
}

CheckboxGroup.propTypes = {
  options: PropTypes.array,
  theme: PropTypes.object,
  activeLayers: PropTypes.array
};

CheckboxGroup.defaultProps = {
  options: [],
  theme: {},
  activeLayers: []
};

export default CheckboxGroup;