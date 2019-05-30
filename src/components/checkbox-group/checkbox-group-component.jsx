import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Checkbox from './checkbox';
import styles from './checkbox-group-styles.module.scss';

const CheckboxGroup = ({ options, title }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    checkedItems[item] = isChecked;
    const map = { ...checkedItems }; // re-render happens only when we're setting a new object, modifying the old one doesn't trigger it
    setCheckedItems(map);
  }

  return (
    <div className={styles.container}>
      {options.map(option => (
        <Checkbox option={option} checked={checkedItems[option.name]} onChange={handleChange} />
      ))}
    </div>
  )
}

CheckboxGroup.propTypes = {
  options: PropTypes.array,
  title: PropTypes.string
};

CheckboxGroup.defaultProps = {
  options: [],
  title: ''
};

export default CheckboxGroup;