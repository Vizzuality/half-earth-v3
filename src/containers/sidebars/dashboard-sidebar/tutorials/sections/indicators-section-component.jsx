import React, { useContext } from 'react';

import { useLocale, useT } from '@transifex/react';

import { tutorialSections } from 'utils/dashboard-utils.js';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import ImagePopupComponent from 'components/image-popup/image-popup-component';

import TimeLineIcon from 'icons/timeline.svg?react';

import styles from '../tutorials-components-styles.module.scss';

import { SECTION_INFO } from './sections-info';

function IndicatorsSectionComponent(props) {
  const t = useT();
  const locale = useLocale();

  const { lightMode } = useContext(LightModeContext);
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.title}>
        <TimeLineIcon />
        <h2 id={tutorialSections.INDICATORS}>{t('Indicators')}</h2>
      </div>
      <div className={styles.subTitle}>
        <h3 id={tutorialSections.SPI}>{t('Species Protection Index')}</h3>
      </div>
      <p>{t(SECTION_INFO.SPI)}</p>
      <p>{t(SECTION_INFO.SPI_TWO)}</p>
      <p>{t(SECTION_INFO.SPI_THREE)}</p>
      <p>{t(SECTION_INFO.SPI_FOUR)}</p>
      <p>{t(SECTION_INFO.SPI_FIVE)}</p>
      <div className={styles.subTitle}>
        <h3 className={styles.sub}>{t('Temporal Trend')}</h3>
      </div>
      <p>{t(SECTION_INFO.SPI_TEMPORAL_TREND)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_spi_temporalTrends-${
            locale || 'en'
          }.png?react`}
          alt={t('Species Protection Index - Trends')}
        />
      </ImagePopupComponent>
      <div className={styles.subTitle}>
        <h3 className={styles.sub}>{t('Province View')}</h3>
      </div>
      <p>{t(SECTION_INFO.SPI_PROVINCE_VIEW)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_spi_provinces-${
            locale || 'en'
          }.png?react`}
          alt={t('Species Protection Index - Provinces')}
        />
      </ImagePopupComponent>
      <div className={styles.subTitle}>
        <h3 className={styles.sub}>{t('Score Distributions')}</h3>
      </div>
      <p>{t(SECTION_INFO.SPI_SCORE_DISTRIBUTIONS)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_spi_scoreDist-${
            locale || 'en'
          }.png?react`}
          alt={t('Species Protection Index - Score Distributions')}
        />
      </ImagePopupComponent>
      <div className={styles.subTitle}>
        <h3 id={tutorialSections.SHI}>{t('Species Habitat Index')}</h3>
      </div>
      <p>{t(SECTION_INFO.SHI)}</p>
      <p>{t(SECTION_INFO.SHI_TWO)}</p>
      <p>{t(SECTION_INFO.SHI_THREE)}</p>
      <p>{t(SECTION_INFO.SHI_FOUR)}</p>
      <div className={styles.subTitle}>
        <h3 className={styles.sub}>{t('Temporal Trend')}</h3>
      </div>
      <p>{t(SECTION_INFO.SHI_TEMPORAL_TREND)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_shi_temporalTrends-${
            locale || 'en'
          }.png?react`}
          alt={t('Species Habitat Index - Trends')}
        />
      </ImagePopupComponent>
      <div className={styles.subTitle}>
        <h3 className={styles.sub}>{t('Province View')}</h3>
      </div>
      <p>{t(SECTION_INFO.SHI_PROVINCE_VIEW)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_shi_provinces-${
            locale || 'en'
          }.png?react`}
          alt={t('Species Habitat Index - Provinces')}
        />
      </ImagePopupComponent>
      <div className={styles.subTitle}>
        <h3 className={styles.sub}>{t('Score Distributions')}</h3>
      </div>
      <p>{t(SECTION_INFO.SHI_SCORE_DISTRIBUTIONS)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_shi_scoreDist-${
            locale || 'en'
          }.png?react`}
          alt={t('Species Habitat Index - Score Distributions')}
        />
      </ImagePopupComponent>
      <div className={styles.subTitle}>
        <h3 id={tutorialSections.SII}>{t('Species Information Index')}</h3>
      </div>
      <p>{t(SECTION_INFO.SII)}</p>
      <p>{t(SECTION_INFO.SII_TWO)}</p>
      <p>{t(SECTION_INFO.SII_THREE)}</p>
      <p>{t(SECTION_INFO.SII_FOUR)}</p>
      <div className={styles.subTitle}>
        <h3 className={styles.sub}>{t('Temporal Trends')}</h3>
      </div>
      <p>{t(SECTION_INFO.SII_TEMPORAL_TREND)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_sii_temporalTrends-${
            locale || 'en'
          }.png?react`}
          alt={t('Species Information Index - Trends')}
        />
      </ImagePopupComponent>
    </section>
  );
}

export default IndicatorsSectionComponent;
