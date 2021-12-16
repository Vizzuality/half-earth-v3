import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';

// icons
import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';
import { ReactComponent as SearchIcon } from 'icons/search-species.svg';

// styles
import styles from './dropdown-styles.module.scss';

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
  searchMode,
  placeholderText,
  handleSearchKeyPress,
  handleSearchInputChange,
}) => {

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement);
  const showDropdown = !searchMode || (searchMode && options && options.length > 0);
  const showSearchInput = searchMode && (!options || (options && options.length === 0));
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

  return (
    <div className={cx(styles.dropdownContainer, {
      [styles.stacked]: stacked,
      [styles.open]: dropdownOpen,
      [styles.fullWidth]: width === 'full',
      [styles.dark]: theme === 'dark',
      [styles.disabled]: disabled
    })}
    >
      {showSearchInput && (
        <div className={styles.searchInput}>
          <SearchIcon />
          <input onKeyPress={handleSearchKeyPress} onChange={handleSearchInputChange} type="text" placeholder={placeholderText} />
        </div>
      )}
      {showDropdown && (
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
      )}
      {dropdownOpen && (
        createPortal(
          <div
            ref={setPopperElement}
            style={{ ...popperStyles.popper, width: parentWidth, zIndex: 10 }}
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      slug: PropTypes.string,
      group: PropTypes.string,
    })
  ),
  placeholderText: PropTypes.string,
  dropdownOpen: PropTypes.bool,
  hasGroups: PropTypes.bool,
  onDropdownToggle: PropTypes.func.isRequired,
  selectedOption: PropTypes.shape(),
  onOptionSelection: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  width: PropTypes.oneOf(['fluid', 'full']),
  theme: PropTypes.oneOf(['light', 'dark']),
  searchMode: PropTypes.bool,
};

Component.defaultProps = {
  width: 'fluid',
  theme: 'light',
  placeholderText: 'SEARCH',
  searchMode: false,
}
