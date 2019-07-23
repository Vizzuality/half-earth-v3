import React from 'react';
import Tooltip from 'vizzuality-components/dist/tooltip';
import { ReactComponent as InfoIcon } from 'icons/info.svg';

import styles from './info-button-styles.module.scss';

const InfoButtonComponent = props =>  {
  const { activeLayer, tooltipOpened, tooltipText, onChangeInfo } = props;

  return (
    <Tooltip
      overlay={tooltipText || 'Layer info'}
      overlayClassName="c-rc-tooltip -default legendButtonTooltip"
      placement="topRight"
      trigger={tooltipOpened ? '' : 'hover'}
      mouseLeaveDelay={0}
      destroyTooltipOnHide
    >
      <button
        type="button"
        className={styles.legendButton}
        aria-label="More information"
        onClick={() => onChangeInfo(activeLayer)}
      >
        <InfoIcon />
      </button>
    </Tooltip>
  );
}

export default InfoButtonComponent;
