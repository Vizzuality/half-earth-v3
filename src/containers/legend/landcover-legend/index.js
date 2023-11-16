import React from 'react';
import { connect } from 'react-redux';

import Component from './component';

function LandcoverLegendComponent(props) {
  return <Component {...props} />;
}

export default connect(null, null)(LandcoverLegendComponent);
