import React from 'react'

import ScoreDistributionsShiComponent from './score-distributions/score-distributions-shi-component';
import TemporalTrendsShiComponent from './temporal-trends/temporal-trends-shi-component';

function ShiComponent(props) {
  return (
    <>
      <TemporalTrendsShiComponent
        {...props} />
      <ScoreDistributionsShiComponent
        {...props} />
    </>
  )
}

export default ShiComponent;
