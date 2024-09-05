import React from 'react';

import styles from './dashboard-species-styles.module.scss';

import DashboardSpeciesView from '../../containers/views/dashboard-species-view/dashboard-species-view';
import PartnersContainer from '../../components/partners';

function DashboardSpeciesComponent(props) {
  return (
    <div className={styles.wrapper}>
      <DashboardSpeciesView {...props} className={styles.dashboardView} />
      <PartnersContainer />
    </div>
  );
}

export default DashboardSpeciesComponent;
