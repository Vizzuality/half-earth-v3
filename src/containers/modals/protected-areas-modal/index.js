import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from './selectors';
import Component from './component';

const Container = (props) => {
  console.log('props', props);
  return (
    <Component
      {...props}
    />
  )
}

export default connect(mapStateToProps, null)(Container);
