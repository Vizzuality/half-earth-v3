import React, { useState } from 'react';
import Component from './dropdown-component.jsx';

const DropdownContainer = ({
  handleOptionSelection,
  onSearch,
  ...props
}) => {
  const [dropdownOpen, setDropdownToggle] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const onOptionSelection = (selectedOption) => {
    handleOptionSelection(selectedOption)
    setDropdownToggle(false);
  }

  const dropdownToggle = () => {
    setDropdownToggle(!dropdownOpen);
  }

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchValue);
    }
  }

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <Component
      dropdownOpen={dropdownOpen}
      onDropdownToggle={dropdownToggle}
      onOptionSelection={onOptionSelection}
      handleSearchKeyPress={handleSearchKeyPress}
      handleSearchInputChange={handleSearchInputChange}
      {...props}
    />
  )
}

export default DropdownContainer;
