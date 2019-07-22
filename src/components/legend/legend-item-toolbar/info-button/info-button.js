import React from 'react';
import PropTypes from 'prop-types';
import InfoButtonComponent from './info-button-component';

const InfoButton = props => {
  const { activeLayer, tooltipOpened, tooltipText, onChangeInfo } = props;

  return (
    <InfoButtonComponent
      activeLayer={activeLayer}
      tooltipOpened={tooltipOpened}
      tooltipText={tooltipText}
      onChangeInfo={onChangeInfo}
    />
  );
}

InfoButton.propTypes = {
  activeLayer: PropTypes.object,
  tooltipOpened: PropTypes.bool,
  tooltipText: PropTypes.string,
  onChangeInfo: PropTypes.func
}

InfoButton.defaultProps = {
    activeLayer: {},
    tooltipOpened: false,
    tooltipText: '',
    onChangeInfo: () => {}
}

export default InfoButton;
