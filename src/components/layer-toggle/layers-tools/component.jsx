import React from 'react';
import LayerOpacityControl from 'components/layer-opacity-control';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import { ReactComponent as BringToBackIcon } from 'icons/bring_to_back.svg';
import { ReactComponent as BringToFrontIcon } from 'icons/bring_to_front.svg';

import styles from './styles.module.scss';

const Component = ({
  option,
  variant,
  handleInfoClick,
  onOpacityClick,
  onBringToBackClick,
  onBringToFrontClick,
  activeLayer = {opacity: 1}
}) => (
  <div className={styles.toggle}>
    <span
      className ={styles.iconWrapper}
      title='movelayer to the front'
      onClick={(e) => onBringToFrontClick(e, option.value)}
    >
      <BringToFrontIcon
        className={styles.icon}
      />
    </span>
    <span
      className ={styles.iconWrapper}
      title='movelayer to the back'
      onClick={(e) => onBringToBackClick(e, option.value)}
    >
      <BringToBackIcon
        title='movelayer to the back'
        className={styles.icon}
      />
    </span>
    <LayerOpacityControl />
    <span
      className ={styles.iconWrapper}
      title='show layer metadata'
      onClick={() => handleInfoClick(option, variant)}
    >
      <InfoIcon
        className={styles.icon}
      />
    </span>
  </div>
)

export default Component;