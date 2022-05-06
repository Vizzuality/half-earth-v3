// Dependencies
import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { loadModules } from 'esri-loader';
import { motion } from 'framer-motion';
// Assets
import { ReactComponent as CloseIcon } from 'icons/close.svg';
// Styles
import styles from './country-entry-tooltip-styles.module.scss';
import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';
import { LAND_MARINE } from 'constants/country-mode-constants';

const CountryEntryTooltipComponent = ({
  view,
  countryISO,
  countryName,
  mapTooltipIsVisible,
  tooltipContent,
  tooltipPosition,
  handleTooltipClose,
  onExploreCountryClick,
  onboardingStep,
  changeUI,
  onboardingType,
  waitingInteraction,
}) => {
  const { REACT_APP_FEATURE_MARINE } = process.env;

  const tooltipref = useRef(null);
  const onboardingButtonReference = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [activeTab, setActiveTab] = useState('land');

  const {
    spiLand,
    spiMar,
    landVertebrates,
    marVertebrates,
    endemicLand,
    endemicMar,
    protectionLand,
    protectionMar,
    protectionNeededLand,
    protectionNeededMar,
  } = tooltipContent;

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
        view.goTo(camera, { speedFactor: 0.5, easing: 'in-cubic' }).then(() => {
          if (onboardingStep === 2 && onboardingButtonReference.current) {
            const { y, x, width } =
              onboardingButtonReference.current.getBoundingClientRect();
            changeUI({
              onboardingTooltipTop: y,
              onboardingTooltipLeft: x + width + 10,
            });
          }
        });
      }
    } else {
      view.popup.close();
    }
  }, [tooltipPosition, tooltip, mapTooltipIsVisible]);

  const { overlay: onboardingOverlay } = getOnboardingProps({
    section: 'exploreNRC',
    styles,
    changeUI,
    onboardingType,
    onboardingStep,
    waitingInteraction,
  });

  const tabsData = {
    land: {
      text: 'Land',
    },
    marine: {
      text: 'Marine',
    },
  };

  const landTab = activeTab === LAND_MARINE.land;

  return tooltipPosition && tooltip ? (
    <>
      <div ref={tooltipref} className={styles.tooltipContainer}>
        <section className={styles.tooltipSection}>
          <div>
            <img
              className={styles.tooltipFlag}
              src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
              alt=""
            />
            <span className={styles.tooltipName}>{countryName}</span>
          </div>
          {REACT_APP_FEATURE_MARINE && (
            <div>
              {Object.keys(tabsData).map((key) => (
                <button
                  key={key}
                  className={cx({
                    [styles.switchDataButton]: true,
                    [styles.switchDataActiveButton]: activeTab === key,
                  })}
                  onClick={() => setActiveTab(key)}
                >
                  {tabsData[key].text}
                </button>
              ))}
            </div>
          )}
        </section>
        <CloseIcon
          className={styles.tooltipClose}
          onClick={handleTooltipClose}
        />
        <section className={styles.spiInfo}>
          {REACT_APP_FEATURE_MARINE && (
            <p className={styles.spi}>{landTab ? spiLand : spiMar}</p>
          )}
          {!REACT_APP_FEATURE_MARINE && <p className={styles.spi}>{spiLand}</p>}
          <p className={styles.subtitle}>National species protection index</p>
        </section>
        <section className={styles.countryInfo}>
          <div className={styles.infoPill}>
            <span className={styles.numeric}>
              {landTab ? landVertebrates : marVertebrates}
            </span>
            <span className={styles.text}>
              {`${
                landTab ? LAND_MARINE.land : LAND_MARINE.marine
              } vertebrate species of which`}{' '}
              <span className={styles.endemic}>
                {landTab ? endemicLand : endemicMar}
              </span>{' '}
              are endemic
            </span>
          </div>
          <div className={styles.infoPill}>
            <span className={styles.numeric}>
              {landTab ? protectionLand : protectionMar}%
            </span>
            <span className={styles.text}>
              {`${
                landTab ? LAND_MARINE.land : LAND_MARINE.marine
              } is protected`}
            </span>
          </div>
          <div className={styles.infoPill}>
            <span className={styles.numeric}>
              {landTab ? protectionNeededLand : protectionNeededMar}%
            </span>
            <span className={styles.text}>
              {`of additional ${
                landTab ? LAND_MARINE.land : LAND_MARINE.marine
              } protection is needed`}
            </span>
          </div>
        </section>
        <motion.div {...onboardingOverlay}>
          <button
            ref={onboardingButtonReference}
            className={styles.tooltipExplore}
            onClick={onExploreCountryClick}
          >
            explore
          </button>
        </motion.div>
      </div>
    </>
  ) : null;
};

export default CountryEntryTooltipComponent;
