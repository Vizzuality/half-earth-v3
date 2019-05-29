import React from 'react';
import { connect } from 'react-redux';
import HumanPressureWidgetComponent from './human-pressure-widget-component';

import mapStateToProps from './human-pressure-selectors';

const HumanPressureWidgetContainer = (props) => {
  const handleTreemapClick = () => {
    console.log('clicked layer')
  }

  return <HumanPressureWidgetComponent {...props} handleOnClick={handleTreemapClick}/>
}

export default connect(mapStateToProps, null)(HumanPressureWidgetContainer);