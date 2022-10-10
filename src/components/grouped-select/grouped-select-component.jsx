/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import Select, { components } from 'react-select';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';

import styles from './grouped-select-styles.module.scss';
import { customStyles } from './style-constants';

function GroupedSelect({ onSelect, groupedOptions, selectedOption }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleChange = (option) => {
    onSelect(option);
  };

  function SingleValue({ children, ...props }) {
    return (
      <components.SingleValue
        {...props}
        className={cx(styles.singleValue, { 'visually-hidden': isMenuOpen })}
      >
        {children}
      </components.SingleValue>
    );
  }

  return (
    <Select
      value={selectedOption}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      onChange={handleChange}
      options={groupedOptions}
      styles={customStyles}
      // eslint-disable-next-line no-undef
      menuPortalTarget={document.body}
      menuPosition="fixed"
      isOptionDisabled={(option) =>
        selectedOption && option.name === selectedOption.name
      }
      components={{
        GroupHeading: (props) => {
          const { data } = props;
          return data.label ? (
            <p className={styles.groupHeading}>{data.label}</p>
          ) : null;
        },
        IndicatorSeparator: () => null,
        SingleValue,
        DropdownIndicator: (props) => {
          const {
            selectProps: { menuIsOpen },
          } = props;
          return (
            <IconArrow
              className={cx({
                [styles.arrowIcon]: true,
                [styles.arrowIconDropdownOpen]: menuIsOpen,
              })}
            />
          );
        },
      }}
    />
  );
}

GroupedSelect.propTypes = {
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default GroupedSelect;
