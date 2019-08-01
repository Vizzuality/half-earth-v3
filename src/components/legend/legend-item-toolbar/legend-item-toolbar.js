import React, { useState } from 'react';
import LegendItemButtonOpacity from './opacity-button';
import LegendItemButtonInfo from './info-button';
import LegendItemButtonRemove from './remove-button';
import styles from './legend-item-toolbar-styles.module.scss';

const LegendItemToolbar = props => {
  const [isTooltipOpened, setTooltipOpened] = useState(false);

  const onTooltipVisibilityChange = (isOpened) => {
    setTooltipOpened(isOpened);
  }

  const childrenProps = {
    ...props,
    isTooltipOpened,
    onTooltipVisibilityChange
  };

  return (
    <div className={styles.legendItemToolbar}>
      <LegendItemButtonInfo tooltipText='Click to read the info of this layer' {...childrenProps} />
      <LegendItemButtonOpacity tooltipText='Change the opacity' {...childrenProps}/>
      <LegendItemButtonRemove tooltipText='Close this layer' {...childrenProps}/>
    </div>
  );
}

export default LegendItemToolbar;
