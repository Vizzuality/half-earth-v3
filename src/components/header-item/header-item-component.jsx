import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { SORT } from './header-item';
import styles from './header-item.module.scss';

function HeaderItem({
  title,
  isSortSelected,
  sortDirection,
  handleSortClick,
  theme,
}) {
  const highlightAsc = isSortSelected && sortDirection === SORT.ASC;
  const highlightDesc = isSortSelected && sortDirection === SORT.DESC;
  return (
    <button
      type="button"
      className={cx(
        styles.headerItem,
        {
          [styles.highlightCategory]: isSortSelected,
        },
        theme.headerItem
      )}
      key={title}
      onClick={() => handleSortClick(title)}
    >
      <span>{title}</span>
      <span className={styles.sortArrows}>
        <span
          className={cx(
            styles.arrowUp,
            {
              [styles.highlightedSort]: highlightAsc,
            },
            theme.arrowUp
          )}
        />
        <span
          className={cx(
            styles.arrowDown,
            {
              [styles.highlightedSort]: highlightDesc,
            },
            theme.arrowDown
          )}
        />
      </span>
    </button>
  );
}

HeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
  isSortSelected: PropTypes.bool,
  sortDirection: PropTypes.string,
  handleSortClick: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
};

HeaderItem.defaultProps = {
  theme: {},
  isSortSelected: undefined,
  sortDirection: undefined,
};

export default HeaderItem;
