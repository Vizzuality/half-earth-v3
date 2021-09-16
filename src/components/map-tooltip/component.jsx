import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import styles from './country-entry-tooltip-styles.module.scss';

const CountryEntryTooltipComponent = ({ 
  img,
  view,
  tooltipPosition,
  onCloseButtonClick,
  onActionButtonClick }) => {
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
  if (tooltipPosition && tooltip) {
    view.popup.open({
      location: tooltipPosition,
      content: tooltipref.current
    })
  } else {
    view.popup.close()
  }
}, [tooltipPosition, tooltip])

  return tooltipPosition && tooltip ? (
    <div
      ref={tooltipref}
      className={styles.tooltipContainer}
    >
      <section className={styles.tooltipSection}>
        {img && <img className={styles.tooltipFlag}  alt="" />}
        <span className={styles.tooltipName}>content here</span>
      </section>
      <CloseIcon className={styles.tooltipClose} onClick={onCloseButtonClick}/>
      <button
        className={styles.tooltipExplore}
        onClick={onActionButtonClick}
      >
        explore
      </button>
    </div>
  ) : null;
}

export default CountryEntryTooltipComponent;
