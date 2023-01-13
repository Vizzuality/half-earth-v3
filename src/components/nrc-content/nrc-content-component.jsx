/* eslint-disable camelcase */
import React, { useState } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import Tooltip from '@tippyjs/react';
import cx from 'classnames';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown/with-html';

import {
  useOnboardingTooltipRefs,
  getOnboardingProps,
} from 'containers/onboarding/onboarding-hooks';

import Button from 'components/button';
import AreaChart from 'components/charts/area-chart';
import ScatterPlot from 'components/charts/scatter-plot';
import CloseButton from 'components/close-button';
import Dropdown from 'components/dropdown';
import AreaChartTooltip from 'components/nrc-content/area-chart-tooltip';
import Indicators from 'components/nrc-content/indicators';
import PdfNationalReport from 'components/pdf-reports/national-report-pdf';
import ShareModal from 'components/share-modal';
import SpeciesTable from 'components/species-table';

import COLORS from 'styles/settings';

import { ReactComponent as AnalyzeAreasIcon } from 'icons/analyze_areas.svg';
import { ReactComponent as ArrowButton } from 'icons/arrow_right.svg';
import { ReactComponent as BackArrowIcon } from 'icons/back_arrow.svg';
import { ReactComponent as DownloadIcon } from 'icons/download.svg';
import { ReactComponent as InfoIcon } from 'icons/infoDark.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import { ReactComponent as CountryAreaImage } from 'images/country-area.svg';

import { CONTINENTS } from './nrc-content-constants';
import styles from './nrc-content-styles.module.scss';

