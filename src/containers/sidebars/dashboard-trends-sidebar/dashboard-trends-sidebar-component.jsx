import React from 'react';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ScoreDistributionsContainer from './score-distributions';
import TemporalTrendsContainer from './temporal-trends';

function DashboardTrendsSidebar(props) {
  const { activeLayers, map, view } = props;

  return (
    <div className={styles.container}>
      <TemporalTrendsContainer
        activeLayers={activeLayers}
        map={map}
        view={view}
      />
      <ScoreDistributionsContainer />
    </div>
  );
}

export default DashboardTrendsSidebar;
