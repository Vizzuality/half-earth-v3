import React from 'react';
import { DASHBOARD_SPECIES, DASHBOARD_TRENDS, DASHBOARD_REGIONS } from 'router';
import styles from './dashboard-view-styles.module.scss';
import cx from 'classnames';

function DashboardViewComponent(props) {
  const { browsePage, countryISO, countryName } = props;



  return (
    <>
      {/* <LightModeProvider> */}
      <section className={styles.container}>
        <h1>{countryName} Biodiversity Dashboard</h1>
        <div className={styles.navigation}>
          <div className={styles.navCard} onClick={() => browsePage({ type: DASHBOARD_SPECIES, payload: { iso: countryISO.toLowerCase() } })} >
            <div className={styles.outline}></div>
            <label>Species</label>
            <p>
              Explore species distribution, trait, and conservation data
            </p>
          </div>
          <div className={cx(styles.navCard, styles.regions)} onClick={() => browsePage({ type: DASHBOARD_REGIONS, payload: { iso: countryISO.toLowerCase(), scientificname: 'region' } })} >
            <div className={styles.outline}></div>
            <label>Regions</label>
            <p>
              Explore high quality biodiversity expectations for any area of interest
            </p>
          </div>
          <div className={cx(styles.navCard, styles.trends)} onClick={() => browsePage({ type: DASHBOARD_TRENDS, payload: { iso: countryISO.toLowerCase() } })} >
            <div className={styles.outline}></div>
            <label>View Indicators</label>
            <p>
              Explore national biodiversity indicators: the Species Habitat, Protection, and Information Indices
            </p>
          </div>
        </div>
      </section >
      {/* </LightModeProvider> */}
    </>
  );
}

export default DashboardViewComponent;
