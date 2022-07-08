import React from 'react';
import { useT } from '@transifex/react';
import PropTypes from 'prop-types';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

import styles from './share-button-styles.module';

const ShareButtonComponent = (props) => {
  const t = useT();
  const { theme, variant = 'icon', setShareModalOpen } = props;

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

  const shareButton = (withClickAndTooltip) => {
    const tooltip = withClickAndTooltip ? { ...tooltipId } : {};
    return (
      <button
        className={cx(styles[`${variant}ShareButton`], theme.shareButton)}
        onClick={withClickAndTooltip ? handleOpenShareModal : () => {}}
        {...tooltip}
      >
        <ShareIcon className={styles.icon} />
      </button>
    );
  };

  return (
    <>
      {variant === 'shortText' && (
        <div
          className={cx(styles.share, theme.share)}
          onClick={handleOpenShareModal}
          {...tooltipId}
        >
          <span className={cx(styles.shareText, theme.shareText)}>
            {t('Share')}
          </span>
          {shareButton(false)}
        </div>
      )}
      {variant === 'longText' && (
        <div
          className={cx(styles.share, theme.share)}
          onClick={handleOpenShareModal}
          {...tooltipId}
        >
          {shareButton(false)}
          <span className={cx(styles.shareText, theme.shareText)}>
            {t('Share this info')}
          </span>
        </div>
      )}
      {variant === 'icon' && shareButton(true)}
      <ReactTooltip id="shareButtonId" className="infoTooltipStyle">
        {t('Click to share')}
      </ReactTooltip>
    </>
  );
};

ShareButtonComponent.propTypes = {
  variant: PropTypes.string,
  setShareModalOpen: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    shareButton: PropTypes.string,
  }),
};

ShareButtonComponent.defaultProps = {
  theme: {},
};

export default ShareButtonComponent;
