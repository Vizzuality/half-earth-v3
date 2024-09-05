import React from 'react';

import logoImgColor from 'logos/eowilson_logo_v3.svg';
import heLogoImg from 'logos/he_logo_color_full.png?react';
import iucnLogo from 'logos/iucn.png';
import molLogo from 'logos/mol.png';
import yaleLogo from 'logos/yale.png';

import styles from './dashboard-styles.module.scss';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
  return (
    <section>
      <DashboardView {...props} className={styles.dashboardView} />
      <div className={styles.partners}>
        <img src={logoImgColor}></img>
        <img src={heLogoImg}></img>
        <img src={iucnLogo}></img>
        <img src={molLogo}></img>
        <img src={yaleLogo}></img>
      </div>
    </section>
  );
}

export default DashboardComponent;
