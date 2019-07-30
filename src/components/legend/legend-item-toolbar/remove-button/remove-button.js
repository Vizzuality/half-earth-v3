import React from 'react';
import RemoveButtonComponent from './remove-button-component.jsx';

const RemoveButton = props => {
  const { activeLayer, isTooltipOpened, tooltipText, onRemoveLayer } = props;

  return (
    <RemoveButtonComponent
      activeLayer={activeLayer}
      isTooltipOpened={isTooltipOpened}
      tooltipText={tooltipText}
      onRemoveLayer={onRemoveLayer}
    />
  );
}

export default RemoveButton;
