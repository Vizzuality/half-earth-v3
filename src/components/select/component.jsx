/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import Select from 'react-select';

import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './styles.module.scss';

import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';

import { customStyles } from './constants';

function GroupedSelect({
  onSelect,
  groupedOptions,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (value) => {
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={groupedOptions}
      styles={customStyles}
      placeholder="All Groups"
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: ({ selectProps: { menuIsOpen } }) => (
          <IconArrow className={cx({
            [styles.arrowIcon]: true,
            [styles.arrowIconDropdownOpen]: menuIsOpen,
          })}
          />
        ),

      }}
    />
  );
}

GroupedSelect.propTypes = {
  groupedOptions: PropTypes.objectOf.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default GroupedSelect;
