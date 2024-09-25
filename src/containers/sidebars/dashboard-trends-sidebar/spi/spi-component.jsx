import React, { useState } from 'react'

import TemporalTrendsSpiComponent from '../temporal-trends/spi/temporal-trends-spi-component';
import ScoreDistributionsSpiComponent from '../score-distributions/spi/score-distributions-spi-component';
import { PROVINCE_TREND } from '../dashboard-trends-sidebar-component';

function SpiComponent(props) {
  const [activeTrend, setActiveTrend] = useState(PROVINCE_TREND);
  const [selectedProvince, setSelectedProvince] = useState();
  const [year, setYear] = useState();

  return (
    <>
      <TemporalTrendsSpiComponent
        activeTrend={activeTrend}
        setActiveTrend={setActiveTrend}
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
        setYear={setYear}
        {...props} />
      <ScoreDistributionsSpiComponent
        activeTrend={activeTrend}
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
        year={year}
        {...props} />
    </>
  )
}

export default SpiComponent;
