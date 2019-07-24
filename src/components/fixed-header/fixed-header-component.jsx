import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ReactComponent as ArrowExpandIcon } from 'icons/arrow_expand.svg';
import ShareModal from 'components/share-modal';
import styles from './fixed-header-styles.module.scss';

const BACK = 'BACK';

const differentFixedHeaderHeights = ['Existing protection', 'Human pressures'];

const FixedHeader = ({ closeSidebar, title, view, autoHeight }) => {
  const isHigherHeader = differentFixedHeaderHeights.includes(title);
  return (
    <div className={cx(styles.header,
      { [styles.higherHeader]: isHigherHeader},
      { [styles.autoHeightHeader]: autoHeight})
    }>
      <ShareModal theme={{ shareButton: styles.shareButton}} view={view} />
      <button
        className={styles.button}
        onClick={closeSidebar}
      >
        <ArrowExpandIcon className={styles.icon} />
        <span className={styles.backButton}>{BACK}</span>
      </button>
      <h1 className={styles.title}>
        { title && !autoHeight ? title.split(' ').map(word => <span>{word}</span>) : title }
      </h1>
      <div className={styles.spacer} />
    </div>
  )
};


FixedHeader.propTypes = {
  closeSidebar: PropTypes.func,
  title: PropTypes.string,
  autoHeight: PropTypes.bool
};

FixedHeader.defaultProps = {
  closeSidebar: () => {},
  title: '',
  autoHeight: false
};

export default FixedHeader;