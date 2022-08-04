import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useT, useLocale } from '@transifex/react';
import cx from 'classnames';
import { loadModules } from 'esri-loader';
import { motion } from 'framer-motion';
import { getCountryNames } from 'constants/translation-constants';

// Assets
import { ReactComponent as CloseIcon } from 'icons/close.svg';

// styles
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
  const t = useT();
  const locale = useLocale();

  const countryNames = useCallback(getCountryNames, [locale]);

  const tooltipref = useRef(null);
  const onboardingButtonReference = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [activeTab, setActiveTab] = useState('land');

  const {
    coastal,
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
      text: t('Land'),
    },
    marine: {
      text: t('Marine'),
    },
  };

  const landTab = activeTab === LAND_MARINE.land;
  if (!tooltipPosition || !tooltip) return null;
  return (
    <div ref={tooltipref} className={styles.tooltipContainer}>
      <section className={styles.tooltipSection}>
        <div>
          <img
            className={styles.tooltipFlag}
            src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
            alt=""
          />
          <span className={styles.tooltipName}>
            {countryNames[countryName] || countryName}
          </span>
        </div>
        <div>
          {Object.keys(tabsData).map((key) => (
            <button
              key={key}
              disabled={!coastal}
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
      </section>
      <CloseIcon
        className={styles.tooltipClose}
        onClick={() => {
          handleTooltipClose();
          setActiveTab('land');
        }}
      />
      <section className={styles.spiInfo}>
        <p className={styles.spi}>{landTab ? spiLand : spiMar}</p>
        <p className={styles.subtitle}>
          {t('National species protection index')}
        </p>
      </section>
      <section className={styles.countryInfo}>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>
            {landTab ? landVertebrates : marVertebrates}
          </span>
          <span className={styles.text}>
            {`${landTab ? LAND_MARINE.land : LAND_MARINE.marine}${t(
              ' vertebrate species of which'
            )}`}{' '}
            <span className={styles.endemic}>
              {landTab ? endemicLand : endemicMar}
            </span>{' '}
            {t('are endemic')}
          </span>
        </div>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>
            {landTab ? protectionLand : protectionMar}%
          </span>
          <span className={styles.text}>
            {`${landTab ? LAND_MARINE.land : LAND_MARINE.marine}${t(
              ' area is protected'
            )}`}
          </span>
        </div>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>
            {landTab ? protectionNeededLand : protectionNeededMar}%
          </span>
          <span className={styles.text}>
            {`${t('of additional ')}${
              landTab ? LAND_MARINE.land : LAND_MARINE.marine
            }${t(' protection is needed')}`}
          </span>
        </div>
      </section>
      <motion.div {...onboardingOverlay}>
        <button
          ref={onboardingButtonReference}
          className={styles.tooltipExplore}
          onClick={onExploreCountryClick}
        >
          {t('explore')}
        </button>
      </motion.div>
    </div>
  );
};

export default CountryEntryTooltipComponent;
