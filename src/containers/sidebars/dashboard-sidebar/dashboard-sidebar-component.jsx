import React from 'react';

import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import SpeciesInfoContainer from './species-info';

function DashboardSidebar(props) {
  const { activeLayers } = props;
  return (
    <div className={styles.container}>
      <SpeciesInfoContainer />

      <section className={styles.sidenav}>
        <div className={styles.icons}>
          <span>DL</span>
          <span>BI</span>
          <span>RA</span>
        </div>
        <DataLayerContainer activeLayers={activeLayers} />
      </section>
    </div>
  );
}

export default DashboardSidebar;
