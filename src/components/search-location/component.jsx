/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { useT } from '@transifex/react';

import Proptypes from 'prop-types';

import cx from 'classnames';
import { motion } from 'framer-motion';
import { ReactComponent as CloseIcon } from 'icons/menu-close.svg';
import { ReactComponent as IconSearch } from 'icons/search.svg';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import styles from './styles.module.scss';

function SearchLocation({
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
  onboardingType,
  onboardingStep,
  waitingInteraction,
  changeUI,
  reference,
  hasResetButton,
  handleCloseButton,
  className = {},
  setSearcherOpen,
}) {
  const t = useT();

  const [popperElement, setPopperElement] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
  );

  const onNextonboardingStep = useCallback((countryValue) => {
    if (countryValue && onboardingStep !== null) {
      changeUI({ onboardingStep: 2, waitingInteraction: false });
    }
    return null;
  }, []);

  const { overlay: onboardingOverlay } = getOnboardingProps({
    section: 'searchNRC',
    styles,
    changeUI,
    onboardingType,
    onboardingStep,
    waitingInteraction,
  });
  return (
    <motion.div
      ref={reference}
      className={cx(styles.inputContainer, {
        [styles.stacked]: stacked,
        [styles.fullWidth]: width === 'full',
        [styles.dark]: theme === 'dark',
        [styles.disabled]: disabled,
        [className.inputContainer]: className.inputContainer,
      })}
      {...onboardingOverlay}
    >
      <input
        type="text"
        placeholder={t('search')}
        className={styles.input}
        ref={setReferenceElement}
        onClick={handleOpenSearch}
        onChange={handleInputChange}
      />

      <IconSearch className={cx(styles.placeholderIcon, {
        [className.placeholderIcon]: className.placeholderIcon,
      })}
      />
      {isSearchResultVisible
        && createPortal(
          <div
            ref={setPopperElement}
            style={{ ...popperStyles.popper, width: parentWidth }}
            className={styles.searchResultsList}
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
                    setSearcherOpen(false);
                    onNextonboardingStep(option);
                  }}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>,
          // eslint-disable-next-line no-undef
          document.getElementById('root'),
        )}
      {hasResetButton && (
        <button
          type="button"
          onClick={handleCloseButton}
        >
          <CloseIcon className={styles.closeButton} />
        </button>
      )}
    </motion.div>
  );
}

export default SearchLocation;

SearchLocation.propTypes = {
  dropdownOpen: Proptypes.bool,
  hasResetButton: Proptypes.bool,
  handleCloseButton: Proptypes.func.isRequired,
  onOptionSelection: Proptypes.func.isRequired,
  options: Proptypes.arrayOf(
    Proptypes.shape({
      label: Proptypes.string,
      slug: Proptypes.string,
      group: Proptypes.string,
    }),
  ).isRequired,
  reference: Proptypes.node.isRequired,
  selectedOption: Proptypes.shape().isRequired,
  simple: Proptypes.bool,
  theme: Proptypes.oneOf(['light', 'dark']),
  width: Proptypes.oneOf(['fluid', 'full']),
};

SearchLocation.defaultProps = {
  hasResetButton: false,
  dropdownOpen: false,
  simple: false,
  theme: 'light',
  width: 'fluid',
};
