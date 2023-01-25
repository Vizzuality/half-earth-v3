/* eslint-disable camelcase */
import React from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import cx from 'classnames';

import IndicatorCard from 'containers/nrc-content/nrc-indicators//indicator-card';

import COLORS from 'styles/settings';

import styles from './nrc-indicators-styles.module.scss';
import { getBarStyles } from './nrc-indicators-utils';

function Indicators({ countryData, landMarineSelection, isShrunken }) {
  const t = useT();
  const locale = useLocale();
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

  const isNumberOr0 = (value) => value === 0 || !!value;
  return (
    <div
      className={cx(styles.indicatorCardsContainer, {
        [styles.shrunken]: isShrunken,
      })}
    >
      <IndicatorCard
        indicator={SPI ? getLocaleNumber(SPI, locale) : ''}
        description={
          <p>
            {land ? (
              <T _str="Land Species Protection Index (SPI)" />
            ) : (
              <T _str="Marine Species Protection Index (SPI)" />
            )}
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
              _comment="> Global SPI average: 100"
              more=">"
              spiAverage={getLocaleNumber(Global_SPI, locale) || 0}
            />
          </p>
        </div>
      </IndicatorCard>
      <IndicatorCard
        color={COLORS.gold}
        indicator={total_endemic_ter && getLocaleNumber(total_endemic, locale)}
        description={
          <p>
            {nspecies && (
              <T
                _str="{bold} {landMarineSelection} vertebrate species of a total of {totalEndemicNumber} {landMarineSelection} vertebrates"
                _comment="8 are endemic land (vertebrate species of a total of) 10 land vertebrates"
                bold={
                  <b>
                    <T
                      _str="are endemic"
                      _comment="8 {are endemic} land vertebrate species of a total of 10 land vertebrates"
                    />
                  </b>
                }
                landMarineSelection={
                  land
                    ? t('land', { _comment: 'land vertebrate species' })
                    : t('marine', { _comment: 'marine vertebrate species' })
                }
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
            {isNumberOr0(protection_needed) && (
              <T
                _str="of {bold} and {needsProtectionNumber}% needs protection"
                _comment="10% (of) land is protected (and) 2% (needs protection)"
                bold={
                  <b>
                    <T
                      _str="{landMarineSelection} is protected"
                      landMarineSelection={
                        land
                          ? t('land', { _comment: 'land vertebrate species' })
                          : t('marine')
                      }
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
                _comment="27% { of } land {has very} high human modification and 10% has some modification"
                bold={
                  <b>
                    <T
                      _str="high human modification"
                      _comment="27% of land has very {high human modification} and 10% has some modification"
                    />
                  </b>
                }
                landMarineSelection={
                  land
                    ? t('land', { _comment: 'land vertebrate species' })
                    : t('marine')
                }
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
    </div>
  );
}

export default Indicators;
