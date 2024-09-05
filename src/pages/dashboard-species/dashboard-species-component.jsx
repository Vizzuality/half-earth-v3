import React from 'react';

import styles from './dashboard-species-styles.module.scss';

import DashboardSpeciesView from '../../containers/views/dashboard-species-view/dashboard-species-view';
import PartnersContainer from '../../components/partners';

function DashboardSpeciesComponent(props) {
  return (
    <section>
      <DashboardSpeciesView {...props} className={styles.dashboardView} />
      <PartnersContainer />
    </section>
  );
}

export default DashboardSpeciesComponent;
