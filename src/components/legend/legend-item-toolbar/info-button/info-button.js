import React from 'react';
import PropTypes from 'prop-types';
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

InfoButton.propTypes = {
  activeLayer: PropTypes.object,
  isTooltipOpened: PropTypes.bool,
  tooltipText: PropTypes.string,
  onChangeInfo: PropTypes.func
}

InfoButton.defaultProps = {
    activeLayer: {},
    isTooltipOpened: false,
    tooltipText: '',
    onChangeInfo: () => {}
}

export default InfoButton;
