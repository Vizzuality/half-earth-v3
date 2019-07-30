import React from 'react';
import PropTypes from 'prop-types';
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

RemoveButton.propTypes = {
  activeLayer: PropTypes.object,
  isTooltipOpened: PropTypes.bool,
  tooltipText: PropTypes.string,
  onRemoveLayer: PropTypes.func
}

RemoveButton.defaultProps = {
    activeLayer: {},
    isTooltipOpened: false,
    tooltipText: '',
    onRemoveLayer: () => {}
}

export default RemoveButton;
