import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { loadModules } from 'esri-loader';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import styles from './styles.module.scss';

const CountryEntryTooltipComponent = ({ 
  img,
  view,
  content,
  isVisible,
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
  return function cleanUp() {
    onCloseButtonClick()
  }
}, [])

useEffect(() => {
  if (isVisible && tooltip && tooltipPosition) {
    view.popup.open({
      location: tooltipPosition.centroid,
      content: tooltipref.current
    })
  } else {
    view.popup.close();
  }
}, [isVisible, tooltipPosition, tooltip])


  return (
    <div
      ref={tooltipref}
      className={cx(
        styles.tooltipContainer,
        {[styles.isVisible]: isVisible}
      )}
    >
      {content && 
      <>
        <section className={styles.tooltipSection}>
          {img && <img className={styles.tooltipFlag}  alt="" />}
          <div className={styles.featureNaming}>
            <span className={styles.title}>{content.title}</span>
            <span className={styles.subtitle}>{content.subtitle}</span>
          </div>
        </section>
        <CloseIcon className={styles.tooltipClose} onClick={onCloseButtonClick}/>
          <button
          className={styles.tooltipExplore}
          onClick={onActionButtonClick}
        >
          {content.buttonText}
        </button>
      </>
      }
    </div>
  );
}

export default CountryEntryTooltipComponent;
