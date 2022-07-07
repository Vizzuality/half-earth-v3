import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { useT } from '@transifex/react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { ReactComponent as IconSearch } from 'icons/search.svg';
import Proptypes from 'prop-types';
import styles from './styles.module.scss';

const Component = ({
  width,
  theme,
  stacked,
  disabled,
  parentWidth,
  searchResults,
  handleOpenSearch,
  onOptionSelection,
  handleInputChange,
  isSearchResultVisible,
}) => {
  const t = useT();

  const [popperElement, setPopperElement] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement
  );

  return (
    <div
      className={cx(styles.inputContainer, {
        [styles.stacked]: stacked,
        [styles.fullWidth]: width === 'full',
        [styles.dark]: theme === 'dark',
        [styles.disabled]: disabled,
      })}
    >
      <input
        type="text"
        placeholder={t('search')}
        className={styles.input}
        ref={setReferenceElement}
        onClick={handleOpenSearch}
        onChange={handleInputChange}
      />
      {<IconSearch className={styles.placeholderIcon} />}
      {isSearchResultVisible &&
        createPortal(
          <div
            ref={setPopperElement}
            style={{ ...popperStyles.popper, width: parentWidth }}
            {...attributes.popper}
          >
            <ul
              className={cx(styles.optionsList, {
                [styles.fullWidth]: width === 'full',
              })}
            >
              {searchResults.map((option) => (
                <li
                  className={styles.option}
                  key={option.key}
                  onClick={() => {
                    onOptionSelection(option);
                  }}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>,
          document.getElementById('root')
        )}
    </div>
  );
};

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
  selectedOption: Proptypes.shape(),
  onOptionSelection: Proptypes.func.isRequired,
  width: Proptypes.oneOf(['fluid', 'full']),
  theme: Proptypes.oneOf(['light', 'dark']),
};

Component.defaultProps = {
  width: 'fluid',
  theme: 'light',
};
