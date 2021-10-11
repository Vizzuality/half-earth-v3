import React from 'react';
import {connect} from 'react-redux';
import Component from './component';
import mapStateToProps from './selectors';

const Container = (props) => (
  <Component {...props} />
)

export default connect(mapStateToProps, null)(Container);