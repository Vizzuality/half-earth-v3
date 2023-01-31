/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { useT } from '@transifex/react';

import Proptypes from 'prop-types';

import { useClickOutside } from 'utils/ui-utils';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import {
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
  WDPA_OECM_FEATURE_LAYER,
} from 'constants/layers-slugs';

import styles from './styles.module.scss';

import { ReactComponent as CloseIcon } from 'icons/menu-close.svg';
import { ReactComponent as IconSearch } from 'icons/search.svg';

const getLayerTypeText = (layer, _t) =>
  ({
    [GADM_0_ADMIN_AREAS_FEATURE_LAYER]: _t('Political boundary'),
    [GADM_1_ADMIN_AREAS_FEATURE_LAYER]: _t('Political boundary'),
    [WDPA_OECM_FEATURE_LAYER]: _t('Protected area'),
  }[layer]);

function SearchLocation({
  width,
  theme,
  stacked,
  disabled,
  parentWidth,
  searchResults,
  handleOpenSearch,
  handleCloseOptionList,
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
  searchType,
  placeholder,
  mobile,
  searchLocationModal,
}) {
  const t = useT();
  const searchOptionsListRef = useRef();
  const inputRef = useRef();

  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    inputRef && inputRef.current,
    popperElement
  );

  useClickOutside(searchOptionsListRef, handleCloseOptionList, inputRef);

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

  useEffect(() => {
    if (mobile) {
      inputRef.current.focus();
    }
  }, [searchLocationModal]);

  const renderSuggestion = (text) => {
    const [name, layer] = text.split('|');
    const layerTypeText = layer && getLayerTypeText(layer, t);
    return (
      <div className={styles.suggestion}>
        <span>{name}</span>
        {layer && (
          <span className={styles.suggestionLayerType}>{layerTypeText}</span>
        )}
      </div>
    );
  };

  return (
    <form>
      <motion.div
        ref={reference}
        className={cx(styles.inputContainer, {
          [styles.stacked]: stacked,
          [styles.fullWidth]: width === 'full',
          [styles.dark]: theme === 'dark',
          [styles.mobile]: theme === 'mobile',
          [styles.disabled]: disabled,
          [className.inputContainer]: className.inputContainer,
        })}
        {...onboardingOverlay}
      >
        <input
          type="text"
          placeholder={placeholder || t('search')}
          className={styles.input}
          ref={inputRef}
          onClick={handleOpenSearch}
          onFocus={handleOpenSearch}
          onChange={(e) => handleInputChange(e)}
        />

        <IconSearch
          className={cx(styles.placeholderIcon, {
            [className.placeholderIcon]: className.placeholderIcon,
          })}
        />

        {isSearchResultVisible &&
          createPortal(
            <div
              ref={setPopperElement}
              style={{ ...popperStyles.popper, width: parentWidth }}
              className={cx({
                [styles.searchResultsList]: true,
                [styles.searchResultsListMobile]: mobile,
              })}
              {...attributes.popper}
            >
              <ul
                className={cx(styles.optionsList, {
                  [styles.fullWidth]: width === 'full',
                  [styles.mobile]: mobile,
                })}
                ref={searchOptionsListRef}
              >
                {searchResults.length > 0 ? (
                  searchResults.map((option) => (
                    <li
                      className={styles.option}
                      key={option.key}
                      onClick={() => {
                        onOptionSelection(option);
                        if (setSearcherOpen) {
                          setSearcherOpen(false);
                        }
                        onNextonboardingStep(option);
                      }}
                    >
                      {renderSuggestion(option.text)}
                    </li>
                  ))
                ) : (
                  <li className={styles.emptyOption}>
                    {searchType === 'full'
                      ? t(
                          'No results found. Please search another place or draw a custom area.'
                        )
                      : t('No results found. Please search another place.')}
                  </li>
                )}
              </ul>
            </div>,
            // eslint-disable-next-line no-undef
            document.getElementById('root')
          )}
        {hasResetButton && (
          <button type="button" onClick={() => handleCloseButton()}>
            {mobile && (
              <input type="reset" value="" className={styles.resetBtn} />
            )}
            <CloseIcon className={styles.closeIcon} />
          </button>
        )}
      </motion.div>
    </form>
  );
}

export default SearchLocation;

SearchLocation.propTypes = {
  dropdownOpen: Proptypes.bool,
  hasResetButton: Proptypes.bool,
  handleCloseButton: Proptypes.func,
  onOptionSelection: Proptypes.func.isRequired,
  reference: Proptypes.func,
  searchType: Proptypes.oneOf(['simple', 'country', 'full']),
  theme: Proptypes.oneOf(['light', 'dark', 'mobile']),
  width: Proptypes.oneOf(['fluid', 'full']),
};

SearchLocation.defaultProps = {
  hasResetButton: false,
  dropdownOpen: false,
  searchType: 'full',
  theme: 'light',
  width: 'fluid',
  reference: undefined,
  handleCloseButton: undefined,
};
