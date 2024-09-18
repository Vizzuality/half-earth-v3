import React from 'react';

import ScoreDistributionsShiComponent from './shi/score-distributions-shi-component';
import ScoreDistributionsSiiComponent from './sii/score-distributions-sii-component';
import ScoreDistributionsSpiComponent from './spi/score-distributions-spi-component';

function ScoreDistributionsContainer(props) {
  const { trendOption } = props;

  if (trendOption === 1) {
    return <ScoreDistributionsShiComponent {...props} />;
  }
  if (trendOption === 2) {
    return <ScoreDistributionsSpiComponent {...props} />;
  }
  if (trendOption === 3) {
    return <ScoreDistributionsSiiComponent {...props} />;
  }
  return <ScoreDistributionsShiComponent {...props} />;
}

export default ScoreDistributionsContainer;
