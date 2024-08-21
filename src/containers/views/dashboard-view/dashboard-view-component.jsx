import React from 'react';
import { DASHBOARD_SPECIES, DASHBOARD_TRENDS } from 'router';
import styles from './dashboard-view-styles.module.scss';
import Button from 'components/button';

function DashboardViewComponent(props) {
  const { browsePage, countryISO, countryName } = props;

  return (
    <>
      {/* <LightModeProvider> */}
      <section className={styles.container}>
        <h1>{countryName} Biodiversity Dashboard</h1>
        <div className={styles.navigation}>
          <Button
            type="rectangular"
            label="Species"
            handleClick={() => browsePage({ type: DASHBOARD_SPECIES, payload: { iso: countryISO.toLowerCase() } })}
          />
          <Button
            type="rectangular"
            label="Regions"
          />
          <Button
            type="rectangular"
            label="View Indicators"
            handleClick={() => browsePage({ type: DASHBOARD_TRENDS, payload: { iso: countryISO.toLowerCase() } })}
          />
        </div>
      </section>
      {/* </LightModeProvider> */}
    </>
  );
}

export default DashboardViewComponent;
