import React from 'react';

import cx from 'classnames';
import PropTypes from 'prop-types';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';

import styles from './category-box-styles.module.scss';

function CategoryBox({
  image,
  title,
  Icon,
  handleBoxClick,
  counter,
  isOpen,
}) {
  return (
    <div
      className={styles.box}
      onClick={handleBoxClick}
    >
      <div className={styles.categoryContainer}>
        {counter > 0 && (
        <div className={cx(styles.counter, { [styles.openBox]: isOpen })}>
          <span className={styles.counterText}>{counter}</span>
        </div>
        )}
        {image && (
        <img src={image} alt={title} className={styles.categoryThumbnail} />
        )}
        {Icon && <Icon className={styles.categoryThumbnail} />}
        <div className={styles.titleContainer}>
          <p className={styles.category}>{title}</p>
        </div>
        <div className={cx(styles.icon, { [styles.openBox]: isOpen })}>
          <ArrowExpandIcon />
        </div>
      </div>
    </div>
  );
}

CategoryBox.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  counter: PropTypes.number,
};

CategoryBox.defaultProps = {
  isOpen: true,
  counter: 0,
};

export default CategoryBox;
