import { useEffect, useState, useRef, useMemo } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { roundSPI } from 'utils/data-formatting-utils';

import cx from 'classnames';
import { motion } from 'framer-motion';

import { getOnboardingProps } from 'containers/onboarding/onboarding-hooks';

import { LAND_MARINE } from 'constants/country-mode-constants';
import { useLandscape } from 'constants/responsive';
import { getCountryNames } from 'constants/translation-constants';

import CloseIcon from 'icons/close.svg?react';

import styles from './country-entry-tooltip-styles.module.scss';

function CountryEntryTooltipComponent({
  view,
  countryISO,
  mapTooltipIsVisible,
  tooltipContent,
  tooltipPosition,
  handleTooltipClose,
  onExploreCountryClick,
  onboardingStep,
  changeUI,
  onboardingType,
  waitingInteraction,
  isMobile,
  activeTab,
  setActiveTab,
}) {
  const t = useT();
  const locale = useLocale();
  const isLandscape = useLandscape();

  const countryNames = useMemo(getCountryNames, [locale]);
  const tooltipref = useRef(null);
  const onboardingButtonReference = useRef(null);

  const {
    countryName,
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

  useEffect(() => {
    if (!view) return;
    if (tooltipPosition && mapTooltipIsVisible) {
      view.openPopup({
        location: tooltipPosition,
        content: tooltipref.current,
      });

      // view.popup?.reposition();
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
      view.closePopup();
    }
  }, [tooltipPosition, mapTooltipIsVisible, view]);

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

  if (!tooltipPosition) return null;
  return (
    <div
      ref={tooltipref}
      className={cx({
        [styles.tooltipContainer]: true,
        [styles.mobile]: isMobile,
        [styles.landscape]: isLandscape,
      })}
    >
      <section className={styles.tooltipSection}>
        <div>
          <img
            className={styles.tooltipFlag}
            src={`/flags/${countryISO}.svg`}
            alt=""
          />
          <span className={styles.tooltipName}>
            {countryNames[countryName] || countryName}
          </span>
        </div>
        {!isMobile && (
          <div>
            {Object.keys(tabsData).map((key) => (
              <button
                key={key}
                disabled={!coastal}
                type="button"
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
        onClick={() => {
          handleTooltipClose();
          setActiveTab('land');
        }}
      />
      {isMobile && (
        <section className={styles.switchDataButtonsContainer}>
          {Object.keys(tabsData).map((key) => (
            <button
              key={key}
              disabled={!coastal}
              type="button"
              className={cx({
                [styles.switchDataButton]: true,
                [styles.switchDataActiveButton]: activeTab === key,
              })}
              onClick={() => setActiveTab(key)}
            >
              {tabsData[key].text}
            </button>
          ))}
        </section>
      )}
      <section className={styles.spiInfo}>
        <p className={styles.spi}>
          {landTab ? roundSPI(spiLand) : roundSPI(spiMar)}
        </p>
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
            {landTab ? (
              <T
                _str="land vertebrate species of which {number} are endemic"
                number={<span className={styles.endemic}>{endemicLand}</span>}
              />
            ) : (
              <T
                _str="marine vertebrate species of which {number} are endemic"
                number={<span className={styles.endemic}>{endemicMar}</span>}
              />
            )}
          </span>
        </div>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>
            {landTab ? Math.round(protectionLand) : Math.round(protectionMar)}%
          </span>
          <span className={styles.text}>
            {landTab
              ? t('land area is protected')
              : t('marine area is protected')}
          </span>
        </div>
        <div className={styles.infoPill}>
          <span className={styles.numeric}>
            {landTab
              ? Math.round(protectionNeededLand)
              : Math.round(protectionNeededMar)}
            %
          </span>
          <span className={styles.text}>
            {landTab
              ? t('of additional land protection is needed (as of 2024)')
              : t('of additional marine protection is needed (as of 2024)')}
          </span>
        </div>
      </section>
      <motion.div {...onboardingOverlay}>
        <button
          ref={onboardingButtonReference}
          type="button"
          className={styles.tooltipExplore}
          onClick={onExploreCountryClick}
        >
          {isMobile ? t('National Report Card') : t('explore')}
        </button>
      </motion.div>
    </div>
  );
}

export default CountryEntryTooltipComponent;
