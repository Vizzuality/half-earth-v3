/* eslint-disable camelcase */
import React, { useState } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';
import { motion } from 'framer-motion';

import {
  useOnboardingTooltipRefs,
  getOnboardingProps,
} from 'containers/onboarding/onboarding-hooks';

import Button from 'components/button';
import AreaChart from 'components/charts/area-chart';
import ScatterPlot from 'components/charts/scatter-plot';
import CloseButton from 'components/close-button';
import AreaChartTooltip from 'components/nrc-content/area-chart-tooltip';
import IndicatorCard from 'components/nrc-content/indicator-card';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
import ShareModal from 'components/share-modal';
import SpeciesTable from 'components/species-table';

import COLORS from 'styles/settings';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import { ReactComponent as InfoIcon } from 'icons/infoDark.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import styles from './nrc-content-styles.module.scss';
import { getBarStyles } from './nrc-content-utils';

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
  handleBubbleClick,
  countryData,
  countryDescription,
  landMarineSelection,
  areaChartData,
  xAxisTicks,
  yAxisTicks,
  countryChallengesSelectedKey,
  scatterPlotData,
  fullRanking,
  setNRCSidebarView,
  NRCSidebarView,
  selectedLandMarineOption,
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
    hm_vh_ter,
    hm_vh_mar,
    hm_ter,
    hm_mar,
  } = countryData || {};

  const { land: landData, marine: marineData } = areaChartData;

  const land = landMarineSelection === 'land';
  const SPI = land ? SPI_ter : SPI_mar;
  const Global_SPI = land ? Global_SPI_ter : Global_SPI_mar;
  const total_endemic = land ? total_endemic_ter : total_endemic_mar;
  const prop_protected = land ? prop_protected_ter : prop_protected_mar;
  const nspecies = land ? nspecies_ter : nspecies_mar;
  const protection_needed = land
    ? protection_needed_ter
    : protection_needed_mar;
  const hm_vh = land ? hm_vh_ter : hm_vh_mar;
  const hm = land ? hm_ter : hm_mar;

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

  const getSpecieText = (txt) => `${txt}`;

  return (
    <div
      className={cx({
        [styles.nrcContent]: true,
        [styles.nrcContentShrunken]: fullRanking,
      })}
    >
      <PdfNationalReport
        countryISO={countryISO}
        areaChartData={areaChartData}
        selectedLandMarineOption={selectedLandMarineOption}
      />
      <CloseButton
        reference={(ref) => {
          tooltipRefs.current.closure = ref;
        }}
        handleClose={handleClose}
        className={cx(styles.closeButton, onboardingClassName)}
        tooltipText={t('Go back to the globe')}
        onboardingOverlay={onboardingOverlay}
      />
      {NRCSidebarView === 'main' && (
        <motion.div
          className={styles.motionView}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <header className={styles.header}>
            <div className={styles.flagWrapper}>
              <img
                className={styles.flag}
                src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
                alt=""
              />
              {countryName && (
                <p className={styles.countryName}>{countryName}</p>
              )}
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
                indicator={SPI ? getLocaleNumber(SPI, locale) : ''}
                description={
                  <p>
                    <T
                      _str="{landMarineSelection} Species Protection Index (SPI)"
                      landMarineSelection={land ? 'Land' : 'Marine'}
                    />
                  </p>
                }
                tooltipInfo={t(
                  'The Species Protection Index (SPI) reflects the average amount of area-based conservation targets that have been met for all endemic species within the country each year, weighted by a country`s stewardship of those species (the proportion of the species population present in that country).'
                )}
              >
                <div>
                  <p className={styles.spiAverageText}>
                    <T
                      _str="{more} Global SPI average: {spiAverage}"
                      more=">"
                      spiAverage={getLocaleNumber(Global_SPI, locale) || 0}
                    />
                  </p>
                </div>
              </IndicatorCard>
              <IndicatorCard
                color={COLORS.gold}
                indicator={
                  total_endemic_ter && getLocaleNumber(total_endemic, locale)
                }
                description={
                  <p>
                    {nspecies && (
                      <T
                        _str="{bold} {landMarineSelection} vertebrate species of a total of {totalEndemicNumber} {landMarineSelection} vertebrates"
                        bold={
                          <b>
                            <T _str="are endemic" />
                          </b>
                        }
                        landMarineSelection={land ? 'land' : 'marine'}
                        totalEndemicNumber={getLocaleNumber(nspecies, locale)}
                      />
                    )}
                  </p>
                }
                tooltipInfo={t(
                  'Endemic species are species unique to the region. A high number of endemic species involves more effort and highly customized networks of protected places.'
                )}
              >
                <div
                  className={styles.bar}
                  style={{
                    backgroundImage: getBarStyles(
                      COLORS.gold,
                      (total_endemic * 100) / nspecies
                    ),
                  }}
                />
              </IndicatorCard>
              <IndicatorCard
                color={COLORS['protected-areas']}
                indicator={prop_protected && `${Math.round(prop_protected)}%`}
                description={
                  <p>
                    {protection_needed && (
                      <T
                        _str="of {bold} and {needsProtectionNumber}% needs protection"
                        bold={
                          <b>
                            <T
                              _str="{landMarineSelection} is protected"
                              landMarineSelection={land ? 'land' : 'marine'}
                            />
                          </b>
                        }
                        needsProtectionNumber={getLocaleNumber(
                          protection_needed,
                          locale
                        )}
                      />
                    )}
                  </p>
                }
                tooltipInfo={t(
                  'Regions that are recognized as currently being managed for long-term nature conservation. An increase of protected areas will result in an increase of the SPI.'
                )}
              >
                <div
                  className={styles.bar}
                  style={{
                    backgroundImage: getBarStyles(
                      COLORS['protected-areas'],
                      prop_protected,
                      COLORS['protection-needed'],
                      prop_protected + protection_needed
                    ),
                  }}
                />
              </IndicatorCard>
              <IndicatorCard
                color={COLORS['high-modification']}
                indicator={hm_vh && `${Math.round(hm_vh)}%`}
                description={
                  <p>
                    {hm && (
                      <T
                        _str="of {landMarineSelection} has very {bold} and {someModificationNumber}% has some modification"
                        bold={
                          <b>
                            <T _str="high human modification" />
                          </b>
                        }
                        landMarineSelection={land ? 'land' : 'marine'}
                        someModificationNumber={Math.round(hm)}
                      />
                    )}
                  </p>
                }
                tooltipInfo={t(
                  'How much human encroachment occurs from urbanization and other economic activities. Some species are less tolerant than others to human disturbances.'
                )}
              >
                <div
                  className={styles.bar}
                  style={{
                    backgroundImage: getBarStyles(
                      COLORS['high-modification'],
                      hm_vh,
                      COLORS['some-modification'],
                      hm
                    ),
                  }}
                />
              </IndicatorCard>
            </div>
            <div className={styles.vertebratesContainer}>
              <div className={styles.endemicCardsContainer}>
                {SPECIES_COMPOSITION.map((s) => (
                  <div className={styles.endemicCard} key={s.specie}>
                    <s.icon className={styles.endemicIcon} />
                    <p>
                      <T
                        _str="{bold} {specie} of {totalNumber}"
                        endemicNumber={getLocaleNumber(s.endemic || 0, locale)}
                        specie={getSpecieText(s.specie)}
                        totalNumber={getLocaleNumber(s.total || 0, locale)}
                        bold={
                          <>
                            <b>
                              <T
                                _str={`${getLocaleNumber(
                                  s.endemic || 0,
                                  locale
                                )} endemic`}
                              />
                            </b>
                            <br />
                          </>
                        }
                      />
                    </p>
                  </div>
                ))}
              </div>
              <Button
                type="compound"
                handleClick={() => setNRCSidebarView('vertebrates')}
                label={t('All vertebrates')}
                tooltipText={t('Open vertebrates list modal')}
              />
            </div>
            <div className={styles.areaChartContainer}>
              <div className={styles.chartHeader}>
                <p className={styles.chartTitle}>
                  <T
                    _str="Trend of the {landMarineSelection} SPI"
                    landMarineSelection={land ? 'Land' : 'Marine'}
                  />
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
              {countryData && (
                <AreaChart
                  area1={{
                    key: 'spi',
                    stroke: COLORS.white,
                    strokeWidth: 0.5,
                    label: 'SPI',
                  }}
                  area2={{
                    key: 'protected',
                    stroke: COLORS.white,
                    strokeWidth: 0.7,
                    strokeDasharray: '3 3 3 3',
                    label: '% Protected areas',
                  }}
                  data={land ? landData : marineData}
                  height={240}
                  width="98%"
                  tooltip
                  tooltipContent={<AreaChartTooltip />}
                />
              )}
            </div>
            <div className={styles.scatterPlotContainer}>
              <div className={styles.chartHeader}>
                <p className={styles.chartTitle}>
                  <T
                    _str="{landMarineSelection} SPI"
                    landMarineSelection={land ? 'Land' : 'Marine'}
                  />
                </p>
                <span>
                  <Tooltip
                    content={
                      <div className={styles.titleTooltip}>
                        {t(
                          'The scatter plots illustrate some of the differences among countries, and the social challenges that must be considered to ensure equitable global biodiversity conservation.'
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
              <T
                _str="Source:  {link1}, {link2}, {link3}, {link4}, {link5} and {link6}"
                link1={
                  <a href="/">
                    <T _str="Gross National Income" />
                  </a>
                }
                link2={
                  <a href="/">
                    <T _str="Population" />
                  </a>
                }
                link3={
                  <a href="/">
                    <T _str="proportion of very high human modification" />
                  </a>
                }
                link4={
                  <a href="/">
                    <T _str="number of endemic vertebrates" />
                  </a>
                }
                link5={
                  <a href="/">
                    <T _str="total number of vertebrate species" />
                  </a>
                }
                link6={
                  <a href="/">
                    <T _str="SPI" />
                  </a>
                }
              />
            </p>

            <div className={styles.footer}>
              <p className={styles.footerText}>
                {t(
                  'For a detailed analysis check the country analysis of the Explore Data section.'
                )}
              </p>
              <Button
                type="icon-square"
                Icon={AnalyzeAreasIcon}
                handleClick={goToAnalyzeAreas}
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
        </motion.div>
      )}
      {NRCSidebarView === 'vertebrates' && (
        <motion.div
          className={styles.motionView}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <header className={styles.header}>
            <div className={styles.titleWrapper}>
              <button
                className={styles.backBtn}
                type="button"
                onClick={() => setNRCSidebarView('main')}
              >
                <BackArrowIcon className={styles.arrowIcon} />
              </button>
              {countryName && (
                <p className={styles.title}>
                  {t('Vertebrates in')} {countryName}
                </p>
              )}
            </div>
          </header>
          <SpeciesTable />
        </motion.div>
      )}
    </div>
  );
}

export default NrcContent;
