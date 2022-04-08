// Dependencies
import React, { useCallback, useState } from 'react';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { motion } from 'framer-motion';
import Proptypes from 'prop-types';
// Assets
import { ReactComponent as IconSearch } from 'icons/search.svg';
// Styles
import styles from './styles.module.scss';
import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

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
  onboardingType,
  onboardingStep,
  waitingInteraction,
  changeUI,
  reference,
}) => {
  const currentStep = onboardingStep === 2;

  const [popperElement, setPopperElement] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement
  );

  const onNextonboardingStep = useCallback((countryValue) => {
    if (countryValue && onboardingStep !== null) {
      changeUI({ onboardingStep: 3, waitingInteraction: false });
    }
    return null;
  }, []);

  const { overlay: onboardingOverlay, className: onboardingClassName } =
    getOnboardingProps({
      section: 'searchNRC',
      styles,
      changeUI,
      onboardingType,
      onboardingStep,
      waitingInteraction,
    });
  console.log(
    onboardingOverlay,
    onboardingType,
    onboardingStep,
    waitingInteraction
  );
  return (
    <motion.div
      ref={reference}
      className={cx(styles.inputContainer, {
        [styles.stacked]: stacked,
        [styles.fullWidth]: width === 'full',
        [styles.dark]: theme === 'dark',
        [styles.disabled]: disabled,
        ...onboardingClassName,
        [styles.onboardingOverlay]: !currentStep,
      })}
      {...onboardingOverlay}
    >
      <input
        type="text"
        placeholder={'search'}
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
                    onNextonboardingStep(option);
                  }}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>,
          document.getElementById('root')
        )}
    </motion.div>
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
  reference: Proptypes.node,
};

Component.defaultProps = {
  width: 'fluid',
  theme: 'light',
};
