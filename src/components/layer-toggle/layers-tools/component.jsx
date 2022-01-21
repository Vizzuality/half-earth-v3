import React from 'react';
import LayerOpacityControl from 'components/layer-opacity-control';
import { Tooltip } from 'react-tippy';

// icons
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as BringToBackIcon } from 'icons/bring_to_back.svg';
import { ReactComponent as BringToFrontIcon } from 'icons/bring_to_front.svg';

import styles from './styles.module.scss';

const LayersTools = ({
  option,
  onInfoClick,
  changeGlobe,
  activeLayers,
  onBringToBackClick,
  onBringToFrontClick,
  initialOpacityValue,
}) => (
  <div className={styles.toggle}>
    <span
      className={styles.iconWrapper}
      onClick={(e) => onBringToFrontClick(e, option.value)}
    >
      <Tooltip
        html={<div className={styles.tooltip}>Bring to front</div>}
        animation="none"
        position="top"
      >
        <BringToFrontIcon className={styles.icon} />
      </Tooltip>
    </span>
    <span
      className={styles.iconWrapper}
      onClick={(e) => onBringToBackClick(e, option.value)}
    >
      <Tooltip
        html={<div className={styles.tooltip}>Send to back</div>}
        animation="none"
        position="top"
      >
        <BringToBackIcon className={styles.icon} />
      </Tooltip>
    </span>
    <Tooltip
      html={<div className={styles.tooltip}>Change opacity</div>}
      animation="none"
      position="top"
    >
      <LayerOpacityControl
        layer={option}
        changeGlobe={changeGlobe}
        activeLayers={activeLayers}
        initialOpacityValue={initialOpacityValue}
      />
    </Tooltip>
    <span className={styles.iconWrapper} onClick={() => onInfoClick(option)}>
      <Tooltip
        html={<div className={styles.tooltip}>More info</div>}
        animation="none"
        position="top"
      >
        <InfoIcon className={styles.icon} />
      </Tooltip>
    </span>
  </div>
);

export default LayersTools;
