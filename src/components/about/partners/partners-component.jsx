import React from 'react';
// import { ReactComponent as MouseRightClickIcon } from 'icons/mouseRightClick.svg';
import eoWilsonLogo from 'icons/eoWilsonLogo.png';
import molLogo from 'icons/molLogo.png';
import gbifLogo from 'icons/gbifLogo.png';
import eBirdLogo from 'icons/eBirdLogo.png';
import changingOceanLogo from 'icons/changingOceanLogo.png';
import vizzualityLogo from 'icons/vizzualityLogo.png';
import globalFishingWatchLogo from 'icons/globalFishingWatchLogo.png';
import eesaLogo from 'icons/eesaLogo.png';
import iucnLogo from 'icons/iucnLogo.png';
import unEnvironmentLogo from 'icons/unEnvironmentLogo.png';
import styles from './partners-styles.module.scss';

const coreTitle = 'Half-Earth mapping core';
const sponsorsTitle = 'Sponsors';
const partnersTitle = 'Data partners';

const sponsorsNames = 'Jeff and Laurie Ubben';

const coreDescription = 'The Half-Earth Project is an initiative of the E.O. Wilson Biodiversity Foundation. Map of Life utilizes geospatial species distribution data and analytics to guide where we have the best opportunity to conserve the most species. Vizzuality brings this information to life.';

const MapInstructionsComponent = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.coreTitle}>{coreTitle}</span>
      <div className={styles.coreLogosSection}>
        <img src={molLogo}/>
        <img src={eoWilsonLogo}/>
        <img src={vizzualityLogo}/>
      </div>
      <span className={styles.coreDescription}>{coreDescription}</span>
      <span className={styles.sponsorsTitle}>{sponsorsTitle}</span>
      <span className={styles.sponsorsNames}>{sponsorsNames}</span>
      <span className={styles.partnersTitle}>{partnersTitle}</span>
      <div className={styles.partenrsLogosSection}>
        <img src={molLogo}/>
        <img src={changingOceanLogo}/>
        <img src={gbifLogo}/>
        <img src={eBirdLogo}/>
      </div>
      <div className={styles.partenrsLogosSection}>
        <img src={iucnLogo}/>
        <img src={globalFishingWatchLogo}/>
        <img src={unEnvironmentLogo}/>
        <img src={eesaLogo}/>
      </div>
    </div>
  )
}

export default MapInstructionsComponent;
