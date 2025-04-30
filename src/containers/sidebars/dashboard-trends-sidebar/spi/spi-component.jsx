import React, { useEffect } from 'react';

import ScoreDistributionsSpiComponent from './score-distibutions/score-distributions-spi-component';
import TemporalTrendsSpiComponent from './temporal-trends/temporal-trends-spi-component';

function SpiComponent(props) {
  const { countryISO, clickedRegion } = props;
  const [showScoreDistribution, setShowScoreDistribution] =
    React.useState(false);

  useEffect(() => {
    if (countryISO.toLowerCase() === 'eewwf' && !clickedRegion) {
      setShowScoreDistribution(false);
    } else {
      setShowScoreDistribution(true);
    }
  }, [countryISO, clickedRegion]);

  return (
    <>
      <TemporalTrendsSpiComponent {...props} />
      {showScoreDistribution && <ScoreDistributionsSpiComponent {...props} />}
    </>
  );
}

export default SpiComponent;