function NrcContent({
  areaChartData,
  challengesFilterOptions,
  challengesInfo,
  changeUI,
  countryChallengesSelectedKey,
  countryData,
  countryDescription,
  countryISO,
  countryName,
  fullRanking,
  goToAnalyzeAreas,
  handleBubbleClick,
  handleClose,
  handleFilterSelection,
  handleSelectIndicator,
  handleSelectPreviousIndicator,
  handleSelectNextIndicator,
  handlePrintReport,
  indicatorLabels,
  indicatorOptions,
  landMarineSelection,
  NRCSidebarView,
  onboardingType,
  onboardingStep,
  scatterPlotData,
  selectedIndicatorOption,
  selectedFilterOption,
  setNRCSidebarView,
  xAxisTicks,
  yAxisTicks,
  selectedLandMarineOption,
  waitingInteraction,
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
  } = countryData || {};

  const { land: landData, marine: marineData } = areaChartData;

  const { description: challengesTooltipInfo, source: challengesSources } =
    challengesInfo;
  const land = landMarineSelection === 'land';

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
        [styles.nrcContentVertebrates]: NRCSidebarView === 'vertebrates',
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
            {/* <div className={styles.indicatorCardsContainer}>
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
                    backgroundImage: getBarStyles({
                      color1: COLORS.gold,
                      value1: (total_endemic * 100) / nspecies,
                    }),
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
                    backgroundImage: getBarStyles({
                      color1: COLORS['protected-areas'],
                      value1: prop_protected,
                      color2: COLORS['protection-needed'],
                      value2: prop_protected + protection_needed,
                    }),
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
                    backgroundImage: getBarStyles({
                      color1: COLORS['high-modification'],
                      value1: hm_vh,
                      color2: COLORS['some-modification'],
                      value2: hm,
                    }),
                  }}
                />
              </IndicatorCard>
            </div> */}
            <Indicators />
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
            <div
              className={cx({
                [styles.challengesContainer]: true,
                [styles.challengesContainerShrunken]: fullRanking,
              })}
            >
              <div className={styles.chartHeader}>
                {countryName && (
                  <div className={styles.chartTitleContainer}>
                    <div className={styles.chartTitleIndicators}>
                      <p className={styles.chartTitle}>
                        <T
                          _str="{landMarineSelection} SPI and"
                          landMarineSelection={land ? 'Land' : 'Marine'}
                        />
                      </p>
                      <div className={styles.dropdownContainer}>
                        {indicatorOptions && (
                          <Dropdown
                            theme="secondary-dark"
                            width="full"
                            parentWidth={fullRanking ? '180px' : '230px'}
                            options={indicatorOptions}
                            selectedOption={
                              selectedIndicatorOption || indicatorOptions[0]
                            }
                            handleOptionSelection={handleSelectIndicator}
                          />
                        )}
                      </div>
                    </div>
                    <div className={styles.chartTitleFilter}>
                      <p className={styles.chartTitle}>{t('of countries')}</p>
                      <div className={styles.dropdownContainer}>
                        <Dropdown
                          theme="secondary-dark"
                          width="full"
                          parentWidth={fullRanking ? '180px' : '230px'}
                          options={challengesFilterOptions}
                          selectedOption={selectedFilterOption}
                          handleOptionSelection={handleFilterSelection}
                        />
                      </div>
                      <p className={styles.chartTitle}>
                        <T _str="to {countryName}" countryName={countryName} />
                      </p>
                    </div>
                  </div>
                )}
                <span>
                  <Tooltip
                    content={
                      <div className={styles.titleTooltip}>
                        <T
                          _str="{challengesTooltipInfo}"
                          challengesTooltipInfo={challengesTooltipInfo}
                        />
                      </div>
                    }
                    delay={100}
                    placement="top"
                  >
                    <InfoIcon className={styles.icon} />
                  </Tooltip>
                </span>
              </div>
              <div className={styles.scatterPlotContainer}>
                <div className={styles.scatterPlotChartWrapper}>
                  <ScatterPlot
                    data={scatterPlotData}
                    countryISO={countryISO}
                    xAxisTicks={xAxisTicks}
                    yAxisTicks={yAxisTicks}
                    onBubbleClick={handleBubbleClick}
                    countryChallengesSelectedKey={countryChallengesSelectedKey}
                  />
                  {fullRanking && (
                    <div className={styles.xAxisContainer}>
                      <div className={styles.xAxisLabelContainer}>
                        <span className={styles.xAxisIndicator}>
                          {indicatorLabels[countryChallengesSelectedKey]}
                        </span>
                      </div>
                    </div>
                  )}
                  {!fullRanking && (
                    <div className={styles.xAxisContainer}>
                      <div className={styles.xAxisLabelContainer}>
                        <button
                          type="button"
                          onClick={handleSelectPreviousIndicator}
                          style={{ transform: 'scaleX(-1)' }}
                        >
                          <ArrowButton className={styles.arrowButton} />
                        </button>
                        <span className={styles.xAxisIndicator}>
                          {indicatorLabels[countryChallengesSelectedKey]}
                        </span>
                        <button
                          type="button"
                          onClick={handleSelectNextIndicator}
                        >
                          <ArrowButton className={styles.arrowButton} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className={styles.yAxisContainer}>
                    <span className={styles.yAxisIndicator}>
                      <T
                        _str="{landMarineSelection} SPI"
                        landMarineSelection={land ? 'Land' : 'Marine'}
                      />
                    </span>
                  </div>
                </div>
                <div className={styles.scatterPlotLegendWrapper}>
                  <div className={styles.continentsLegendWrapper}>
                    <h5 className={styles.legendTitle}>{t('Continent')}</h5>
                    <div className={styles.legendItemsContainer}>
                      {CONTINENTS.map((c) => (
                        <div key={c.color} className={styles.legendItem}>
                          <div
                            className={styles.legendItemColor}
                            style={{
                              background: c.color,
                            }}
                          />
                          <p className={styles.legendItemLabel}>
                            <T _str="{country}" country={c.label} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className={styles.legendTitle}>
                      <T _str="Country area in km{sup}" sup={<sup>2</sup>} />
                    </h5>
                    <CountryAreaImage className={styles.countryAreaImage} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.sourceText}>
              <p>{t('Source: ')}</p>
              <ReactMarkdown
                key={challengesSources}
                source={challengesSources}
                escapeHtml={false}
              />
            </div>

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
