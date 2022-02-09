import React, { useState } from 'react';
import cx from 'classnames';
import styles from '../menu-footer-styles.module';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';

const MobileSearchInput = ({
  option,
  handleSearchInputChange,
  isSearchResultVisible,
  searchResults,
  onOptionSelection,
}) => {
  const PARENT_WIDTH = '280px';

  const [popperElement, setPopperElement] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement
  );

  const renderSuggestionsPortal = ({
    popperStyles,
    attributes,
    setPopperElement,
  }) =>
    createPortal(
      <div
        ref={setPopperElement}
        style={{ ...popperStyles.popper, width: PARENT_WIDTH }}
        {...attributes.popper}
      >
        <ul className={cx(styles.optionsList)}>
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
    );

  return (
    <div
      key={option.key}
      className={cx(styles.option, styles.activeOptionContainer)}
    >
      <option.icon className={styles.icon} />
      <input
        type="text"
        placeholder={option.name}
        className={styles.input}
        ref={setReferenceElement}
        onChange={handleSearchInputChange}
      />
      {isSearchResultVisible &&
        renderSuggestionsPortal({
          popperStyles,
          attributes,
          setPopperElement,
        })}
    </div>
  );
};

export default MobileSearchInput;
