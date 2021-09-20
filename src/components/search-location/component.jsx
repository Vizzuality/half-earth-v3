import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { ReactComponent as IconArrow } from 'icons/arrow_right.svg';
import Proptypes from 'prop-types';
import styles from './styles.module.scss';

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

  return  (
    <div className={cx(styles.dropdownContainer, {
      [styles.stacked]: stacked,
        [styles.open]: dropdownOpen,
        [styles.fullWidth]: width === 'full',
        [styles.dark]: theme === 'dark',
        [styles.disabled]: disabled
      })}
    >
      <input
        className={styles.input}
        onChange={onDropdownToggle}
        ref={setReferenceElement}
        type="text"
        placeholder={'search'}
      />
        {/* <span className={styles.selectedOptionLabel}>
          Search
        </span>
        <IconArrow
          className={cx(styles.arrowIcon, {
            [styles.dropdownOpen]: dropdownOpen
          })}
        /> */}
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
              <li
                className={cx(styles.option, {
                  // [styles.selectedOption]: option.slug === selectedOption.slug,
                })}
                // key={option.slug}
                onClick={() => {}}
              >
                one filter
              </li>
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