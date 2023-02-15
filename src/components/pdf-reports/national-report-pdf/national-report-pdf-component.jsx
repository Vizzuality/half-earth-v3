/* eslint-disable camelcase */
import React, { useMemo } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber, roundSPI } from 'utils/data-formatting-utils';

import IndicatorCard from 'containers/nrc-content/nrc-indicators/indicator-card';
import { getBarStyles } from 'containers/nrc-content/nrc-indicators/nrc-indicators-utils';

import TrendChart from 'components/charts/trend-chart';
import HalfEarthLogo from 'components/half-earth-logo';

import { LAND_MARINE } from 'constants/country-mode-constants';
import { getCountryNames } from 'constants/translation-constants';

import COLORS from 'styles/settings';

import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as FishesIcon } from 'icons/taxa_fishes.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as MammalsMarIcon } from 'icons/taxa_marine_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import styles from './national-report-pdf.module.scss';

function NationalReportPdf({
  birds,
  nrcUrl,
  mammals,
  mammalsMar,
  reptiles,
  amphibians,
  fishes,
  countryISO,
  countryName,
  countryData,
  birdsEndemic,
  fishesEndemic,
  mammalsEndemic,
  mammalsMarEndemic,
  reptilesEndemic,
  amphibiansEndemic,
  trendChartData,
  selectedLandMarineOption,
}) {
  const t = useT();
  const locale = useLocale();
  const countryNames = useMemo(getCountryNames, [locale]);
  const translatedCountryName = countryNames[countryName] || countryName;
  const {
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
  const { land: landData, marine: marineData } = trendChartData || {};
  const renderIndicatorCards = () => {
    const land = selectedLandMarineOption.slug === LAND_MARINE.land;
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
    const isNumberOr0 = (value) => value === 0 || !!value;

    return (
      <section className={styles.indicatorCardsContainer}>
        <IndicatorCard
          className={styles.indicatorCard}
          indicator={
            !!SPI || SPI === 0 ? getLocaleNumber(roundSPI(SPI), locale) : ''
          }
          description={
            <p>
              {land ? (
                <T _str="Land Species Protection Index (SPI)" />
              ) : (
                <T _str="Marine Species Protection Index (SPI)" />
              )}
            </p>
          }
        >
          <div>
            <p className={styles.spiAverageText}>
              <T
                _str="{point} Global SPI average: {spiAverage}"
                _comment="> Global SPI average: 100"
                point=">"
                spiAverage={getLocaleNumber(roundSPI(Global_SPI), locale) || 0}
              />
            </p>
          </div>
        </IndicatorCard>
        <IndicatorCard
          className={styles.indicatorCard}
          color={COLORS.gold}
          indicator={
            total_endemic_ter && getLocaleNumber(total_endemic, locale)
          }
          description={
            <p>
              {land ? (
                <T
                  _str="{bold} of a total of {totalEndemicNumber} land vertebrates"
                  _comment="8 are endemic land vertebrate species (of a total of) 10 land vertebrates"
                  bold={
                    <b>
                      <T
                        _str="are endemic vertebrate species"
                        _comment="8 {are endemic vertebrate species} land vertebrate species of a total of 10 land vertebrates"
                      />
                    </b>
                  }
                  totalEndemicNumber={getLocaleNumber(nspecies, locale)}
                />
              ) : (
                <T
                  _str="{bold} of a total of {totalEndemicNumber} marine vertebrates"
                  _comment="8 are endemic marine vertebrate species (of a total of) 10 marine vertebrates"
                  bold={
                    <b>
                      <T
                        _str="are endemic vertebrate species"
                        _comment="8 {are endemic vertebrate species} land vertebrate species of a total of 10 land vertebrates"
                      />
                    </b>
                  }
                  totalEndemicNumber={getLocaleNumber(nspecies, locale)}
                />
              )}
            </p>
          }
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: getBarStyles({
                color1: COLORS.gold,
                value1: (total_endemic * 100) / nspecies,
                variant: 'light',
              }),
            }}
          />
        </IndicatorCard>
        <IndicatorCard
          className={styles.indicatorCard}
          color={COLORS['protected-areas']}
          indicator={prop_protected && `${Math.round(prop_protected)}%`}
          description={
            <p>
              {isNumberOr0(protection_needed) && (
                <T
                  _str="of {bold} and {needsProtectionNumber}% needs protection"
                  _comment="10% (of) land is protected (and) 2% (needs protection)"
                  bold={
                    <b>
                      {land ? (
                        <T
                          _str="land is protected"
                          _comment="10% of {land is protected} and 2% needs protection"
                        />
                      ) : (
                        <T
                          _str="marine area is protected"
                          _comment="10% of {marine area is protected} and 2% needs protection"
                        />
                      )}
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
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: getBarStyles({
                color1: COLORS['protected-areas'],
                value1: prop_protected,
                color2: COLORS['protection-needed'],
                value2: prop_protected + protection_needed,
                variant: 'light',
              }),
            }}
          />
        </IndicatorCard>
        <IndicatorCard
          className={styles.indicatorCard}
          color={COLORS['high-modification']}
          indicator={`${Math.round(hm_vh)}%`}
          description={
            <p>
              {land ? (
                <T
                  _str="of land has {veryHighHumanModification} and {someModificationNumber}% has some modification"
                  _comment="27% { of } land has {very high human modification} and 10% has some modification"
                  veryHighHumanModification={
                    <b>
                      <T
                        _str="very high human modification"
                        _comment="27% of land has {very high human modification} and 10% has some modification"
                      />
                    </b>
                  }
                  someModificationNumber={Math.round(hm)}
                />
              ) : (
                <T
                  _str="of marine area has {veryHighHumanModification} and {someModificationNumber}% has some modification"
                  _comment="27% { of } marine area has {very high human modification} and 10% has some modification"
                  veryHighHumanModification={
                    <b>
                      <T
                        _str="very high human modification"
                        _comment="27% of land has {very high human modification} and 10% has some modification"
                      />
                    </b>
                  }
                  someModificationNumber={Math.round(hm)}
                />
              )}
            </p>
          }
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: getBarStyles({
                color1: COLORS['high-modification'],
                value1: hm_vh,
                color2: COLORS['some-modification'],
                value2: hm,
                variant: 'light',
              }),
            }}
          />
        </IndicatorCard>
      </section>
    );
  };

  const renderSpecies = () => {
    const land = selectedLandMarineOption.slug === LAND_MARINE.land;
    return (
      <section className={styles.speciesComposition}>
        <p className={styles.sectionTitle}>{t('Species composition')}</p>
        <div>
          {land && (
            <div className={styles.speciesCount}>
              <div className={styles.speciesIcon}>
                <AmphibiansIcon />
              </div>
              <div>
                <T
                  _str="{endemic} of {number}"
                  _comment="10 amphibians of 200"
                  endemic={
                    <div className={styles.endemic}>
                      {amphibiansEndemic} {t('endemic amphibians')}
                    </div>
                  }
                  number={amphibians}
                />
              </div>
            </div>
          )}
          {land && (
            <div className={styles.speciesCount}>
              <div className={styles.speciesIcon}>
                <BirdsIcon />
              </div>
              <div>
                <T
                  _str="{endemic} of {number}"
                  _comment="10 birds of 200"
                  endemic={
                    <div className={styles.endemic}>
                      {birdsEndemic} {t('endemic birds')}
                    </div>
                  }
                  number={birds}
                />
              </div>
            </div>
          )}
          {land && (
            <div className={styles.speciesCount}>
              <div className={styles.speciesIcon}>
                <ReptilesIcon />
              </div>
              <div>
                <T
                  _str="{endemic} of {number}"
                  _comment="10 reptiles of 200"
                  endemic={
                    <div className={styles.endemic}>
                      {reptilesEndemic} {t('endemic reptiles')}
                    </div>
                  }
                  number={reptiles}
                />
              </div>
            </div>
          )}
          {land ? (
            <div className={styles.speciesCount}>
              <div className={styles.speciesIcon}>
                <MammalsIcon />
              </div>
              <div>
                <T
                  _str="{endemic} of {number}"
                  _comment="10 mammals of 200"
                  endemic={
                    <div className={styles.endemic}>
                      {mammalsEndemic} {t('endemic mammals')}
                    </div>
                  }
                  number={mammals}
                />
              </div>
            </div>
          ) : (
            <div className={styles.speciesCount}>
              <div className={styles.speciesIcon}>
                <MammalsMarIcon />
              </div>
              <div>
                <T
                  _str="{endemic} of {number}"
                  _comment="10 mammals of 200"
                  endemic={
                    <div className={styles.endemic}>
                      {mammalsMarEndemic} {t('endemic sea mammals')}
                    </div>
                  }
                  number={mammalsMar}
                />
              </div>
            </div>
          )}
          {!land && (
            <div className={styles.speciesCount}>
              <div className={styles.speciesIcon}>
                <FishesIcon />
              </div>
              <div>
                <T
                  _str="{endemic} of {number}"
                  _comment="10 mammals of 200"
                  endemic={
                    <div className={styles.endemic}>
                      {fishesEndemic} {t('endemic fishes')}
                    </div>
                  }
                  number={fishes}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderChart = () => (
    <section className={styles.areaChartContainer}>
      <div className={styles.chartHeader}>
        <p className={styles.sectionTitle}>
          <T
            _str="Trend of the {landMarineSPI}"
            _comment="{Trend of the} land SPI"
            landMarineSPI={selectedLandMarineOption.label}
          />
        </p>
        <div className={styles.areaChartLegend}>
          <div className={styles.areaChartLegendItem}>
            <hr className={styles.area1ChartLegendLine} />
            <T _str="SPI" />
          </div>
          <div className={styles.areaChartLegendItem}>
            <hr className={styles.area2ChartLegendLine} />
            <T _str="% Protected areas" />
          </div>
        </div>
      </div>
      <TrendChart
        area1={{
          key: 'spi',
          stroke: COLORS['dark-text'],
          strokeWidth: 0.5,
          label: 'SPI',
        }}
        area2={{
          key: 'protected',
          stroke: COLORS['dark-text'],
          strokeWidth: 0.7,
          strokeDasharray: '3 3 3 3',
          label: '% Protected areas',
        }}
        data={selectedLandMarineOption.slug === 'land' ? landData : marineData}
        variant="dark"
        // We dont use responsive for PDF - It was not rendering
        height={300}
        width={760}
        pdf
      />
    </section>
  );

  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div className={styles.nameWrapper}>
          <img
            className={styles.flag}
            src={`${process.env.PUBLIC_URL}/flags/${countryISO}.svg`}
            alt=""
          />
          <span className={styles.countryName}>{translatedCountryName}</span>
        </div>
        <div className={styles.subtitle}>
          <T
            _str="Summary of the National Report Card of {translatedCountryName} regarding the calculations of the {landMarineLabel}."
            _comment="Summary of the National Report Card of Spain regarding the calculations of the land SPI."
            landMarineLabel={selectedLandMarineOption.label}
            translatedCountryName={translatedCountryName}
          />
        </div>
      </section>
      <HalfEarthLogo
        withBackground
        className={styles.logo}
        linkClassName={styles.logoContainer}
        pdf
      />
      {renderIndicatorCards()}
      {renderSpecies()}
      {renderChart()}
      <section className={styles.sources}>
        <T _str="Sources:" /> <T _str="Map of Life" />
      </section>
      <section className={styles.urlWrapper}>
        <T _str="Discover more:" />{' '}
        <a
          className={styles.urlText}
          target="_blank"
          href={`https://${nrcUrl}`}
          rel="noreferrer"
        >
          {nrcUrl}
        </a>
      </section>
    </div>
  );
}

export default NationalReportPdf;
