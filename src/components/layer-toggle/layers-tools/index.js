import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { DEFAULT_OPACITY } from 'constants/mol-layers-configs';

import Component from './component';

function Container(props) {
  const { activeLayers, option } = props;
  const [initialOpacityValue, setInitialOpacityValue] =
    useState(DEFAULT_OPACITY);

  useEffect(() => {
    const layer = activeLayers.find((l) => l.title === option.value);
    if (layer) {
      setInitialOpacityValue(parseFloat(layer.opacity));
    }
  }, []);
  return <Component initialOpacityValue={initialOpacityValue} {...props} />;
}

export default connect(null, urlActions)(Container);
