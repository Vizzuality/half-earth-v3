import React from 'react';
import { connect } from 'react-redux';
import Component from './country-challenges-chart-component';
import mapStateToProps from './country-challenges-chart-selectors';

const CountryChallengesChartContainer = (props) => (
  <Component
    {...props}
  />
)


export default connect(mapStateToProps, null)(CountryChallengesChartContainer);