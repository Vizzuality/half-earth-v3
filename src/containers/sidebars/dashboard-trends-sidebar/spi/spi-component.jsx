import React from 'react';

import ScoreDistributionsSpiComponent from './score-distibutions/score-distributions-spi-component';
import TemporalTrendsSpiComponent from './temporal-trends/temporal-trends-spi-component';

function SpiComponent(props) {
  return (
    <>
      <TemporalTrendsSpiComponent {...props} />
      <ScoreDistributionsSpiComponent {...props} />
    </>
  );
}

export default SpiComponent;
