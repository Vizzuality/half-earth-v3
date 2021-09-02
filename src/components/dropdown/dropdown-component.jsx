import React from 'react';
import cx from 'classnames';
import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';
import Proptypes from 'prop-types';
import styles from './dropdown-styles.module.scss';

const Component = ({
  width,
  theme,
  options,
  dropdownOpen,
  onDropdownToggle,
  selectedOption,
  onOptionSelection,
  disabled,
  groups,
}) => {
  const renderFilters = () => {
    const renderOptions = (groupFilter) => {
      const filteredOptions = groupFilter ? options.filter(option => option.group === groupFilter) : options;
      return filteredOptions.filter(option => option.group === groupFilter).map((option) => (
        <li
          className={cx(styles.option, {
            [styles.selectedOption]: option.slug === selectedOption.slug,
          })}
          key={option.slug}
          onClick={() => onOptionSelection(option.slug)}
        >
          {option.label}
        </li>
      ))
    };

    return groups
      ? groups.map((group) => (
          <li className={cx(styles.group)} key={group}>
            <ul className={styles.groupList}>
              {renderOptions(group)}
            </ul>
          </li>
        ))
      : renderOptions();
  }

  return (
    <div className={cx(styles.dropdownContainer, {
        [styles.open]: dropdownOpen,
        [styles.fullWidth]: width === 'full',
        [styles.dark]: theme === 'dark',
        [styles.disabled]: disabled
      })}
    >
      <div
        className={cx(styles.toggleContainer, {
          [styles.fullWidth]: width === 'full'
        })}
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
        <ul className={cx(styles.optionsList, {
          [styles.fullWidth]: width === 'full'
        })} 
          name="filters"
          id="filters">
          {renderFilters()}
        </ul>
      )}
    </div>
  );
}

export default Component;

Component.propTypes = {
  options: Proptypes.arrayOf(
    Proptypes.shape({
      label: Proptypes.string,
      slug: Proptypes.string,
      group: Proptypes.string,
    })
  ),
  dropdownOpen: Proptypes.bool,
  hasGroups: Proptypes.bool,
  onDropdownToggle: Proptypes.func.isRequired,
  selectedOption: Proptypes.shape(),
  onOptionSelection: Proptypes.func.isRequired,
  width: Proptypes.oneOf(['fluid', 'full']),
  theme: Proptypes.oneOf(['light', 'dark'])
};

Component.defaultProps = {
  width: 'fluid',
  theme: 'light'
}