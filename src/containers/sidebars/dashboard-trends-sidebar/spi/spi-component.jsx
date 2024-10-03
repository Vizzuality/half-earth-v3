import React, { useState } from 'react'

import ScoreDistributionsSpiComponent from './score-distibutions/score-distributions-spi-component';
import { PROVINCE_TREND } from '../dashboard-trends-sidebar-component';
import TemporalTrendsSpiComponent from './temporal-trends/temporal-trends-spi-component';

function SpiComponent(props) {
  const [activeTrend, setActiveTrend] = useState(PROVINCE_TREND);
  const [year, setYear] = useState();

  return (
    <>
      <TemporalTrendsSpiComponent
        activeTrend={activeTrend}
        setActiveTrend={setActiveTrend}
        setYear={setYear}
        {...props} />
      <ScoreDistributionsSpiComponent
        activeTrend={activeTrend}
        year={year}
        {...props} />
    </>
  )
}

export default SpiComponent;
