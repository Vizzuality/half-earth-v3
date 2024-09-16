import React from 'react';

import TemporalTrendsShiComponent from './shi/temporal-trends-shi-component';
import TemporalTrendsSiiComponent from './sii/temporal-trends-sii-component';
import TemporalTrendsSpiComponent from './spi/temporal-trends-spi-component';

function TemporalTrendsContainer(props) {
  const { selectedIndex } = props;

  if (selectedIndex === 1) {
    return <TemporalTrendsShiComponent {...props} />;
  }
  if (selectedIndex === 2) {
    return <TemporalTrendsSpiComponent {...props} />;
  }
  if (selectedIndex === 3) {
    return <TemporalTrendsSiiComponent {...props} />;
  }
  return <TemporalTrendsShiComponent {...props} />;
}

export default TemporalTrendsContainer;