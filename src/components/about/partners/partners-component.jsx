import React from 'react';
// import { ReactComponent as MouseRightClickIcon } from 'icons/mouseRightClick.svg';
import eoWilsonLogo from 'logos/eoWilson.png';
import molLogo from 'logos/mol.png';
import gbifLogo from 'logos/gbif.png';
import eBirdLogo from 'logos/eBird.png';
import changingOceanLogo from 'logos/changingOcean.png';
import vizzualityLogo from 'logos/vizzuality.png';
import globalFishingWatchLogo from 'logos/globalFishingWatch.png';
import eesaLogo from 'logos/eesa.png';
import iucnLogo from 'logos/iucn.png';
import unEnvironmentLogo from 'logos/unEnvironment.png';
import raisgLogo from 'logos/raisg.png';
import eolLogo from 'logos/eol.png';
import yaleLogo from 'logos/yale.png';
import ubcLogo from 'logos/ubc.png';
import universityOfFloridaLogo from 'logos/universityOfFlorida.png';
import googleEarthEngineLogo from 'logos/googleEarthEngine.png';
import googleCloudLogo from 'logos/googleCloud.png';

import { ReactComponent as CartoLogo } from 'logos/carto.svg';

import styles from './partners-styles.module.scss';


const coreTitle = 'Half-Earth mapping core';
const sponsorsTitle = 'Sponsors';
const partnersTitle = 'Data partners';
const researchPartnersTitle = 'Research partners';
const sponsorsNames = 'Jeff and Laurie Ubben';

const coreDescription = 'The Half-Earth Project is an initiative of the E.O. Wilson Biodiversity Foundation. Map of Life utilizes geospatial species distribution data and analytics to guide where we have the best opportunity to conserve the most species. Vizzuality brings this information to life.';

const MapInstructionsComponent = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.coreTitle}>{coreTitle}</span>
      <div className={styles.coreLogosSection}>
        <img src={molLogo} alt=""/>
        <img src={eoWilsonLogo} alt=""/>
        <img src={vizzualityLogo} alt=""/>
      </div>
      <span className={styles.coreDescription}>{coreDescription}</span>
      <span className={styles.sponsorsTitle}>{sponsorsTitle}</span>
      <span className={styles.sponsorsNames}>{sponsorsNames}</span>
      <span className={styles.partnersTitle}>{partnersTitle}</span>
      <div className={styles.partenrsLogosSection}>
        <img src={molLogo} alt=""/>
        <img src={changingOceanLogo} alt=""/>
        <img src={gbifLogo} alt=""/>
        <img src={eBirdLogo} alt=""/>
      </div>
      <div className={styles.partenrsLogosSection}>
        <img src={iucnLogo} alt=""/>
        <img src={globalFishingWatchLogo} alt=""/>
        <img src={unEnvironmentLogo} alt=""/>
        <img src={eesaLogo} alt=""/>
      </div>
      <div className={styles.partenrsLogosSection}>
        <img src={raisgLogo} alt=""/>
        <img src={eolLogo} alt=""/>
        <CartoLogo />
      </div>
      <span className={styles.researchPartnersTitle}>{researchPartnersTitle}</span>
      <div className={styles.partenrsLogosSection}>
        <img src={yaleLogo} alt=""/>
        <img src={ubcLogo} alt=""/>
        <img src={universityOfFloridaLogo} alt=""/>
        <img src={googleEarthEngineLogo} alt=""/>
      </div>
      <div className={styles.partenrsLogosSection}>
        <img src={googleCloudLogo} alt=""/>
      </div>

    </div>
  )
}

export default MapInstructionsComponent;
