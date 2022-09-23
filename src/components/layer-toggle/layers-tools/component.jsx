import React from 'react';
import { Tooltip } from 'react-tippy';

import { useT } from '@transifex/react';

import LayerOpacityControl from 'components/layer-opacity-control';

import styles from './styles.module.scss';

import { ReactComponent as BringToBackIcon } from 'icons/bring_to_back.svg';
import { ReactComponent as BringToFrontIcon } from 'icons/bring_to_front.svg';
import { ReactComponent as InfoIcon } from 'icons/info.svg';

function LayersTools({
  option,
  onInfoClick,
  changeGlobe,
  activeLayers,
  onBringToBackClick,
  onBringToFrontClick,
  initialOpacityValue,
}) {
  const t = useT();

  return (
    <div className={styles.toggle}>
      <span
        className={styles.iconWrapper}
        onClick={(e) => onBringToFrontClick(e, option.value)}
      >
        <Tooltip
          html={<div className={styles.tooltip}>{t('Bring to front')}</div>}
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
          html={<div className={styles.tooltip}>{t('Send to back')}</div>}
          animation="none"
          position="top"
        >
          <BringToBackIcon className={styles.icon} />
        </Tooltip>
      </span>
      <Tooltip
        html={<div className={styles.tooltip}>{t('Change opacity')}</div>}
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
          html={<div className={styles.tooltip}>{t('More info')}</div>}
          animation="none"
          position="top"
        >
          <InfoIcon className={styles.icon} />
        </Tooltip>
      </span>
    </div>
  );
}

export default LayersTools;
