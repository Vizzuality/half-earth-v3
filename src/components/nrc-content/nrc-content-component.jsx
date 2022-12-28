/* eslint-disable camelcase */
import React, { useState } from 'react';

import { useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';

import {
  useOnboardingTooltipRefs,
  getOnboardingProps,
} from 'containers/onboarding/onboarding-hooks';

import Button from 'components/button';
import AreaChart from 'components/charts/area-chart';
import ScatterPlot from 'components/charts/scatter-plot';
import CloseButton from 'components/close-button';
import AreaChartToooltip from 'components/nrc-content/area-chart-tooltip';
import IndicatorCard from 'components/nrc-content/indicator-card';
import ShareModal from 'components/share-modal';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import { ReactComponent as InfoIcon } from 'icons/infoDark.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import styles from './nrc-content-styles.module.scss';

function NrcContent({
  changeUI,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  handleClose,
  countryISO,
  countryName,
  handlePrintReport,
  goToAnalyzeAreas,
  goToExploreData,
  handleBubbleClick,
  countryData,
  countryDescription,
  landMarineSelection,
  areaChartData,
  xAxisTicks,
  yAxisTicks,
  countryChallengesSelectedKey,
  scatterPlotData,
}) {
  const t = useT();
  const locale = useLocale();
  const {
    amphibians,
    birds,
    mammals,
    reptiles,
    endemic_amphibians,
    endemic_birds,
    endemic_mammals,
    endemic_reptiles,
    SPI_ter,
    SPI_mar,
    total_endemic_mar,
    total_endemic_ter,
    prop_protected_ter,
    prop_protected_mar,
    nspecies_ter,
    nspecies_mar,
    protection_needed_ter,
    protection_needed_mar,
    Global_SPI_ter,
    Global_SPI_mar,
  } = countryData || {};

  const { land: landData, marine: marineData } = areaChartData;

  const land = landMarineSelection === 'land';
  const textLandMarineSelection = land ? 'land' : 'marine';
  const SPI = land ? SPI_ter : SPI_mar;
  const Global_SPI = land ? Global_SPI_ter : Global_SPI_mar;
  const total_endemic = land ? total_endemic_ter : total_endemic_mar;
  const prop_protected = land ? prop_protected_ter : prop_protected_mar;
  const nspecies = land ? nspecies_ter : nspecies_mar;
  const protection_needed = land
    ? protection_needed_ter
    : protection_needed_mar;

  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const tooltipRefs = useOnboardingTooltipRefs({
    changeUI,
    onboardingType,
    onboardingStep,
  });
  const { overlay: onboardingOverlay, className: onboardingClassName } =
    getOnboardingProps({
      section: 'closure',
      styles,
      changeUI,
      onboardingType,
      onboardingStep,
      waitingInteraction,
    });

  const SPECIES_COMPOSITION = [
    {
      specie: 'amphibians',
      endemic: endemic_amphibians,
      total: amphibians,
      icon: AmphibiansIcon,
    },
    {
      specie: 'birds',
      endemic: endemic_birds,
      total: birds,
      icon: BirdsIcon,
    },
    {
      specie: 'reptiles',
      endemic: endemic_reptiles,
      total: reptiles,
      icon: ReptilesIcon,
    },
    {
      specie: 'mammals',
      endemic: endemic_mammals,
      total: mammals,
      icon: MammalsIcon,
    },
  ];

  return (
    <div className={styles.nrcContent}>
      <CloseButton
        reference={(ref) => {
          tooltipRefs.current.closure = ref;
        }}
        handleClose={handleClose}
        className={cx(styles.closeButton, onboardingClassName)}
        tooltipText={t('Go back to the globe')}
        onboardingOverlay={onboardingOverlay}
      />
      <header className={styles.header}>
        <div className={styles.flagWrapper}>
          <img
            className={styles.flag}
            src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
            alt=""
          />
          {countryName && <p className={styles.countryName}>{countryName}</p>}
        </div>
        <div className={styles.actionButtons}>
          <Button
            type="icon-square"
            Icon={AnalyzeAreasIcon}
            className={styles.actionButton}
            handleClick={goToAnalyzeAreas}
            tooltipText={t('Go to analyze area')}
          />
          <Button
            type="icon-square"
            Icon={ShareIcon}
            className={styles.actionButton}
            handleClick={setShareModalOpen}
            tooltipText={t('Share the URL to this view')}
          />
          <Button
            type="icon-square"
            Icon={DownloadIcon}
            handleClick={handlePrintReport}
            tooltipText={t('Download national report')}
          />
        </div>
      </header>

      <div className={styles.scrolleableArea}>
        <div className={styles.countryDescriptionContainer}>
          <p className={styles.countryDescription}>{countryDescription}</p>
        </div>
        <div className={styles.indicatorCardsContainer}>
          <IndicatorCard
            indicator={getLocaleNumber(SPI, locale) || 0}
            description={
              <p>
                {t(
                  `${
                    textLandMarineSelection.charAt(0).toUpperCase() +
                    textLandMarineSelection.slice(1)
                  } Species Protection Index (SPI)`
                )}
              </p>
            }
          >
            <div>
              <p className={styles.spiAverageText}>
                {'>'} Global SPI average:{' '}
                {getLocaleNumber(Global_SPI, locale) || 0}
              </p>
            </div>
          </IndicatorCard>
          <IndicatorCard
            color="#F8D300"
            indicator={
              total_endemic_ter && getLocaleNumber(total_endemic, locale)
            }
            description={
              <p>
                <b>{t('are endemic')}</b>{' '}
                {t(
                  `${textLandMarineSelection} vertebrate species of a total of`
                )}{' '}
                {getLocaleNumber(nspecies, locale)}{' '}
                {t(`${textLandMarineSelection} vertebrates`)}
              </p>
            }
          >
            <div
              className={styles.bar}
              style={{
                backgroundImage: `linear-gradient(to right,
                #F8D300,
                #F8D300 ${(total_endemic * 100) / nspecies}%,
                #FFFFFF0F ${(total_endemic * 100) / nspecies}%,
                #FFFFFF0F 100%`,
              }}
            />
          </IndicatorCard>
          <IndicatorCard
            color="#008604"
            indicator={prop_protected && `${Math.round(prop_protected)}%`}
            description={
              <p>
                {t('of')} <b>{t(`${textLandMarineSelection} is protected`)}</b>{' '}
                {t('and')} {getLocaleNumber(protection_needed, locale)}%{' '}
                {t('needs protection')}
              </p>
            }
          >
            <div
              className={styles.bar}
              style={{
                backgroundImage: `linear-gradient(to right,
                #008604,
                #008604 ${prop_protected}%,
                #B3E74B, ${prop_protected}%,
                #B3E74B, ${prop_protected + protection_needed}%,
                #FFFFFF0F ${prop_protected + protection_needed}%,
                #FFFFFF0F 100%                                                                                                                                                                                                                                                  `,
              }}
            />
          </IndicatorCard>
          <IndicatorCard
            color="#7D2EFC"
            indicator="46%"
            description={
              <p>
                {t(`of ${textLandMarineSelection} has very`)}{' '}
                <b>{t('high human modification')}</b>{' '}
                {t('and 5% has some modification')}
              </p>
            }
          >
            <div
              className={styles.bar}
              style={{
                backgroundImage: `linear-gradient(to right,
                #7D2EFC,
                #7D2EFC 65%,
                #B284FD, 65%,
                #B284FD, 70%,
                #FFFFFF0F 70%,
                #FFFFFF0F 100%                                                                                                                                                                                                                                                  `,
              }}
            />
          </IndicatorCard>
        </div>
        <div className={styles.vertebratesContainer}>
          <div className={styles.endemicCardsContainer}>
            {SPECIES_COMPOSITION.map((s) => (
              <div className={styles.endemicCard}>
                <s.icon className={styles.endemicIcon} />
                <p>
                  <b>
                    {getLocaleNumber(s.endemic || 0, locale)} {t('endemic')}
                  </b>
                  <br />
                  {t(`${s.specie} of`)} {getLocaleNumber(s.total, locale)}
                </p>
              </div>
            ))}
          </div>
          <Button
            type="compound"
            handleClick={() => console.log('toggleModal')}
            label={t('All vertebrates')}
            tooltipText={t('Open vertebrates list modal')}
          />
        </div>
        <div className={styles.areaChartContainer}>
          <div className={styles.areaChartHeader}>
            <p className={styles.areaChartTitle}>
              {t('Trend of the land SPI')}
            </p>
            <span>
              <Tooltip
                content={
                  <div className={styles.titleTooltip}>
                    {t(
                      'Lorem ipsum dolor sit amet consectetur. Tincidunt ipsum habitasse lacus dolor ullamcorper lacinia feugiat. Ut senectus bibendum massa nibh quis magna diam ipsum fermentum. '
                    )}
                  </div>
                }
                delay={100}
                placement="top"
              >
                <InfoIcon className={styles.icon} />
              </Tooltip>
            </span>
          </div>
          <AreaChart
            area1={{
              key: 'spi',
              stroke: '#FFFFFF',
              strokeWidth: 0.5,
            }}
            area2={{
              key: 'protected',
              stroke: '#FFFFFF',
              strokeWidth: 0.7,
              strokeDasharray: '3 3 3 3',
            }}
            data={land ? landData : marineData}
            height={240}
            width="98%"
            tooltip
            tooltipContent={<AreaChartToooltip />}
          />
        </div>
        <div className={styles.scatterPlotContainer}>
          <ScatterPlot
            data={scatterPlotData}
            countryISO={countryISO}
            xAxisTicks={xAxisTicks}
            yAxisTicks={yAxisTicks}
            onBubbleClick={handleBubbleClick}
            countryChallengesSelectedKey={countryChallengesSelectedKey}
          />
        </div>
        <p className={styles.sourceText}>
          {t('Source:')} <span>{t('Gross National Income')}</span>,{' '}
          <span>{t('Population')}</span>,{' '}
          <span>{t('proportion of very high human modification')}</span>,{' '}
          <span>{t('number of endemic vertebrates')}</span>,{' '}
          <span>{t('total number of vertebrate species and SPI')}</span>.
        </p>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {t(
              'For a detailed analyzes check the country analyses of the Explore Data section.'
            )}
          </p>
          <Button
            type="icon-square"
            Icon={AnalyzeAreasIcon}
            handleClick={goToExploreData}
            className={styles.analyzeBtn}
            tooltipText={t('Go to Explore Data section')}
            label={t('ANALYZE AREA')}
          />
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        setShareModalOpen={setShareModalOpen}
      />
    </div>
  );
}

export default NrcContent;
