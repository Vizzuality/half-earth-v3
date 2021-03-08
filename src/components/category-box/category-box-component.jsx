import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';

import styles from './category-box-styles.module.scss';

const CategoryBox = ({ title, category, handleBoxClick, counter, isOpen }) => (
  <>
    <div className={styles.box} onClick={handleBoxClick}>
      <div className={styles.categoryContainer}>
        <img src="#" alt={category} className={styles.categoryThumbnail} />
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            {title}
            {counter > 0 && (
              <div className={styles.counter}>
                <span className={styles.counterText}>{counter}</span>
              </div>
            )}
          </div>
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
  title: PropTypes.string,
  isSidebarOpen: PropTypes.bool,
  counter: PropTypes.number
};

CategoryBox.defaultProps = {
  category: {},
  title: PropTypes.string,
  isSidebarOpen: true,
  counter: 0
};

export default CategoryBox;