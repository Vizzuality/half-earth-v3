import React from 'react';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ScoreDistributionsContainer from './score-distributions';
import TemporalTrendsContainer from './temporal-trends';

function DashboardTrendsSidebar(props) {
  const { countryISO, countryData } = props;

  return (
    <div className={styles.container}>
      <TemporalTrendsContainer countryData={countryData} />
      <ScoreDistributionsContainer
        countryISO={countryISO}
        countryData={countryData}
      />
    </div>
  );
}

export default DashboardTrendsSidebar;
