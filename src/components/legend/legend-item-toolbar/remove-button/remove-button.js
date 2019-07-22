import React from 'react';
import PropTypes from 'prop-types';
import RemoveButtonComponent from './remove-button-component.jsx';

const RemoveButton = props => {
  const { activeLayer, tooltipOpened, tooltipText, onRemoveLayer } = props;

  return (
    <RemoveButtonComponent
      activeLayer={activeLayer}
      tooltipOpened={tooltipOpened}
      tooltipText={tooltipText}
      onRemoveLayer={onRemoveLayer}
    />
  );
}

RemoveButton.propTypes = {
  activeLayer: PropTypes.object,
  tooltipOpened: PropTypes.bool,
  tooltipText: PropTypes.string,
  onRemoveLayer: PropTypes.func
}

RemoveButton.defaultProps = {
    activeLayer: {},
    tooltipOpened: false,
    tooltipText: '',
    onRemoveLayer: () => {}
}

export default RemoveButton;
