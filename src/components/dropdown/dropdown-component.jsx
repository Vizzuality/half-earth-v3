import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { ReactComponent as SearchIcon } from 'icons/search-species.svg';

import styles from './dropdown-styles.module.scss';

function Component({
  className,
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
  handleSearchIconClick,
  onCloseSearch,
}) {
  const t = useT();

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement
  );

  const showDropdown =
    !searchMode || (searchMode && options && options.length > 0);
  const showSearchInput =
    searchMode && (!options || (options && options.length === 0));
  const showCloseButton = searchMode && options && options.length > 0;

  const renderFilters = () => {
    const renderOptions = (groupFilter) => {
      const filteredOptions = groupFilter
        ? options.filter((option) => option.group === groupFilter)
        : options;
      return filteredOptions
        .filter((option) => option.group === groupFilter)
        .map((option) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li
            className={cx(styles.option, {
              [styles.selectedOption]:
                selectedOption && option.slug === selectedOption.slug,
            })}
            key={option.slug}
            onClick={() => onOptionSelection(option)}
          >
            {option.label}
          </li>
        ));
    };

    return groups
      ? groups.map((group) => (
          <li className={cx(styles.group)} key={group}>
            <ul className={styles.groupList}>{renderOptions(group)}</ul>
          </li>
        ))
      : renderOptions();
  };

  return (
    <div
      className={cx(styles.dropdownContainer, {
        [styles.stacked]: stacked,
        [styles.open]: dropdownOpen,
        [styles.fullWidth]: width === 'full',
        [styles.dark]: theme === 'dark',
        [styles.disabled]: disabled,
        [className]: !!className,
      })}
    >
      {showSearchInput && (
        <div className={styles.searchInput}>
          <SearchIcon
            className={styles.searchIcon}
            onClick={handleSearchIconClick}
          />
          <input
            onKeyPress={handleSearchKeyPress}
            onChange={handleSearchInputChange}
            type="text"
            placeholder={placeholderText || t('SEARCH')}
          />
        </div>
      )}
      {showDropdown && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className={cx(styles.toggleContainer, {
            [styles.fullWidth]: width === 'full',
          })}
          onClick={onDropdownToggle}
          ref={setReferenceElement}
        >
          <span className={styles.selectedOptionLabel}>
            {selectedOption && selectedOption.label}
          </span>
          {!showCloseButton && (
            <IconArrow
              className={cx(styles.arrowIcon, {
                [styles.dropdownOpen]: dropdownOpen,
              })}
            />
          )}
          {showCloseButton && (
            <AnimatePresence>
              <motion.div
                className={styles.closeSearch}
                whileHover={{
                  backgroundColor: '#7B878D',
                  fill: 'white',
                }}
              >
                <CloseIcon onClick={onCloseSearch} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
      {dropdownOpen &&
        createPortal(
          <div
            ref={setPopperElement}
            style={{ ...popperStyles.popper, width: parentWidth, zIndex: 10 }}
            {...attributes.popper}
          >
            <ul
              className={cx(styles.optionsList, {
                [styles.fullWidth]: width === 'full',
                [styles[`${theme}OptionsList`]]: theme,
              })}
              name="filters"
              id="filters"
            >
              {renderFilters()}
            </ul>
          </div>,
          // eslint-disable-next-line no-undef
          document.getElementById('root')
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
  parentWidth: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  searchMode: PropTypes.bool,
};

Component.defaultProps = {
  options: [],
  placeholderText: undefined,
  width: 'fluid',
  theme: 'light',
  searchMode: false,
  dropdownOpen: false,
  hasGroups: false,
  parentWidth: undefined,
  selectedOption: undefined,
  onSearch: undefined,
};
