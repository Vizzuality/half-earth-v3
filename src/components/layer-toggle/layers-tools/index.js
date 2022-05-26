import React,  { useState, useEffect } from 'react';
import Component from './component';
import { connect } from 'react-redux';
import { DEFAULT_OPACITY } from 'constants/mol-layers-configs';
import * as urlActions from 'actions/url-actions';

const Container = (props) => {
  const { activeLayers, option } = props;
  const [initialOpacityValue, setInitialOpacityValue ] = useState(DEFAULT_OPACITY);

  useEffect(() => {
    const layer = activeLayers.find(layer => layer.title === option.value);
    if (layer) {
      setInitialOpacityValue(parseFloat(layer.opacity))
    }
  }, [])
  return (
    <Component
      initialOpacityValue={initialOpacityValue}
      {...props}
    />
  )
}


export default connect(null, urlActions)(Container);
