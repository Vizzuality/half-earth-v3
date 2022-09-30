/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import Select from 'react-select';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';

import styles from './grouped-select-styles.module.scss';
import { customStyles } from './style-constants';

function GroupedSelect({ onSelect, groupedOptions }) {
  const t = useT();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <Select
      value={selectedOption}
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
        IndicatorSeparator: () => null,
        SingleValue: (v) => {
          const { data } = v;
          return <p className={styles.singleValue}>{t(data.label)}</p>;
        },
        DropdownIndicator: ({ selectProps: { menuIsOpen } }) => (
          <IconArrow
            className={cx({
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
  groupedOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default GroupedSelect;
