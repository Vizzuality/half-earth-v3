/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import cx from 'classnames';

import styles from './styles.module.scss';

import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';

function Select({
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
  onSelect,

}) {
  console.log({ selectedOption });
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
  );

  const showDropdown = !searchMode || (searchMode && options && options.length > 0);

  return (
    <div
      className={cx(styles.dropdownContainer, {
        [styles.stacked]: stacked,
        [styles.open]: dropdownOpen,
        [styles.fullWidth]: width === 'full',
        [styles.dark]: theme === 'dark',
        [styles.disabled]: disabled,
      })}
    >

      {showDropdown && (
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

          <IconArrow
            className={cx(styles.arrowIcon, {
              [styles.dropdownOpen]: dropdownOpen,
            })}
          />

        </div>
      )}
      {dropdownOpen
        && createPortal(
          <div
            ref={setPopperElement}
            style={{ ...popperStyles.popper, width: parentWidth, zIndex: 10 }}
            {...attributes.popper}
          >
            <ul
              className={cx(styles.optionsList, {
                [styles.fullWidth]: width === 'full',
              })}
              name="filters"
              id="filters"
            >
              {options.map((opt) => {
                return (
                  <li className={cx(styles.group)} key={opt.value}>
                    <buuton onClick={() => onSelect(opt)}>
                      {opt.title}
                    </buuton>
                    {/* <ul className={styles.groupList}>{renderOptions(group)}</ul> */}
                  </li>
                );
              })}
            </ul>
          </div>,
          // eslint-disable-next-line no-undef
          document.getElementById('root'),
        )}
    </div>
  );
}

export default Select;
