import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';

import styles from './category-box-styles.module.scss';

const CategoryBox = ({ title, category, isSidebarOpen }) => (
  <div className={cx(
    styles.box,
    { [styles.visible]: !isSidebarOpen }
  )}>
    <p className={styles.title}>{title}</p>
    <div className={styles.categoryContainer}>
      <p className={styles.category}>{category}</p>
      <div className={styles.icon}>
        <ArrowExpandIcon />
      </div>
    </div>
  </div>
);

CategoryBox.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
  isSidebarOpen: PropTypes.bool
};

CategoryBox.defaultProps = {
  category: {},
  title: PropTypes.string,
  isSidebarOpen: true
};

export default CategoryBox;