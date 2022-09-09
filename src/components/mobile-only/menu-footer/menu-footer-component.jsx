/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import cx from 'classnames';

import { FOOTER_OPTIONS } from 'constants/mobile-only';

import styles from './menu-footer-styles.module';
// eslint-disable-next-line import/extensions
import MobileSearchInput from './mobile-search-input';

function MenuFooter({
  options,
  activeOption,
  handleSearchInputChange,
  isSearchResultVisible,
  searchResults,
  onOptionSelection,
}) {
  const isActive = (o) => activeOption && o.key === activeOption;

  return (
    <div className={styles.menuContainer}>
      {options.length
        && options.map((option) => ((option.key === FOOTER_OPTIONS.SEARCH
          && activeOption === FOOTER_OPTIONS.SEARCH) ? (
            <MobileSearchInput
              option={option}
              handleSearchInputChange={handleSearchInputChange}
              isSearchResultVisible={isSearchResultVisible}
              searchResults={searchResults}
              onOptionSelection={onOptionSelection}
            />
          ) : (
            <div
              role="button"
              tabIndex={0}
              key={option.key}
              onClick={option.onClickHandler}
              className={cx(styles.option, {
                [styles.activeOptionContainer]: isActive(option),
              })}
            >
              <option.icon className={styles.icon} />
              <span className={styles.title}>{option.name}</span>
            </div>
          )))}
    </div>
  );
}

export default MenuFooter;
