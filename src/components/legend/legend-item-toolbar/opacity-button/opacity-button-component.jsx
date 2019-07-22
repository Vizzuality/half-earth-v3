import React, { useState } from 'react';
import Tooltip from 'vizzuality-components/dist/tooltip';
import cx from 'classnames';
import { ReactComponent as OpacityIcon } from 'icons/opacity.svg';

import OpacityTooltip from './opacity-tooltip/opacity-tooltip';
import styles from './opacity-button-styles.module.scss';

const OpacityButtonComponent = props => {
  const { layers, visibility, activeLayer, tooltipText, onChangeOpacity,  ...rest } = props;
  const { opacity } = activeLayer;

  const [ isClicked, setClicked ] = useState(false);
  const [ isHovered, setHovered ] = useState(false);

  const onTooltipVisibilityChange = (visibility) => {
    const { onTooltipVisibilityChange } = props;
    setClicked(visibility);
    setHovered(false);
    onTooltipVisibilityChange(visibility);
  }

  const opacityTooltip = (
    <OpacityTooltip
      layers={layers}
      activeLayer={activeLayer}
      onChangeOpacity={onChangeOpacity}
      {...rest}
    />
  );

  return (
    <Tooltip
      overlay={opacityTooltip}
      visible={isClicked}
      overlayClassName={`c-rc-tooltip -default opacityChangeTooltip`}
      placement="topLeft"
      trigger={['click']}
      onVisibleChange={onTooltipVisibilityChange}
      destroyTooltipOnHide
    >
      <Tooltip
        visible={isHovered && !isClicked}
        overlay={tooltipText || (`Opacity ${opacity ? `(${Math.round(opacity * 100)}%)` : ''}`)}
        overlayClassName="c-rc-tooltip -default opacityTooltip"
        placement="topLeft"
        trigger={'hover'}
        onVisibleChange={v => setHovered(v)}
        destroyTooltipOnHide
      >
        <button
          type="button"
          className={cx(styles.opacityButton,
            { [styles.opacityEnabled]: opacity < 1 },
            { [styles.opacityButtonActive]: isClicked },
          )}
          aria-label="Change opacity"
        >
          <OpacityIcon />
        </button>
      </Tooltip>
    </Tooltip>
  );
}

export default OpacityButtonComponent;
