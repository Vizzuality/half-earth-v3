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
        <span className={styles.tooltipName}>{countryName}</span>
      </section>
      <CloseIcon className={styles.tooltipClose} onClick={handleTooltipClose}/>
      <button
        className={styles.tooltipExplore}
        onClick={onExploreCountryClick}
      >
        explore
      </button>
    </div>
  ) : null;
}

export default CountryEntryTooltipComponent;
