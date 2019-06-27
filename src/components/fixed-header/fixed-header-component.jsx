import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import ShareModal from 'components/share-modal';
import styles from './fixed-header-styles.module.scss';

const BACK = 'BACK';

const differentFixedHeaderHeights = ['Existing protection', 'Human pressures'];

const FixedHeader = ({ closeSidebar, activeCategory, view }) => {
  const isHigherHeader = differentFixedHeaderHeights.includes(activeCategory);
  return (
    <div className={cx(styles.header, { [styles.higherHeader]: isHigherHeader})}>
      <ShareModal theme={{ shareButton: styles.shareButton}} view={view} />
      <button
        className={styles.button}
        onClick={closeSidebar}
      >
        <ArrowExpandIcon className={styles.icon} />
        <span className={styles.backButton}>{BACK}</span>
      </button>
      <h1 className={styles.title}>{activeCategory && activeCategory.split(' ').map(word => <>{word}<br/></>)}</h1>
      <div className={styles.spacer} />
    </div>
  )
};


FixedHeader.propTypes = {
  closeSidebar: PropTypes.func,
  activeCategory: PropTypes.string
};

FixedHeader.defaultProps = {
  closeSidebar: () => {},
  activeCategory: ''
};

export default FixedHeader;