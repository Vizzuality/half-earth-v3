import React from 'react';

import ScoreDistributionsSiiComponent from './score-distributions/score-distributions-sii-component';
import TemporalTrendsSiiComponent from './temporal-trends/temporal-trends-sii-component';

function SiiComponent(props) {
  return (
    <>
      <TemporalTrendsSiiComponent {...props} />
      {/* <ScoreDistributionsSiiComponent {...props} /> */}
    </>
  );
}

export default SiiComponent;
