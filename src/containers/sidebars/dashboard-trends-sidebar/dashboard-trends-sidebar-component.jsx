import React, { useState } from 'react';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ScoreDistributionsContainer from './score-distributions';
import TemporalTrendsContainer from './temporal-trends';

export const NATIONAL_TREND = 'NATIONAL';
export const PROVINCE_TREND = 'PROVINCE';

function DashboardTrendsSidebar(props) {
  const { countryISO, countryData } = props;

  const [activeTrend, setActiveTrend] = useState(NATIONAL_TREND);

  const handleActiveTrendUpdate = (trend) => {
    setActiveTrend(trend);
  };

  return (
    <div className={styles.container}>
      <TemporalTrendsContainer
        countryData={countryData}
        activeTrend={activeTrend}
        updateActiveTrend={handleActiveTrendUpdate}
      />
      <ScoreDistributionsContainer
        countryISO={countryISO}
        countryData={countryData}
        activeTrend={activeTrend}
      />
    </div>
  );
}

export default DashboardTrendsSidebar;
