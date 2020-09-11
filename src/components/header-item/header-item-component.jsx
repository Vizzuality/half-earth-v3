import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SORT } from './header-item';
import styles from './header-item.module.scss';

const HeaderItem = ({
  title,
  isSortSelected,
  sortDirection,
  handleSortClick,
  className
}) => {
  const highlightAsc = isSortSelected && sortDirection === SORT.ASC;
  const highlightDesc = isSortSelected && sortDirection === SORT.DESC;
  return (
    <button
      className={cx(
        styles.headerItem,
        {
          [styles.highlightCategory]: isSortSelected
        },
        className
      )}
      key={title}
      onClick={() => handleSortClick(title)}
    >
      {title}
      <span className={styles.sortArrows}>
        <span
          className={cx(styles.arrowUp, {
            [styles.highlightedSort]: highlightAsc
          })}
        />
        <span
          className={cx(styles.arrowDown, {
            [styles.highlightedSort]: highlightDesc
          })}
        />
      </span>
    </button>
  );
};

HeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  isSortSelected: PropTypes.bool,
  sortDirection: PropTypes.string,
  handleSortClick: PropTypes.func.isRequired
};

export default HeaderItem;
