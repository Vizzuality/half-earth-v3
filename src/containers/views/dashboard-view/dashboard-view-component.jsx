import React from 'react';
import { DASHBOARD_SPECIES, DASHBOARD_TRENDS, DASHBOARD_REGIONS } from 'router';
import styles from './dashboard-view-styles.module.scss';
import cx from 'classnames';
import { useT } from '@transifex/react';

function DashboardViewComponent(props) {
  const t = useT();
  const { browsePage, countryISO, countryName } = props;

  return (
    <>
      {/* <LightModeProvider> */}
      <section className={styles.container}>
        <h1>{`${countryName} ${t('Biodiversity Dashboard')}`}</h1>
        <div className={styles.navigation}>
          <div className={styles.navCard} onClick={() => browsePage({ type: DASHBOARD_SPECIES, payload: { iso: countryISO.toLowerCase() } })} >
            <div className={styles.outline}></div>
            <label>{t('Species')}</label>
            <p>{t('Explore species distribution, trait, and conservation data')}</p>
          </div>
          <div className={cx(styles.navCard, styles.regions)} onClick={() => browsePage({ type: DASHBOARD_REGIONS, payload: { iso: countryISO.toLowerCase() } })} >
            <div className={styles.outline}></div>
            <label>{t('Regions')}</label>
            <p>
              {t('Explore high quality biodiversity expectations for any area of interest')}
            </p>
          </div>
          <div className={cx(styles.navCard, styles.trends)} onClick={() => browsePage({ type: DASHBOARD_TRENDS, payload: { iso: countryISO.toLowerCase() } })} >
            <div className={styles.outline}></div>
            <label>{t('View Indicators')}</label>
            <p>
              {t('Explore national biodiversity indicators: the Species Habitat, Protection, and Information Indices')}
            </p>
          </div>
        </div>
      </section >
      {/* </LightModeProvider> */}
    </>
  );
}

export default DashboardViewComponent;
