import React from 'react';
import InfoButtonComponent from './info-button-component';

const InfoButton = props => {
  const { activeLayer, isTooltipOpened, tooltipText, onChangeInfo } = props;

  return (
    <InfoButtonComponent
      activeLayer={activeLayer}
      isTooltipOpened={isTooltipOpened}
      tooltipText={tooltipText}
      onChangeInfo={onChangeInfo}
    />
  );
}

export default InfoButton;
