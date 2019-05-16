import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';

import styles from './category-box-styles.module.scss';

const CategoryBox = ({ title, category, isCategoriesBoxesVisible }) => (
  <div className={cx(
    styles.box,
    { [styles.visible]: isCategoriesBoxesVisible }
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
  isCategoriesBoxesVisible: PropTypes.bool
};

CategoryBox.defaultProps = {
  category: {},
  title: PropTypes.string,
  isCategoriesBoxesVisible: true
};

export default CategoryBox;