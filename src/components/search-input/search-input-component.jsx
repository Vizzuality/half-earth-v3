import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from "icons/search.svg";
import cx from 'classnames';
import styles from './search-input-styles.module';

const SearchInput = ({ placeholder, onChange, value, type, className }) => {
  return (
    <div
      className={cx(
        styles.searchInputContainer,
        { [styles[type]]: type },
        className
      )}
    >
      <SearchIcon className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  placeholder: "Search",
  value: "",
};

export default SearchInput;
