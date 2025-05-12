import React, { useEffect } from 'react';

import ScoreDistributionsShiComponent from './score-distributions/score-distributions-shi-component';
import TemporalTrendsShiComponent from './temporal-trends/temporal-trends-shi-component';

function ShiComponent(props) {
  const { countryISO, clickedRegion } = props;
  const [showScoreDistribution, setShowScoreDistribution] =
    React.useState(false);

  useEffect(() => {
    if (countryISO.toLowerCase() === 'ee' && !clickedRegion) {
      setShowScoreDistribution(false);
    } else {
      setShowScoreDistribution(true);
    }
  }, [countryISO, clickedRegion]);

  return (
    <>
      <TemporalTrendsShiComponent {...props} />
      {showScoreDistribution && <ScoreDistributionsShiComponent {...props} />}
    </>
  );
}

export default ShiComponent;
