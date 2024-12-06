import React, { useState } from 'react';

import ScoreDistributionsSpiComponent from './score-distibutions/score-distributions-spi-component';
import TemporalTrendsSpiComponent from './temporal-trends/temporal-trends-spi-component';

function SpiComponent(props) {
  const [year, setYear] = useState('2024');

  return (
    <>
      <TemporalTrendsSpiComponent setYear={setYear} {...props} />
      <ScoreDistributionsSpiComponent year={year} {...props} />
    </>
  );
}

export default SpiComponent;
