import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';
import Proptypes from 'prop-types';
import styles from './dropdown-styles.module.scss';

import { usePopper } from 'react-popper';



const Component = ({
  width,
  theme,
  stacked,
  options,
  dropdownOpen,
  parentWidth,
  onDropdownToggle,
  selectedOption,
  onOptionSelection,
  disabled,
  groups,
}) => {

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement);
  const renderFilters = () => {
    const renderOptions = (groupFilter) => {
      const filteredOptions = groupFilter ? options.filter(option => option.group === groupFilter) : options;
      return filteredOptions.filter(option => option.group === groupFilter).map((option) => (
        <li
          className={cx(styles.option, {
            [styles.selectedOption]: option.slug === selectedOption.slug,
          })}
          key={option.slug}
          onClick={() => onOptionSelection(option)}
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

  return  (
    <div className={cx(styles.dropdownContainer, {
        [styles.stacked]: stacked,
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
        ref={setReferenceElement}
      >
        <span className={styles.selectedOptionLabel}>
          {selectedOption && selectedOption.label}
        </span>
        <IconArrow
          className={cx(styles.arrowIcon, {
            [styles.dropdownOpen]: dropdownOpen
          })}
        />
      </div>
      {dropdownOpen && (
        createPortal(
          <div
            ref={setPopperElement}
            style={{ ...popperStyles.popper, width: parentWidth }}
            {...attributes.popper}
          >
            <ul className={cx(styles.optionsList, {
              [styles.fullWidth]: width === 'full'
            })} 
              name="filters"
              id="filters">
              {renderFilters()}
            </ul>
          </div>,
          document.getElementById('root')
        )
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