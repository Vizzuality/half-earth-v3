import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import ShareModal from 'components/share-modal';
import styles from './fixed-header-styles.module.scss';

const BACK = 'BACK';

const FixedHeader = ({ closeSidebar, activeCategory, view }) => (
  <div className={styles.header}>
    <ShareModal theme={{ shareButton: styles.shareButton}} view={view} />
    <button
      className={styles.button}
      onClick={closeSidebar}
    >
      <ArrowExpandIcon className={styles.icon} />
      <span className={styles.backButton}>{BACK}</span>
    </button>
    <h1 className={styles.title}>{activeCategory}</h1>
    <div className={styles.spacer} />
  </div>
)


FixedHeader.propTypes = {
  closeSidebar: PropTypes.func,
  activeCategory: PropTypes.string
};

FixedHeader.defaultProps = {
  closeSidebar: () => {},
  activeCategory: ''
};

export default FixedHeader;