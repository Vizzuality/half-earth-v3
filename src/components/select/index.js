import React, { useState } from 'react';

import Component from './component.jsx';

function SelectContainer({
  handleOptionSelection,
  ...props
}) {
  const [dropdownOpen, setDropdownToggle] = useState(false);

  const onOptionSelection = (selectedOption) => {
    handleOptionSelection(selectedOption);
    setDropdownToggle(false);
  };

  const dropdownToggle = () => {
    setDropdownToggle(!dropdownOpen);
  };

  return (
    <Component
      dropdownOpen={dropdownOpen}
      onDropdownToggle={dropdownToggle}
      onOptionSelection={onOptionSelection}
      {...props}
    />
  );
}

export default SelectContainer;
