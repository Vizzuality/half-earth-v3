// Dependencies
import React, { useEffect, useState, useRef } from 'react';
import { loadModules } from 'esri-loader';
// Components
import Tooltip from 'containers/onboarding/tooltip';
// Assets
import { ReactComponent as CloseIcon } from 'icons/close.svg';
// Styles
import styles from './country-entry-tooltip-styles.module.scss';

const CountryEntryTooltipComponent = ({
  view,
  countryISO,
  countryName,
  mapTooltipIsVisible,
  tooltipContent,
  tooltipPosition,
  handleTooltipClose,
  onExploreCountryClick,
}) => {
  const tooltipref = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const { spi, vertebrates, endemic, protection, protectionNeeded } =
    tooltipContent;

  // Create a new Popup to contain the tooltip
  useEffect(() => {
    loadModules(['esri/widgets/Popup']).then(([Popup]) => {
      const _tooltip = new Popup({ view, alignment: 'top-center' });
      setTooltip(_tooltip);
    });
  }, []);

  useEffect(() => {
    if (tooltipPosition && tooltip && mapTooltipIsVisible) {
      view.popup.open({
        location: tooltipPosition,
        content: tooltipref.current,
      });

      view.popup.reposition();
      if (view.camera) {
        const camera = view.camera.clone();
        camera.position.latitude += 5;
        view.goTo(camera, { speedFactor: 0.5, easing: 'in-cubic' });
      }
    } else {
      view.popup.close();
    }
  }, [tooltipPosition, tooltip, mapTooltipIsVisible]);

  return tooltipPosition && tooltip ? (
    <div ref={el => {
      if (!el) return;

      console.log(el.getBoundingClientRect())
    }}>

      <div ref={tooltipref} className={styles.tooltipContainer}>
        <section className={styles.tooltipSection}>
          <img
            className={styles.tooltipFlag}
            src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
            alt=""
          />
          <span className={styles.tooltipName}>{countryName}</span>
        </section>
        <CloseIcon className={styles.tooltipClose} onClick={handleTooltipClose} />
        <section className={styles.spiInfo}>
          <p className={styles.spi}>{spi}</p>
          <p className={styles.subtitle}>National species protection index</p>
        </section>
        <section className={styles.countryInfo}>
          <div className={styles.infoPill}>
            <span className={styles.numeric}>{vertebrates}</span>
            <span className={styles.text}>
              land vertebrate species of which{' '}
              <span className={styles.endemic}>{`${endemic}`}</span> are endemic
            </span>
          </div>
          <div className={styles.infoPill}>
            <span className={styles.numeric}>{protection}%</span>
            <span className={styles.text}>land is protected</span>
          </div>
          <div className={styles.infoPill}>
            <span className={styles.numeric}>{protectionNeeded}%</span>
            <span className={styles.text}>
              of additional land protection is needed
            </span>
          </div>
        </section>
        <button className={styles.tooltipExplore} onClick={onExploreCountryClick}>
          explore
        </button>
      </div>
      <div className={{ position: 'absolute', left: 0 }}>
        <Tooltip />
      </div>
    </div >
  ) : null;
};

export default CountryEntryTooltipComponent;
