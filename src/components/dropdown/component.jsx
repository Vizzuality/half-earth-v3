import React from 'react';
import cx from 'classnames';
import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';

import styles from './styles.module.scss';

const Component = ({
  options,
  dropdownOpen,
  onDropdownToggle,
  selectedOption,
  onOptionSelection,
}) => (
  <div className={cx(styles.dropdownContainer, {
      [styles.open]: dropdownOpen
    })}
  >
    <div
      className={styles.toggleContainer}
      onClick={onDropdownToggle}
    >
      <span className={styles.selectedOptionLabel}>
        {selectedOption.label}
      </span>
      <IconArrow
        className={cx(styles.arrowIcon, {
          [styles.dropdownOpen]: dropdownOpen
        })}
      />
    </div>
    {dropdownOpen && (
      <ul className={styles.optionsList} name="filters" id="filters">
        {options.map((filter) => (
          <li
            className={cx(styles.option, {
              [styles.selectedOption]: filter.slug === selectedOption.slug
            })}
            key={filter.slug}
            onClick={() => onOptionSelection(filter.slug)}
          >
            {filter.label}
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default Component;
