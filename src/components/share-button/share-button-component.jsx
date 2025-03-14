import ReactTooltip from 'react-tooltip';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import ShareIcon from 'icons/share.svg?react';

import styles from './share-button-styles.module';

function ShareButtonComponent(props) {
  const t = useT();
  const { theme, variant, setShareModalOpen, tooltipPosition } = props;

  const tooltipId = {
    'data-tip': 'data-tip',
    'data-for': 'shareButtonId',
    'data-place': tooltipPosition || 'right',
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
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

ShareButtonComponent.defaultProps = {
  theme: {},
  variant: 'icon',
};

export default ShareButtonComponent;
