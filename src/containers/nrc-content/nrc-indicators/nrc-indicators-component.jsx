/* eslint-disable camelcase */
import React from 'react';

import { T, useT, useLocale } from '@transifex/react';

import { getLocaleNumber } from 'utils/data-formatting-utils';

import IndicatorCard from 'containers/nrc-content/nrc-indicators//indicator-card';

import COLORS from 'styles/settings';

import styles from './nrc-indicators-styles.module.scss';
import { getBarStyles } from './nrc-indicators-utils';

function Indicators({ countryData, landMarineSelection }) {
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

  return (
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
        indicator={total_endemic_ter && getLocaleNumber(total_endemic, locale)}
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
  );
}

export default Indicators;
