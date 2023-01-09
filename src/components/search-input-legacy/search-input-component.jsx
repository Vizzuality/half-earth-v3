import React from 'react';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { ReactComponent as SearchIcon } from 'icons/search-input.svg';

import styles from './search-input-styles.module';

function SearchInput({ placeholder, onChange, value, className }) {
  const t = useT();

  return (
    <div className={cx(styles.searchInputContainer, className)}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder || t('Search')}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

SearchInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  value: '',
  className: undefined,
};

export default SearchInput;
