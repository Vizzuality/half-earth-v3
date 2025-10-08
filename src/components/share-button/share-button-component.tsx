import ReactTooltip from 'react-tooltip';

import { useT } from '@transifex/react';

import cx from 'classnames';

import ShareIcon from 'icons/share.svg?react';

import styles from './share-button-styles.module';

export interface ShareButtonProps {
  variant?: string;
  setShareModalOpen: (open: boolean) => void;
  theme?: {
    shareButton?: string;
  };
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
  openShareModalAnalyticsEvent?: (viewMode: any) => void;
  viewMode?: any;
}

function ShareButtonComponent(props: ShareButtonProps) {
  const t = useT();
  const { theme = {}, variant = 'icon', setShareModalOpen, tooltipPosition } = props;

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

export default ShareButtonComponent;
