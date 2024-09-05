import React from 'react';

import styles from './dashboard-styles.module.scss';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';
import PartnersContainer from '../../components/partners';

function DashboardComponent(props) {
  return (
    <section>
      <DashboardView {...props} className={styles.dashboardView} />
      <PartnersContainer />
    </section>
  );
}

export default DashboardComponent;
