import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'vizzuality-components/dist/tooltip';
import { ReactComponent as InfoIcon } from 'icons/info.svg';

import styles from './info-button-styles.module.scss';

const InfoButtonComponent = props =>  {
  const { activeLayer, isTooltipOpened, tooltipText, onChangeInfo } = props;

  return (
    <Tooltip
      overlay={tooltipText || 'Layer info'}
      overlayClassName="c-rc-tooltip -default legendButtonTooltip"
      placement="topRight"
      trigger={isTooltipOpened ? '' : 'hover'}
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

InfoButtonComponent.propTypes = {
  activeLayer: PropTypes.object,
  isTooltipOpened: PropTypes.bool,
  tooltipText: PropTypes.string,
  onChangeInfo: PropTypes.func
}

InfoButtonComponent.defaultProps = {
    activeLayer: {},
    isTooltipOpened: false,
    tooltipText: '',
    onChangeInfo: () => {}
}

export default InfoButtonComponent;
