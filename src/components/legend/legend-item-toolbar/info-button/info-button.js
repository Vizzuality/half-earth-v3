import React from 'react';
import PropTypes from 'prop-types';
import InfoButton from './info-button-component';

const LegendItemButtonInfo = props => {
  const { activeLayer, tooltipOpened, tooltipText, onChangeInfo } = props;

  return (
    <InfoButton
      activeLayer={activeLayer}
      tooltipOpened={tooltipOpened}
      tooltipText={tooltipText}
      onChangeInfo={onChangeInfo}
    />
  );
}

LegendItemButtonInfo.propTypes = {
  activeLayer: PropTypes.object,
  tooltipOpened: PropTypes.bool,
  tooltipText: PropTypes.string
}

LegendItemButtonInfo.defaultProps = {
    activeLayer: {},
    tooltipOpened: false,
    tooltipText: ''
}

export default LegendItemButtonInfo;
