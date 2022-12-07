import React from 'react';
import ReactTooltip from 'react-tooltip';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import { ReactComponent as ShareIcon } from 'icons/share.svg';

import styles from './share-button-styles.module';

function ShareButtonComponent(props) {
  const t = useT();
  const { theme, variant, setShareModalOpen } = props;

  const tooltipId = {
    'data-tip': 'data-tip',
    'data-for': 'shareButtonId',
    'data-place': 'right',
    'data-effect': 'solid',
    'data-delay-show': 0,
  };

  const handleOpenShareModal = () => {
    const { openShareModalAnalyticsEvent, viewMode } = props;
    setShareModalOpen(true);
    openShareModalAnalyticsEvent(viewMode);
  };

  return (
    <>
      <button
        type="button"
        className={cx(styles[`${variant}ShareButton`], theme.shareButton)}
        onClick={handleOpenShareModal}
        {...tooltipId}
      >
        <ShareIcon className={styles.icon} />
      </button>
      <ReactTooltip id="shareButtonId" className="infoTooltipStyle">
        {t('Click to share')}
      </ReactTooltip>
    </>
  );
}

ShareButtonComponent.propTypes = {
  variant: PropTypes.string,
  setShareModalOpen: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    shareButton: PropTypes.string,
  }),
};

ShareButtonComponent.defaultProps = {
  theme: {},
  variant: 'icon',
};

export default ShareButtonComponent;
