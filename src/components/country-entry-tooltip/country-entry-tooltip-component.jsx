import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import styles from './country-entry-tooltip-styles.module.scss';

const CountryEntryTooltipComponent = ({ 
  view,
  countryName,
  countryISO,
  tooltipPosition,
  handleTooltipClose,
  onExploreCountryClick }) => {
const tooltipref = useRef(null);
const [tooltip, setTooltip] = useState(null);

// Create a new Popup to contain the tooltip
useEffect(() => {
  loadModules(["esri/widgets/Popup"])
  .then(([Popup]) => {
    const _tooltip = new Popup({view});
    setTooltip(_tooltip);
  })
}, [])

useEffect(() => {
  if (tooltipPosition && tooltip && countryISO) {
    view.popup.open({
      location: tooltipPosition,
      content: tooltipref.current
    })
  } else {
    view.popup.close()
  }
}, [tooltipPosition, tooltip, countryISO])

  return tooltipPosition && tooltip ? (
    <div
      ref={tooltipref}
      className={styles.tooltipContainer}
    >
      <section className={styles.tooltipSection}>
        <img className={styles.tooltipFlag} src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`} alt="" />
        <span className={styles.tooltipName}>Brazil</span>
      </section>
      <CloseIcon className={styles.tooltipClose} onClick={handleTooltipClose}/>
      <section className={styles.spiInfo}>
        <p className={styles.spi}>68.95</p>
        <p className={styles.subtitle}>National species protection index</p>
      </section>
      <section className={styles.countryInfo}>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>414</span>
          <span className={styles.text}>land vertebrate species of which 7 are endemic</span>
        </div>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>18%</span>
          <span className={styles.text}>land is protected</span>
        </div>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>34,16%</span>
          <span className={styles.text}>of additional land protection is needed</span>
        </div>
      </section>
      <button
        className={styles.tooltipExplore}
        onClick={onExploreCountryClick}
      >
        national report card
      </button>
    </div>
  ) : null;
}

export default CountryEntryTooltipComponent;
