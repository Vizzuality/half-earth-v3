import React, { useEffect, useState, useRef, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import cx from 'classnames';
import { loadModules } from 'esri-loader';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

import { useMobile } from 'constants/responsive';
import {
  getCountryNames,
  getWDPATranslations,
} from 'constants/translation-constants';

import styles from './styles.module.scss';

function MapTooltipComponent({
  img,
  view,
  content,
  isVisible,
  isProtectedArea,
  tooltipPosition,
  onCloseButtonClick,
  onActionButtonClick,
}) {
  const t = useT();
  const locale = useLocale();
  const WDPATranslations = useMemo(() => getWDPATranslations(), [locale]);
  const CountryNamesTranslations = useMemo(() => getCountryNames(), [locale]);
  const translateInfo = (data) => WDPATranslations[data] || data;
  const translateCountry = (data) => CountryNamesTranslations[data] || data;

  const tooltipref = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  // Create a new Popup to contain the tooltip
  useEffect(() => {
    loadModules(['esri/widgets/Popup']).then(([Popup]) => {
      // eslint-disable-next-line no-underscore-dangle
      const _tooltip = new Popup({ view });
      setTooltip(_tooltip);
    });
    return function cleanUp() {
      onCloseButtonClick();
    };
  }, []);

  // Clean up on mount
  useEffect(() => {
    onCloseButtonClick();
  }, []);

  useEffect(() => {
    if (isVisible && tooltip && tooltipPosition) {
      view.popup.open({
        location: tooltipPosition.centroid,
        content: tooltipref.current,
      });
    } else {
      view.popup.close();
    }
  }, [isVisible, tooltipPosition, tooltip]);

  return (
    <div
      ref={tooltipref}
      className={cx(styles.tooltipContainer, {
        [styles.isVisible]: isVisible,
        [styles.isMobile]: useMobile(),
      })}
    >
      {content && (
        <>
          <section className={styles.tooltipSection}>
            {img && <img className={styles.tooltipFlag} alt="" />}
            <div className={styles.featureNaming}>
              <span className={styles.title}>
                {translateCountry(content.title)}
              </span>
              {isProtectedArea && (
                <span className={styles.description}>
                  {translateInfo(content.description)}
                </span>
              )}
              {!isProtectedArea && (
                <span className={styles.subtitle}>
                  {translateCountry(content.subtitle)}
                </span>
              )}
              <div className={styles.speciesContent}>
                {content.nspecies && (
                  <div className={styles.content}>
                    <p className={styles.contentData}>{content.nspecies}</p>
                    <p className={styles.contentDescription}>
                      {t('land vertebrate species')}
                    </p>
                  </div>
                )}
                <div className={styles.content}>
                  <p className={styles.contentData}>
                    {content.percentage_protected}%
                  </p>{' '}
                  {t('land is protected')}
                </div>
                {isProtectedArea && (
                  <>
                    <div className={styles.content}>
                      <p className={styles.contentData}>
                        {translateInfo(content.designation_type)}
                      </p>
                      {t('designation type')}
                    </div>
                    <div className={styles.content}>
                      <p className={styles.contentData}>
                        {translateInfo(content.IUCN_type)}
                      </p>
                      {t('IUCN type')}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
          <CloseIcon
            className={styles.tooltipClose}
            onClick={onCloseButtonClick}
          />

          <button
            type="button"
            className={styles.tooltipExplore}
            onClick={onActionButtonClick}
          >
            {content.buttonText}
          </button>
        </>
      )}
    </div>
  );
}

export default MapTooltipComponent;
