import React from 'react';
import LayerOpacityControl from 'components/layer-opacity-control';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as BringToBackIcon } from 'icons/bring_to_back.svg';
import { ReactComponent as BringToFrontIcon } from 'icons/bring_to_front.svg';

import styles from './styles.module.scss';

const Component = ({
  option,
  onInfoClick,
  changeGlobe,
  activeLayers,
  onBringToBackClick,
  onBringToFrontClick,
}) => (
  <div className={styles.toggle}>
    <span
      title='movelayer to the front'
      className ={styles.iconWrapper}
      onClick={(e) => onBringToFrontClick(e, option.value)}
    >
      <BringToFrontIcon
        className={styles.icon}
      />
    </span>
    <span
      title='movelayer to the back'
      className ={styles.iconWrapper}
      onClick={(e) => onBringToBackClick(e, option.value)}
    >
      <BringToBackIcon
        title='movelayer to the back'
        className={styles.icon}
      />
    </span>
    <LayerOpacityControl
      layer={option}
      changeGlobe={changeGlobe}
      activeLayers={activeLayers}
    />
    <span
      title='show layer metadata'
      className ={styles.iconWrapper}
      onClick={() => onInfoClick(option)}
    >
      <InfoIcon
        className={styles.icon}
      />
    </span>
  </div>
)

export default Component;