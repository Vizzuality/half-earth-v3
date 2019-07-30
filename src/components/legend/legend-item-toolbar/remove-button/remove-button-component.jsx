import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from 'icons/closeWhite.svg';
import { Tooltip } from 'vizzuality-components';
import styles from './remove-button-styles.module.scss';

const RemoveButtonComponent = props => {
  const { activeLayer, isTooltipOpened, tooltipText, onRemoveLayer } = props;

  return (
    <Tooltip
      overlay={tooltipText || 'Remove layer'}
      overlayClassName="c-rc-tooltip -default legendButtonTooltip"
      placement="topRight"
      trigger={isTooltipOpened ? '' : 'hover'}
      mouseLeaveDelay={0}
      destroyTooltipOnHide
    >
      <button
        type="button"
        className={styles.legendButton}
        onClick={() => onRemoveLayer(activeLayer)}
        aria-label="Remove"
      >
        <CloseIcon />
      </button>
    </Tooltip>
  );
}


RemoveButtonComponent.propTypes = {
  activeLayer: PropTypes.object,
  isTooltipOpened: PropTypes.bool,
  tooltipText: PropTypes.string,
  onRemoveLayer: PropTypes.func
}

RemoveButtonComponent.defaultProps = {
    activeLayer: {},
    isTooltipOpened: false,
    tooltipText: '',
    onRemoveLayer: () => {}
}

export default RemoveButtonComponent;
