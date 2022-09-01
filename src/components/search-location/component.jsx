import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { motion } from 'framer-motion';
import { ReactComponent as CloseIcon } from 'icons/menu-close.svg';
import { ReactComponent as IconSearch } from 'icons/search.svg';
import Proptypes from 'prop-types';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import styles from './styles.module.scss';

function Component({
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

export default Component;

Component.propTypes = {
  options: Proptypes.arrayOf(
    Proptypes.shape({
      label: Proptypes.string,
      slug: Proptypes.string,
      group: Proptypes.string,
    }),
  ),
  dropdownOpen: Proptypes.bool,
  hasGroups: Proptypes.bool,
  selectedOption: Proptypes.shape(),
  onOptionSelection: Proptypes.func.isRequired,
  width: Proptypes.oneOf(['fluid', 'full']),
  theme: Proptypes.oneOf(['light', 'dark']),
  reference: Proptypes.node,
  hasResetButton: Proptypes.bool,
  handleCloseButton: Proptypes.func,
};

Component.defaultProps = {
  dropdownOpen: false,
  hasResetButton: false,
  theme: 'light',
  width: 'fluid',
};
