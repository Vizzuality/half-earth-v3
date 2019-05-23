import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import styles from './fixed-header-styles.module.scss';

const FixedHeader = ({ closeSidebar, activeCategory }) => (
  <div className={styles.header}>
    <button
      className={styles.button}
      onClick={closeSidebar}
    >
      <ArrowExpandIcon className={styles.icon} />
      <span>BACK</span>
    </button>
    <h1 className={styles.title}>{activeCategory}</h1>
    <div className={styles.spacer} />
  </div>
)


FixedHeader.propTypes = {
};

FixedHeader.defaultProps = {
};

export default FixedHeader;