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
      <ArrowExpandIcon className={styles.icon} />
    </div>
  </div>
);

CategoryBox.propTypes = {
  category: PropTypes.object,
  title: PropTypes.string
};

CategoryBox.defaultProps = {
  category: {},
  title: PropTypes.string
};

export default CategoryBox;