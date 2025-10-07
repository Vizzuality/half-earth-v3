import { useEffect, useRef, useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import cx from 'classnames';

import { PRECALCULATED_LAYERS_SLUG } from 'constants/analyze-areas-constants';
import {
  getCountryNames,
  getWDPATranslations,
} from 'constants/translation-constants';

import styles from './styles.module.scss';

import CloseIcon from 'icons/close.svg?react';

function MapTooltipComponent({
  img,
  view,
  content,
  isVisible,
  tooltipPosition,
  onCloseButtonClick,
  onActionButtonClick,
  precalculatedLayerSlug,
}) {
  const t = useT();
  const isProtectedArea =
    precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.protectedAreas;
  const isNational =
    precalculatedLayerSlug === PRECALCULATED_LAYERS_SLUG.national;

  const locale = useLocale();
  const WDPATranslations = useMemo(() => getWDPATranslations(), [locale]);
  const CountryNamesTranslations = useMemo(() => getCountryNames(), [locale]);
  const translateInfo = (data) => WDPATranslations[data] || data;
  const translateCountry = (data) => CountryNamesTranslations[data] || data;

  const tooltipref = useRef(null);

  // Clean up on mount
  useEffect(() => {
    onCloseButtonClick();
  }, []);

  useEffect(() => {
    if (!view) return;
    if (isVisible && tooltipPosition) {
      view.openPopup({
        location: tooltipPosition.centroid,
        content: tooltipref.current,
      });
    } else {
      view.closePopup();
    }
  }, [isVisible, tooltipPosition, view]);

  return (
    <div
      ref={tooltipref}
      className={cx(styles.tooltipContainer, {
        [styles.isVisible]: isVisible,
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
              {!isProtectedArea && !isNational && (
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
                    {isProtectedArea ? '100' : content.percentage_protected}%
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
