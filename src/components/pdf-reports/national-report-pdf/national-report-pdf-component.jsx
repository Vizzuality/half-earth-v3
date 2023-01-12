/* eslint-disable camelcase */
import React, { useMemo } from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import AreaChart from 'components/charts/area-chart';
import HalfEarthLogo from 'components/half-earth-logo';
import IndicatorCard from 'components/nrc-content/indicator-card';
import { getBarStyles } from 'components/nrc-content/nrc-content-utils';

import { LAND_MARINE } from 'constants/country-mode-constants';
import { getCountryNames } from 'constants/translation-constants';

import COLORS from 'styles/settings';

import { ReactComponent as AmphibiansIcon } from 'icons/taxa_amphibians.svg';
import { ReactComponent as BirdsIcon } from 'icons/taxa_birds.svg';
import { ReactComponent as MammalsIcon } from 'icons/taxa_mammals.svg';
import { ReactComponent as ReptilesIcon } from 'icons/taxa_reptiles.svg';

import styles from './national-report-pdf.module.scss';

function NationalReportPdf({
  birds,
  nrcUrl,
  mammals,
  reptiles,
  amphibians,
  countryISO,
  countryName,
  countryData,
  birdsEndemic,
  mammalsEndemic,
  reptilesEndemic,
  amphibiansEndemic,
  areaChartData,
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
  const { land: landData, marine: marineData } = areaChartData || {};
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

    return (
      <section className={styles.indicatorCardsContainer}>
        <IndicatorCard
          className={styles.indicatorCard}
          indicator={SPI ? getLocaleNumber(SPI, locale) : ''}
          description={
            <p>
              <T
                _str="{landMarineSelection} Species Protection Index (SPI)"
                landMarineSelection={land ? 'Land' : 'Marine'}
              />
            </p>
          }
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
          className={styles.indicatorCard}
          color={COLORS.gold}
          indicator={
            total_endemic_ter && getLocaleNumber(total_endemic, locale)
          }
          description={
            <p>
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
            </p>
          }
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
          className={styles.indicatorCard}
          color={COLORS['protected-areas']}
          indicator={prop_protected && `${Math.round(prop_protected)}%`}
          description={
            <p>
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
            </p>
          }
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
          className={styles.indicatorCard}
          color={COLORS['high-modification']}
          indicator={`${Math.round(hm_vh)}%`}
          description={
            <p>
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
            </p>
          }
        >
          <div
            className={styles.bar}
            style={{
              backgroundImage: getBarStyles(
                COLORS['high-modification'],
                65,
                COLORS['some-modification'],
                70
              ),
            }}
          />
        </IndicatorCard>
      </section>
    );
  };

  const renderSpecies = () => (
    <section className={styles.speciesComposition}>
      <p className={styles.sectionTitle}>{t('Species composition')}</p>
      <div className={styles.speciesCount}>
        <div className={styles.speciesIcon}>
          <AmphibiansIcon />
        </div>
        <div>
          <T
            _str="{endemic} amphibians of {number}"
            endemic={
              <div className={styles.endemic}>
                {amphibiansEndemic} {t('endemic')}
              </div>
            }
            number={amphibians}
          />
        </div>
      </div>
      <div className={styles.speciesCount}>
        <div className={styles.speciesIcon}>
          <BirdsIcon />
        </div>
        <div>
          <T
            _str="{endemic} birds of {number}"
            endemic={
              <div className={styles.endemic}>
                {birdsEndemic} {t('endemic')}
              </div>
            }
            number={birds}
          />
        </div>
      </div>
      <div className={styles.speciesCount}>
        <div className={styles.speciesIcon}>
          <ReptilesIcon />
        </div>
        <div>
          <T
            _str="{endemic} reptiles of {number}"
            endemic={
              <div className={styles.endemic}>
                {reptilesEndemic} {t('endemic')}
              </div>
            }
            number={reptiles}
          />
        </div>
      </div>
      <div className={styles.speciesCount}>
        <div className={styles.speciesIcon}>
          <MammalsIcon />
        </div>
        <div>
          <T
            _str="{endemic} mammals of {number}"
            endemic={
              <div className={styles.endemic}>
                {mammalsEndemic} {t('endemic')}
              </div>
            }
            number={mammals}
          />
        </div>
      </div>
    </section>
  );

  const renderChart = () => (
    <section className={styles.areaChartContainer}>
      <div className={styles.chartHeader}>
        <p className={styles.sectionTitle}>
          <T
            _str="Trend of the {landMarineSelection}"
            landMarineSelection={selectedLandMarineOption.label}
          />
        </p>
      </div>
      <AreaChart
        area1={{
          key: 'spi',
          stroke: COLORS['dark-text'],
          strokeWidth: 0.5,
        }}
        area2={{
          key: 'protected',
          stroke: COLORS['dark-text'],
          strokeWidth: 0.7,
          strokeDasharray: '3 3 3 3',
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
          {t(
            `Summary of the National Report Card of ${translatedCountryName} regarding the calculations of the ${selectedLandMarineOption.label}.`
          )}
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
