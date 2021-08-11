import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import styles from './category-box-styles.module.scss';

const CategoryBox = ({ image, category, handleBoxClick, counter, isOpen }) => (
  <>
    <div className={styles.box} onClick={handleBoxClick}>
      <div className={styles.categoryContainer}>
        <img
          src={image}
          alt={category}
          className={styles.categoryThumbnail}
        />
        <div className={styles.titleContainer}>
          {counter > 0 && (
            <div className={cx(styles.counter, { [styles.openBox]: isOpen })}>
              <span className={styles.counterText}>{counter}</span>
            </div>
          )}
          <p className={styles.category}>{category}</p>
        </div>
        <div className={cx(styles.icon, { [styles.openBox]: isOpen })}>
          <ArrowExpandIcon />
        </div>
      </div>
    </div>
  </>
);

CategoryBox.propTypes = {
  category: PropTypes.string,
  isSidebarOpen: PropTypes.bool,
  counter: PropTypes.number
};

CategoryBox.defaultProps = {
  category: {},
  isSidebarOpen: true,
  counter: 0
};

export default CategoryBox;